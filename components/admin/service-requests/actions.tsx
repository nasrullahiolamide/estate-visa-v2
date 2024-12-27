"use client";

import { Fragment, ReactNode } from "react";
import { Menu } from "@mantine/core";
import {
  FlowMenu,
  FlowMenuDropdown,
  FlowMenuTarget,
} from "@/components/layout";
import { DoubleMarkIcon, EyeIcon } from "@/icons";
import { builder } from "@/builders";
import { MODALS } from "@/packages/libraries";
import { handleError, handleSuccess } from "@/packages/notification";
import { modals } from "@mantine/modals";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface ServiceRequestActionsProps {
  id: string;
  status: string;
}

export function ServiceRequestActions({
  status,
  id,
}: ServiceRequestActionsProps) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: builder.$use.service_requests.id.change_status,
    onError: (error: AxiosError) => {
      handleError(error)();
      modals.close(MODALS.CONFIRMATION);
    },
    onSuccess: () => {
      handleSuccess({
        message: "Service Request status changed successfully",
        autoClose: 1200,
      });
      queryClient.invalidateQueries({
        queryKey: builder.service_requests.get.$get(),
      });
      modals.close(MODALS.CONFIRMATION);
    },
  });

  const render: Record<PropertyKey, ReactNode> = {
    pending: (
      <Fragment>
        <Menu.Item
          color='green.7'
          leftSection={<DoubleMarkIcon width={14} />}
          onClick={() => mutate({ id, status: "completed" })}
        >
          Set as Completed
        </Menu.Item>

        <Menu.Item
          color='blue.7'
          leftSection={<DoubleMarkIcon width={14} />}
          onClick={() => mutate({ id, status: "in-progress" })}
        >
          Set as In Progress
        </Menu.Item>
      </Fragment>
    ),

    "in-progress": (
      <Fragment>
        <Menu.Item leftSection={<EyeIcon width={14} />}>View Details</Menu.Item>
      </Fragment>
    ),

    completed: (
      <Fragment>
        <Menu.Item leftSection={<EyeIcon width={14} />}>View Details</Menu.Item>
      </Fragment>
    ),
  };

  return (
    <FlowMenu>
      <FlowMenuTarget />
      <FlowMenuDropdown>{render[status]}</FlowMenuDropdown>
    </FlowMenu>
  );
}
