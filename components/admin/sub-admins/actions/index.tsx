import clsx from "clsx";

import { Fragment } from "react";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Flex, Menu } from "@mantine/core";
import { modals } from "@mantine/modals";

import { builder } from "@/builders";
import { MODALS } from "@/packages/libraries";
import { handleError, handleSuccess } from "@/packages/notification";
import { ConfirmationModal } from "@/components/shared/interface";
import { UpdateStatus } from "../modals/update-status";
import {
  FlowMenu,
  FlowMenuTarget,
  FlowMenuDropdown,
  FlowToolTip,
} from "@/components/layout";
import {
  ActivateIcon,
  DeactivateIcon,
  EditIcon,
  EyeIcon,
  TrashIcon,
} from "@/icons";

interface SubAdminActionsProps {
  id: string;
  isActive: Boolean;
  handlers: {
    onAdd: () => void;
    onView: () => void;
    onEdit: () => void;
  };
}

export function activateAccount(id: string) {
  modals.open({
    modalId: MODALS.CONFIRMATION,
    withCloseButton: false,
    children: (
      <UpdateStatus
        id={id}
        title="Are you sure you want to activate this account?"
        status="active"
      />
    ),
  });
}

export function suspendAccount(id: string) {
  modals.open({
    modalId: MODALS.CONFIRMATION,
    withCloseButton: false,
    children: (
      <UpdateStatus
        id={id}
        title="Are you sure you want to disable this account?"
        status="suspended"
      />
    ),
  });
}

export function SubAdminActions({
  id,
  handlers,
  isActive,
}: SubAdminActionsProps) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: builder.$use.sub_admins.id.remove,
    onError: (error: AxiosError) => {
      handleError(error)();
      modals.close(MODALS.CONFIRMATION);
    },
    onSuccess: () => {
      handleSuccess({
        message: "Sub-Admin deleted successfully",
        autoClose: 1200,
      });
      queryClient.invalidateQueries({
        queryKey: builder.sub_admins.get.$get(),
      });
      modals.close(MODALS.CONFIRMATION);
    },
  });

  const handleDelete = () => {
    modals.open({
      children: (
        <ConfirmationModal
          withTwoButtons
          title="Are you sure you want to delete this Sub Admin?"
          src="delete"
          primaryBtnText="Yes, delete"
          secondaryBtnText="No"
          srcProps={{
            ml: 0,
          }}
          secondaryBtnProps={{
            disabled: isPending,
          }}
          primaryBtnProps={{
            color: "red",
            loading: isPending,
            disabled: isPending,
            onClick: () => mutate(id),
          }}
        />
      ),
      withCloseButton: false,
      modalId: MODALS.CONFIRMATION,
    });
  };

  return (
    <Fragment>
      <FlowMenu
        wrapperProps={{
          className: clsx("block text-center sm:hidden"),
        }}
      >
        <FlowMenuTarget />
        <FlowMenuDropdown>
          {isActive ? (
            <Menu.Item
              color="#969921"
              leftSection={<DeactivateIcon width={13} />}
              onClick={() => activateAccount(id)}
            >
              Suspend
            </Menu.Item>
          ) : (
            <Menu.Item
              color="#11A506"
              leftSection={<ActivateIcon width={13} />}
              onClick={() => suspendAccount(id)}
            >
              Activate
            </Menu.Item>
          )}
          <Menu.Item
            leftSection={<EyeIcon width={14} />}
            onClick={handlers.onView}
          >
            View
          </Menu.Item>
          <Menu.Item
            leftSection={<EditIcon width={14} />}
            onClick={handlers.onEdit}
          >
            Edit
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item
            color="#CC0404"
            leftSection={<TrashIcon width={15} />}
            onClick={handleDelete}
          >
            Delete
          </Menu.Item>
        </FlowMenuDropdown>
      </FlowMenu>

      <Flex className="hidden sm:flex justify-center items-center" gap={8}>
        {isActive ? (
          <FlowToolTip icon="Suspend" onClick={() => suspendAccount(id)} />
        ) : (
          <FlowToolTip icon="Activate" onClick={() => activateAccount(id)} />
        )}
        <FlowToolTip icon="View" onClick={handlers.onView} />
        <FlowToolTip icon="Edit" onClick={handlers.onEdit} />
        <FlowToolTip icon="Delete" onClick={handleDelete} />
      </Flex>
    </Fragment>
  );
}
