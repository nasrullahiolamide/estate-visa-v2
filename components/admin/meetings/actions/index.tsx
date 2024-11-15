import clsx from "clsx";

import { Fragment, ReactNode } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { modals } from "@mantine/modals";
import { Menu, Text } from "@mantine/core";
import { builder } from "@/builders";
import { MODALS } from "@/packages/libraries";
import { handleError, handleSuccess } from "@/packages/notification";
import { AddIcon, EditIcon, EyeIcon, TrashIcon } from "@/icons";
import { ConfirmationModal } from "@/components/shared/interface";
import {
  FlowMenuDropdown,
  FlowMenu,
  FlowMenuTarget,
} from "@/components/layout";

interface MeetingActionsProps {
  id: string;
  status: "cancelled" | "completed" | "scheduled" | string;
  handlers: {
    onViewMinutes: () => void;
    onAddMinutes: () => void;
  };
}

export function MeetingActions({ status, id, handlers }: MeetingActionsProps) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: builder.use().meetings.remove,
    onError: (error: AxiosError) => {
      handleError(error)();
      modals.close(MODALS.CONFIRMATION);
    },
    onSuccess: () => {
      handleSuccess({
        message: "Meeting deleted successfully",
        autoClose: 1200,
      });
      queryClient.invalidateQueries({
        queryKey: builder.meetings.get(),
      });
      modals.close(MODALS.CONFIRMATION);
    },
  });

  const handleDelete = () => {
    modals.open({
      children: (
        <ConfirmationModal
          withTwoButtons
          title='Are you sure you want to delete this house?'
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

  const Actions: Record<PropertyKey, ReactNode> = {
    cancelled: (
      <FlowMenu
        wrapperProps={{
          className: clsx("block text-center sm:hidden"),
        }}
      >
        <FlowMenuTarget />
        <FlowMenuDropdown>
          <Menu.Item
            leftSection={<EditIcon width={14} />}
            onClick={handlers.onViewMinutes}
          >
            Edit Meeting Details
          </Menu.Item>
          <Menu.Item
            leftSection={<AddIcon width={14} />}
            onClick={() => console.log("Reschedule Meeting")}
          >
            Reschedule Meeting
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
    ),

    completed: (
      <FlowMenu
        wrapperProps={{
          className: clsx("block text-center sm:hidden"),
        }}
      >
        <FlowMenuTarget />
        <FlowMenuDropdown>
          <Menu.Item
            leftSection={<EyeIcon width={14} />}
            onClick={handlers.onViewMinutes}
          >
            View Meeting Details
          </Menu.Item>
          <Menu.Item
            leftSection={<AddIcon width={14} />}
            onClick={handlers.onAddMinutes}
          >
            Add Meeting Minutes
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
    ),

    scheduled: (
      <FlowMenu
        wrapperProps={{
          className: clsx("block text-center sm:hidden"),
        }}
      >
        <FlowMenuTarget />
        <FlowMenuDropdown>
          <Menu.Item
            leftSection={<EyeIcon width={14} />}
            onClick={handlers.onAddMinutes}
          >
            View Meeting Details
          </Menu.Item>
          <Menu.Item
            closeMenuOnClick={false}
            leftSection={<EditIcon width={14} />}
          >
            <FlowMenu position='right-start' offset={45}>
              <Menu.Target>
                <Text fz={14} w='100%'>
                  Edit Status
                </Text>
              </Menu.Target>
              <FlowMenuDropdown variant='action'>
                <Menu.Item onClick={() => console.log("Meeting Scheduled")}>
                  Complete Meeting
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item>Cancel Meeting</Menu.Item>
              </FlowMenuDropdown>
            </FlowMenu>
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
    ),
  };

  return <Fragment>{Actions[status]}</Fragment>;
}
