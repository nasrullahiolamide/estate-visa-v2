import clsx from "clsx";

import { Fragment } from "react";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Menu } from "@mantine/core";
import { modals } from "@mantine/modals";

import { builder } from "@/builders";
import { MODALS } from "@/packages/libraries";
import { handleError, handleSuccess } from "@/packages/notification";
import { CancelCircleIcon, EditIcon, ShareIcon, TrashIcon } from "@/icons";
import { ConfirmationModal } from "@/components/shared/interface";
import {
  FlowMenu,
  FlowMenuTarget,
  FlowMenuDropdown,
} from "@/components/layout";

interface GateRequestActionsProps {
  id: string;
  accessCode: number;
  handlers: {
    onAdd: () => void;
    onEdit: () => void;
  };
}

export function GateRequestActions({ id, handlers }: GateRequestActionsProps) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: builder.use().gates.requests.remove,
    onError: (error: AxiosError) => {
      handleError(error)();
      modals.close(MODALS.CONFIRMATION);
    },
    onSuccess: () => {
      handleSuccess({
        message: "Gate Request deleted successfully",
        autoClose: 1200,
      });
      queryClient.invalidateQueries({
        queryKey: builder.gates.requests.get.get(),
      });
      modals.close(MODALS.CONFIRMATION);
    },
  });

  const { mutate: changeStatus } = useMutation({
    mutationFn: builder.use().gates.requests.change_status,
    onError: (error: AxiosError) => {
      handleError(error)();
      modals.close(MODALS.CONFIRMATION);
    },
    onSuccess: () => {
      handleSuccess({
        message: "Gate Request Status Updated Successfully",
        autoClose: 1200,
      });
      queryClient.invalidateQueries({
        queryKey: builder.gates.requests.get.get(),
      });
      modals.close(MODALS.CONFIRMATION);
    },
  });

  const handleDelete = () => {
    modals.open({
      children: (
        <ConfirmationModal
          withTwoButtons
          title='Are you sure you want to delete this gate request?'
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

  const handleShare = () => {
    modals.open({
      title: "Share Code",
      modalId: MODALS.CONFIRMATION,
      children: (
        <ConfirmationModal
          title='Gate Request Generated!'
          description='Share the generated code to your guest immediately via SMS or WhatsApp.'
          src='share'
          btnText='Share Now'
          srcProps={{
            ml: 0,
            h: 130,
          }}
          btnProps={{
            color: "blue",
            onClick: () => {
              modals.close(MODALS.CONFIRMATION);
            },
          }}
        />
      ),
    });
  };

  return (
    <Fragment>
      <FlowMenu>
        <FlowMenuTarget />
        <FlowMenuDropdown>
          <Menu.Item
            leftSection={<EditIcon width={14} />}
            onClick={handlers.onEdit}
          >
            Edit Request
          </Menu.Item>
          <Menu.Item
            leftSection={<ShareIcon width={14} />}
            onClick={handleShare}
          >
            Share Request
          </Menu.Item>
          <Menu.Item
            leftSection={<CancelCircleIcon width={14} />}
            onClick={() => changeStatus({ id, status: "cancelled" })}
          >
            Cancel Request
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
    </Fragment>
  );
}
