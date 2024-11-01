import clsx from "clsx";
import Link from "next/link";

import { Fragment } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Flex, Menu } from "@mantine/core";
import { modals } from "@mantine/modals";
import { builder } from "@/builders";
import { makePath, MODALS, PAGES } from "@/packages/libraries";
import { handleError, handleSuccess } from "@/packages/notification";
import {
  ActivateIcon,
  DeactivateIcon,
  EditIcon,
  EyeIcon,
  TrashIcon,
} from "@/icons";
import { ConfirmationModal } from "@/components/shared/interface";
import {
  FlowMenu,
  FlowMenuTarget,
  FlowMenuDropdown,
  FlowToolTip,
} from "@/components/layout";
import { AxiosError } from "axios";
import { SubAdminListData } from "@/builders/types/sub-admins";

interface SubAdminActionsProps {
  id: string;
  isActive: Boolean;
  handlers: {
    onAdd: () => void;
    onView: () => void;
    onEdit: () => void;
  };
}

export function SubAdminActions({
  id,
  handlers,
  isActive,
}: SubAdminActionsProps) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: builder.use().estates.id.remove,
    onError: (error: AxiosError) => {
      handleError(error)();
      modals.close(MODALS.CONFIRMATION);
    },
    onSuccess: () => {
      handleSuccess({
        message: "Estate deleted successfully",
        delay: 500,
      });
      queryClient.invalidateQueries({
        queryKey: builder.estates.get.get(),
      });
      modals.close(MODALS.CONFIRMATION);
    },
  });

  const handleDelete = () => {
    modals.open({
      children: (
        <ConfirmationModal
          withTwoButtons
          title='Are you sure you want to delete this Sub Admin?'
          src='delete'
          primaryBtnText='Yes, delete'
          secondaryBtnText='No'
          srcProps={{
            ml: 0,
          }}
          primaryBtnProps={{
            color: "red",
            onClick: () => mutate(id),
            loading: isPending,
            disabled: isPending,
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
              onClick={handlers.onView}
            >
              Suspend
            </Menu.Item>
          ) : (
            <Menu.Item
              color='#11A506'
              leftSection={<ActivateIcon width={13} />}
              onClick={handlers.onView}
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
        {isActive ? (
          <FlowToolTip icon='Suspend' onClick={handlers.onView} />
        ) : (
          <FlowToolTip icon='Activate' onClick={handlers.onView} />
        )}
        <FlowToolTip icon='View' onClick={handlers.onView} />
        <FlowToolTip icon='Edit' onClick={handlers.onEdit} />
        <FlowToolTip icon='Delete' onClick={handleDelete} />
      </Flex>
    </Fragment>
  );
}
