"use client";

import { builder } from "@/builders";
import {
  FlowMenu,
  FlowMenuDropdown,
  FlowMenuTarget,
} from "@/components/layout";
import { DoubleMarkIcon } from "@/icons";
import { MODALS } from "@/packages/libraries";
import { handleError, handleSuccess } from "@/packages/notification";
import { Menu } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Fragment, ReactNode } from "react";

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
    onError: () => {
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

  const render: Record<PropertyKey, ReactNode> = {
    pending: (
      <Fragment>
        <Menu.Item
          color='green.9'
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
        <Menu.Item
          color='green.9'
          leftSection={<DoubleMarkIcon width={14} />}
          onClick={() => mutate({ id, status: "completed" })}
        >
          Set as Completed
        </Menu.Item>
      </Fragment>
    ),
  };

  return (
    <FlowMenu disabled={status === "completed"}>
      <FlowMenuTarget />
      <FlowMenuDropdown>{render[status]}</FlowMenuDropdown>
    </FlowMenu>
  );
}
