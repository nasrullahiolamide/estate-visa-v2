import { AxiosError } from "axios";
import { Fragment, ReactNode } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { modals } from "@mantine/modals";
import { Menu, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { builder } from "@/builders";
import { APP, MODALS } from "@/packages/libraries";
import { handleError, handleSuccess } from "@/packages/notification";
import { AddIcon, EditIcon, EyeIcon, TrashIcon } from "@/icons";
import { ConfirmationModal } from "@/components/shared/interface";
import { ViewMeeting } from "../modals/view";
import {
  FlowMenuDropdown,
  FlowMenu,
  FlowMenuTarget,
} from "@/components/layout";
import { toString } from "lodash";
import { getCookie } from "cookies-next";
import { toast } from "react-toastify";

interface MeetingActionsProps {
  id: string;
  status: string;
  hasMeeting: boolean;
  handlers: {
    onEditMinutes: () => void;
    onAddMinutes: () => void;
    onEditMeeting: () => void;
  };
}

export function MeetingActions({ ...props }: MeetingActionsProps) {
  const estateId = toString(getCookie(APP.ESTATE_ID));
  const queryClient = useQueryClient();

  const { status, id, handlers, hasMeeting } = props;
  const [isDrawerOpened, { open: openDrawer, close: closeDrawer }] =
    useDisclosure(false);

  // Delete Meeting
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
        queryKey: builder.meetings.get.table.get(),
      });
      modals.close(MODALS.CONFIRMATION);
    },
  });

  // Change Meeting Status
  const { mutate: changeStatus } = useMutation({
    mutationFn: builder.use().meetings.change_status,
    onError: (error: AxiosError) => {
      handleError(error)();
      modals.close(MODALS.CONFIRMATION);
    },
    onSuccess: () => {
      handleSuccess({
        message: "Meeting status changed successfully",
        autoClose: 1200,
      });
      queryClient.invalidateQueries({
        queryKey: builder.meetings.get.table.get(),
      });
      modals.close(MODALS.CONFIRMATION);
    },
  });

  const handleDelete = () => {
    modals.open({
      children: (
        <ConfirmationModal
          withTwoButtons
          title='Are you sure you want to delete this meeting?'
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
      <FlowMenu>
        <FlowMenuTarget />
        <FlowMenuDropdown>
          <Menu.Item
            leftSection={<EditIcon width={14} />}
            onClick={handlers.onEditMeeting}
          >
            Edit Meeting Details
          </Menu.Item>
          <Menu.Item
            leftSection={<AddIcon width={14} />}
            onClick={() => changeStatus({ id, status: "scheduled" })}
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
      <FlowMenu>
        <FlowMenuTarget />
        <FlowMenuDropdown>
          <Menu.Item leftSection={<EyeIcon width={14} />} onClick={openDrawer}>
            View Meeting Details
          </Menu.Item>
          {hasMeeting ? (
            <Menu.Item
              leftSection={<EditIcon width={14} />}
              onClick={handlers.onEditMinutes}
            >
              Edit Meeting Minutes
            </Menu.Item>
          ) : (
            <Menu.Item
              leftSection={<AddIcon width={14} />}
              onClick={handlers.onAddMinutes}
            >
              Add Meeting Minutes
            </Menu.Item>
          )}
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
      <FlowMenu>
        <FlowMenuTarget />
        <FlowMenuDropdown>
          <Menu.Item
            leftSection={<EditIcon width={14} />}
            onClick={handlers.onEditMeeting}
          >
            Edit Meeting Details
          </Menu.Item>
          <Menu.Item
            closeMenuOnClick={false}
            leftSection={<EditIcon width={14} />}
          >
            <FlowMenu position='right-start' withArrow={false} offset={45}>
              <Menu.Target>
                <Text fz={14} w='100%'>
                  Edit Status
                </Text>
              </Menu.Target>
              <FlowMenuDropdown variant='action'>
                <Menu.Item
                  onClick={() => changeStatus({ id, status: "completed" })}
                >
                  Complete Meeting
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item
                  onClick={() => changeStatus({ id, status: "cancelled" })}
                >
                  Cancel Meeting
                </Menu.Item>
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

  return (
    <Fragment>
      {Actions[status]}
      <ViewMeeting open={isDrawerOpened} close={closeDrawer} id={id} />
    </Fragment>
  );
}
