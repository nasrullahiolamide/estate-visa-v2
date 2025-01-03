"use client";

import { Menu } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Fragment } from "react";

import { builder } from "@/builders";
import { ConfirmationModal } from "@/components/shared/interface";
import { EditIcon, TrashIcon } from "@/icons";
import { MODALS } from "@/packages/libraries";
import { handleError, handleSuccess } from "@/packages/notification";

import {
  FlowMenu,
  FlowMenuDropdown,
  FlowMenuTarget,
} from "@/components/layout";

enum STATUS {
  PENDING = "pending",
  IN_PROGESS = "in progress",
  COMPLETED = "completed",
}

interface ServieRequestActionsProps {
  id: string;
  status: "pending" | "in progress" | "completed" | string;
  onEdit: () => void;
}

export function ServieRequestActions({
  id,
  status,
  onEdit,
}: ServieRequestActionsProps) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: builder.$use.service_requests.id.remove,
    onError: () => {
      handleError()();
      modals.close(MODALS.CONFIRMATION);
    },
    onSuccess: () => {
      handleSuccess("Service Request Deleted Successfully", {
        autoClose: 1200,
      });
      queryClient.invalidateQueries({
        queryKey: builder.service_requests.get.$get(),
      });
      modals.close(MODALS.CONFIRMATION);
    },
  });

  const { mutate: changeStatus } = useMutation({
    mutationFn: builder.$use.service_requests.id.change_status,
    onError: (error: AxiosError) => {
      handleError()();
      modals.close(MODALS.CONFIRMATION);
    },
    onSuccess: () => {
      handleSuccess("Service Request Updated Successfully", {
        autoClose: 1200,
      });
      queryClient.invalidateQueries({
        queryKey: builder.service_requests.get.$get(),
      });
      modals.close(MODALS.CONFIRMATION);
    },
  });

  const handleDelete = () => {
    modals.open({
      children: (
        <ConfirmationModal
          withTwoButtons
          title='Are you sure you want to delete this request?'
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
      <FlowMenu withArrow={false} position='bottom-end'>
        <FlowMenuTarget />
        <FlowMenuDropdown>
          {(status === STATUS.PENDING || status === STATUS.IN_PROGESS) && (
            <Menu.Item leftSection={<EditIcon width={14} />} onClick={onEdit}>
              Edit Request
            </Menu.Item>
          )}
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
