"use client";

import { Checkbox, Flex, Menu, Stack, Text } from "@mantine/core";
import { MessagesData } from "@/builders/types/messages";
import { TIME_FORMAT } from "@/packages/constants/time";
import { useMessagesValue } from "@/packages/hooks/use-messages-value";
import { formatDate, makePath, MODALS, PAGES } from "@/packages/libraries";

import {
  FlowContentContainer,
  FlowMenu,
  FlowMenuDropdown,
  FlowMenuTarget,
} from "@/components/layout";
import {
  AddIcon,
  ClockIcon,
  DoubleMarkIcon,
  EyeIcon,
  ReceivedIcon,
  SentIcon,
  TrashIcon,
} from "@/icons";
import { ConfirmationModal, EmptySlot } from "@/components/shared/interface";
import { modals } from "@mantine/modals";
import { MESSAGE_TYPE } from "./enums";
import { builder } from "@/builders";
import { handleError, handleSuccess } from "@/packages/notification";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import clsx from "clsx";

interface OccupantMessagesProps {
  data: MessagesData[] | undefined;
  loading?: boolean;
  handleWrite: () => void;
  recipient?: string;
}

export function OccupantMessages({
  data,
  loading,
  handleWrite,
  recipient,
}: OccupantMessagesProps) {
  const { setContent } = useMessagesValue();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: builder.use().messages.remove,
    onError: () => {
      modals.close(MODALS.CONFIRMATION);
      handleError({
        message: "An error occurred while deleting message, please try again",
      })();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: builder.messages.get.table.get(),
      });
      handleSuccess({
        autoClose: 1200,
        message: "Message deleted successfully",
      });
      modals.close(MODALS.CONFIRMATION);
    },
  });

  const handleDelete = (id: string) => {
    modals.open({
      children: (
        <ConfirmationModal
          withTwoButtons
          title={`Are you sure you want to delete this message`}
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
    <FlowContentContainer mah={680}>
      {data?.length ? (
        data?.map((message, i) => {
          const { id, content, subject, updatedAt, tag, isRead } = {
            ...message,
          };
          const viewLink = setContent({ id, view: MESSAGE_TYPE.OCCUPANT });
          const localTime = formatDate(updatedAt, TIME_FORMAT);
          const localDate = formatDate(updatedAt, "MM/DD/YYYY");

          return (
            <Flex
              key={i}
              align='center'
              className={clsx(
                "flex items-center border-b border-b-gray-3 py-4 px-4 lg:px-8 gap-2",
                { "lg:!px-4": loading }
              )}
              h={130}
            >
              <Flex
                gap={12}
                align='center'
                miw={110}
                w={{
                  lg: 350,
                }}
                className={clsx("h-full", {
                  "skeleton my-3": loading,
                })}
              >
                <Checkbox size='xs' />
                {tag === "sent" ? <SentIcon /> : <ReceivedIcon />}
                <Text className='prose-base/bold sm:prose-lg/semi-bold'>
                  {recipient}
                </Text>
              </Flex>

              <Flex
                gap={12}
                align='center'
                className={clsx("h-full w-full", {
                  "skeleton my-3": loading,
                })}
              >
                <Stack flex={1}>
                  <Text lineClamp={2} fz={14}>
                    <span className='font-bold mr-1'>{subject}</span>
                    <span className='text-gray-800'>{content}</span>
                  </Text>
                  <Flex align='center' gap={4}>
                    <ClockIcon width={14} height={14} />
                    <Text className='text-gray-300 space-x-1' fz={12}>
                      <span>{localDate}</span>
                      <span>at</span>
                      <span className='uppercase'>{localTime}</span>
                    </Text>
                  </Flex>
                </Stack>

                <FlowMenu position='bottom-end'>
                  <FlowMenuTarget />
                  <FlowMenuDropdown>
                    <Menu.Item
                      leftSection={<EyeIcon width={14} />}
                      component={Link}
                      href={makePath(PAGES.DASHBOARD, PAGES.MESSAGES, viewLink)}
                    >
                      View
                    </Menu.Item>
                    {tag !== "sent" && !isRead && (
                      <Menu.Item leftSection={<DoubleMarkIcon height={20} />}>
                        Mark as read
                      </Menu.Item>
                    )}
                    <Menu.Divider />
                    <Menu.Item
                      color='#CC0404'
                      leftSection={<TrashIcon width={15} />}
                      onClick={() => handleDelete(id)}
                    >
                      Delete
                    </Menu.Item>
                  </FlowMenuDropdown>
                </FlowMenu>
              </Flex>
            </Flex>
          );
        })
      ) : (
        <Stack h={900}>
          <EmptySlot
            title='You have no messages yet. Start a conversation to stay connected!'
            src='no-talk'
            withButton
            text='Write Message'
            btnProps={{
              leftSection: <AddIcon />,
              onClick: handleWrite,
            }}
          />
        </Stack>
      )}
    </FlowContentContainer>
  );
}
