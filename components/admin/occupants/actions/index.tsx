import clsx from "clsx";

import { builder } from "@/builders";
import {
  FlowMenu,
  FlowMenuDropdown,
  FlowMenuTarget,
  FlowToolTip,
} from "@/components/layout";
import { ConfirmationModal } from "@/components/shared/interface";
import {
  ActivateIcon,
  DeactivateIcon,
  EditIcon,
  EyeIcon,
  TrashIcon,
} from "@/icons";
import { MODALS } from "@/packages/libraries";
import { handleError, handleSuccess } from "@/packages/notification";
import { Flex, Menu } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Fragment } from "react";
import { UpdateStatus } from "../modals/update-status";

interface OccupantActionsProps {
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
    children: <UpdateStatus id={id} status='active' />,
  });
}

export function suspendAccount(id: string) {
  modals.open({
    modalId: MODALS.CONFIRMATION,
    withCloseButton: false,
    children: <UpdateStatus id={id} status='suspended' />,
  });
}

export function OccupantActions({
  id,
  handlers,
  isActive,
}: OccupantActionsProps) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: builder.$use.occupants.id.remove,
    onError: () => {
      handleError("An error occurred, please try again later")();
      modals.close(MODALS.CONFIRMATION);
    },
    onSuccess: () => {
      handleSuccess("Occupant deleted successfully", { autoClose: 1200 });
      queryClient.invalidateQueries({
        queryKey: builder.occupants.get.$get(),
      });
      modals.close(MODALS.CONFIRMATION);
    },
  });

  const handleDelete = () => {
    modals.open({
      children: (
        <ConfirmationModal
          withTwoButtons
          title='Are you sure you want to delete this occupant?'
          src='delete'
          primaryBtnText='Yes, delete'
          secondaryBtnText='No'
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
              color='#969921'
              leftSection={<DeactivateIcon width={13} />}
              onClick={() => suspendAccount(id)}
            >
              Suspend
            </Menu.Item>
          ) : (
            <Menu.Item
              color='#11A506'
              leftSection={<ActivateIcon width={13} />}
              onClick={() => activateAccount(id)}
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
            color='#CC0404'
            leftSection={<TrashIcon width={15} />}
            onClick={handleDelete}
          >
            Delete
          </Menu.Item>
        </FlowMenuDropdown>
      </FlowMenu>

      <Flex className='hidden sm:flex justify-center items-center' gap={8}>
        <FlowToolTip icon='View' onClick={handlers.onView} />
        {isActive ? (
          <FlowToolTip icon='Suspend' onClick={() => suspendAccount(id)} />
        ) : (
          <FlowToolTip icon='Activate' onClick={() => activateAccount(id)} />
        )}
        <FlowToolTip icon='Edit' onClick={handlers.onEdit} />
        <FlowToolTip icon='Delete' onClick={handleDelete} />
      </Flex>
    </Fragment>
  );
}
