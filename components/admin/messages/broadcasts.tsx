import Link from "next/link";

import { Flex, Stack, Text } from "@mantine/core";
import { FlowContentContainer } from "@/components/layout";
import { useMessagesValue } from "@/packages/hooks/use-messages-value";
import { formatDate, makePath, PAGES } from "@/packages/libraries";

import { AddIcon, ClockIcon } from "@/icons";
import { MessagesData, MessagesList } from "@/builders/types/messages";
import { EmptySlot } from "@/components/shared/interface";
import { TIME_FORMAT } from "@/packages/constants/time";
import clsx from "clsx";

interface BroadcastMessagesProps {
  data: MessagesData[] | undefined;
  loading?: boolean;
  handleWrite: () => void;
}

export function BroadcastMessages({
  data,
  loading,
  handleWrite,
}: BroadcastMessagesProps) {
  const { setContent } = useMessagesValue();

  return (
    <FlowContentContainer mah={680}>
      {data?.length ? (
        data?.map((message, i) => {
          const { content, subject, updatedAt, id, type } = {
            ...message,
          };

          const viewLink = setContent({ id, view: type });
          const localTime = formatDate(updatedAt, TIME_FORMAT);
          const localDate = formatDate(updatedAt, "MM/DD/YYYY");

          return (
            <Flex
              key={i}
              className={clsx("border-b border-b-gray-3 px-4 lg:px-8", {
                "lg:!px-4": loading,
              })}
              mih={130}
              gap={18}
            >
              <Stack
                gap={8}
                miw={130}
                w={{
                  base: 200,
                  sm: 350,
                }}
                className={clsx("border-r border-r-gray-3 py-4", {
                  skeleton: loading,
                })}
              >
                <Text fw={500} fz={14}>
                  {subject}
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

              <Stack
                className={clsx("flex-grow p-4", {
                  skeleton: loading,
                })}
                gap={12}
              >
                <Text fw={500} fz={14}>
                  Content
                </Text>
                <Text lineClamp={2} fz={14} c='gray.8'>
                  {content}
                </Text>

                <Link
                  href={makePath(PAGES.DASHBOARD, PAGES.MESSAGES, viewLink)}
                  className='underline ml-auto text-blue-5 text-sm '
                >
                  View More
                </Link>
              </Stack>
            </Flex>
          );
        })
      ) : (
        <Stack h={900}>
          <EmptySlot
            title='You have no broadcast yet. Start a conversation to stay connected!'
            src='no-talk'
            withButton
            text='Send a Broadcast'
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
