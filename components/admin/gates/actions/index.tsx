import clsx from "clsx";

import { Fragment } from "react";
import { MdOutlinePassword } from "react-icons/md";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Flex, Menu } from "@mantine/core";
import { modals } from "@mantine/modals";

import { builder } from "@/builders";
import { MODALS } from "@/packages/libraries";
import { handleError, handleSuccess } from "@/packages/notification";
import { ConfirmationModal } from "@/components/shared/interface";
import {
  FlowMenu,
  FlowMenuTarget,
  FlowMenuDropdown,
  FlowToolTip,
} from "@/components/layout";
import { EditIcon, EyeIcon, TrashIcon } from "@/icons";
import { ChangePassword } from "../form/change-password";

interface GateActionsProps {
  id: string;
  handlers: {
    onAdd: () => void;
    onView: () => void;
    onEdit: () => void;
  };
}

export function GateActions({ id, handlers }: GateActionsProps) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: builder.use().gates.remove,
    onError: (error: AxiosError) => {
      handleError(error)();
      modals.close(MODALS.CONFIRMATION);
    },
    onSuccess: () => {
      handleSuccess({
        message: "Gate deleted successfully",
        autoClose: 1200,
      });
      queryClient.invalidateQueries({
        queryKey: builder.gates.get.get(),
      });
      modals.close(MODALS.CONFIRMATION);
    },
  });

  const handleDelete = () => {
    modals.open({
      children: (
        <ConfirmationModal
          withTwoButtons
          title='Are you sure you want to delete this gate?'
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

  const handleResetPassword = () => {
    modals.open({
      title: "Reset Password",
      modalId: MODALS.CHANGE_PASSWORD,
      children: <ChangePassword />,
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
          <Menu.Item
            leftSection={<MdOutlinePassword size={15} />}
            onClick={handleResetPassword}
          >
            Change Password
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
        <FlowToolTip icon='Edit' onClick={handlers.onEdit} />
        <FlowToolTip icon='Delete' onClick={handleDelete} />
        <FlowToolTip
          icon='Password'
          onClick={handleResetPassword}
          label='Reset Password'
        />
      </Flex>
    </Fragment>
  );
}
