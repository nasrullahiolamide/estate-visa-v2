import { builder } from "@/builders";
import { GateRequestData } from "@/builders/types/gate-requests";
import {
  FlowMenu,
  FlowMenuDropdown,
  FlowMenuTarget,
} from "@/components/layout";
import { ConfirmationModal } from "@/components/shared/interface";
import {
  CancelCircleIcon,
  EditIcon,
  ShareIcon,
  SMSIcon,
  TrashIcon,
  WhatsAppIcon,
} from "@/icons";
import { DATE_FORMAT } from "@/packages/constants/time";
import { formatDate, MODALS } from "@/packages/libraries";
import { handleError, handleSuccess } from "@/packages/notification";
import { Flex, Menu, Stack, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ReactNode } from "react";

interface GateRequestActionsProps {
  id: string;
  status: string;
  data: GateRequestData;
  accessCode: number;
  handlers: {
    onAdd: () => void;
    onEdit: () => void;
  };
}

export function GateRequestActions({
  id,
  handlers,
  status,
  data,
}: GateRequestActionsProps) {
  const queryClient = useQueryClient();

  const { mutate: changeStatus } = useMutation({
    mutationFn: builder.$use.gates.requests.change_status,
    onError: () => {
      handleError()();
      modals.close(MODALS.CONFIRMATION);
    },
    onSuccess: () => {
      handleSuccess("Gate Request Status Updated Successfully", {
        autoClose: 1200,
      });
      queryClient.invalidateQueries({
        queryKey: builder.gates.requests.get.$get(),
      });
      modals.close(MODALS.CONFIRMATION);
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: builder.$use.gates.requests.remove,
    onError: () => {
      handleError()();
      modals.close(MODALS.CONFIRMATION);
    },
    onSuccess: () => {
      handleSuccess("Gate Request Deleted Successfully", { autoClose: 1200 });
      queryClient.invalidateQueries({
        queryKey: builder.gates.requests.get.$get(),
      });
      modals.close(MODALS.CONFIRMATION);
    },
  });

  const Actions: Record<PropertyKey, ReactNode> = {
    pending: (
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
            onClick={() => handleShare(data)}
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
            onClick={() =>
              handleDelete({
                id,
                mutate,
                isPending,
              })
            }
          >
            Delete
          </Menu.Item>
        </FlowMenuDropdown>
      </FlowMenu>
    ),

    approved: (
      <FlowMenu>
        <FlowMenuTarget />
        <FlowMenuDropdown>
          <Menu.Item
            color='#CC0404'
            leftSection={<TrashIcon width={15} />}
            onClick={() =>
              handleDelete({
                id,
                mutate,
                isPending,
              })
            }
          >
            Delete
          </Menu.Item>
        </FlowMenuDropdown>
      </FlowMenu>
    ),
    cancelled: (
      <FlowMenu>
        <FlowMenuTarget />
        <FlowMenuDropdown>
          <Menu.Item
            color='#CC0404'
            leftSection={<TrashIcon width={15} />}
            onClick={() =>
              handleDelete({
                id,
                mutate,
                isPending,
              })
            }
          >
            Delete
          </Menu.Item>
        </FlowMenuDropdown>
      </FlowMenu>
    ),
  };

  return Actions[status];
}

export const handleShare = (data: GateRequestData) => {
  const shareText = `Hi! I have scheduled your visit to house '${
    data?.occupant.house.houseNumber
  }' on ${formatDate(data?.visitDate, DATE_FORMAT)} at ${
    data?.visitTime
  }. Here's your gate access code: ${
    data?.accessCode
  }. Please use it when you arrive at the estate. See you soon!`;

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
            modals.open({
              withCloseButton: false,
              modalId: MODALS.SHARE,
              children: (
                <Stack
                  align='center'
                  justify='center'
                  ta='center'
                  gap={20}
                  py={20}
                >
                  <Text fz={20}>Share via</Text>
                  <Flex gap={14}>
                    <a
                      href={`sms:${data.phoneNo}?&body=${shareText}`}
                      onClick={() => modals.close(MODALS.SHARE)}
                    >
                      <SMSIcon />
                    </a>
                    <a
                      href={`https://api.whatsapp.com/send?phone=${
                        data.phoneNo
                      }&text=${encodeURIComponent(shareText)}`}
                      target='_blank'
                      rel='noopener noreferrer'
                      onClick={() => modals.close(MODALS.SHARE)}
                    >
                      <WhatsAppIcon />
                    </a>
                  </Flex>
                </Stack>
              ),
            });
          },
        }}
      />
    ),
  });
};

interface HandleDeleteProps {
  id: string;
  isPending: boolean;
  mutate: (id: string) => void;
}

export const handleDelete = ({ id, isPending, mutate }: HandleDeleteProps) => {
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

  return null;
};
