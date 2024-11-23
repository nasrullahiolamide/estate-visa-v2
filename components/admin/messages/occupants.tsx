"use client";

import clsx from "clsx";
import { Checkbox, Flex, Menu, Stack, Text } from "@mantine/core";
import { MessagesData, MessagesList } from "@/builders/types/messages";
import { TIME_FORMAT } from "@/packages/constants/time";
import { useMessagesValue } from "@/packages/hooks/use-messages-value";
import { formatDate } from "@/packages/libraries";

import {
  FlowContentContainer,
  FlowMenu,
  FlowMenuDropdown,
  FlowMenuTarget,
  useFlowPagination,
} from "@/components/layout";
import {
  AddIcon,
  ArrowBack,
  ClockIcon,
  DoubleMarkIcon,
  EditIcon,
  TrashIcon,
} from "@/icons";
import { EmptySlot } from "@/components/shared/interface";
interface OccupantMessagesProps {
  data: MessagesData[] | undefined;
  loading?: boolean;
  handleWrite: () => void;
}

export function OccupantMessages({
  data,
  loading,
  handleWrite,
}: OccupantMessagesProps) {
  const { setContent } = useMessagesValue();

  const pagination = useFlowPagination();

  // useEffect(() => {
  //   if (loading) return;

  //   pagination.setPage(data?.page);
  //   pagination.setTotal(data?.total);
  //   pagination.setEntriesCount(data?.messages?.length);
  //   pagination.setPageSize(data?.pageSize);
  // }, [loading]);

  // const noDataAvailable = data?.messages?.length === 0;

  return (
    <FlowContentContainer mah={680}>
      {data?.length ? (
        data?.map((message, i) => {
          const { content, subject, updatedAt } = {
            ...message,
          };
          // const viewLink = setContent({ id, view: type });

          const localTime = formatDate(updatedAt, TIME_FORMAT);
          const localDate = formatDate(updatedAt, "MM/DD/YYYY");

          return (
            <Flex
              key={i}
              align='center'
              className={clsx(
                "flex items-center border-b border-b-gray-3 py-4 px-4 lg:px-8 gap-2",
                { "loading lg:!px-4": loading }
              )}
              mih={130}
            >
              <Flex gap={12} align='center' miw={110} w={350}>
                <Checkbox size='xs' />
                {true ? (
                  <ArrowBack width={14} className='text-red-5 rotate-90' />
                ) : (
                  <ArrowBack className='text-green-5' />
                )}
                <Text className='prose-base/bold sm:prose-lg/semi-bold'>
                  {44}
                </Text>
              </Flex>

              <Stack className='flex-grow' gap={12}>
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
                  <Menu.Item leftSection={<DoubleMarkIcon width={20} />}>
                    Mark as read
                  </Menu.Item>
                  <Menu.Item leftSection={<EditIcon width={14} />}>
                    Edit
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item
                    color='#CC0404'
                    leftSection={<TrashIcon width={15} />}
                  >
                    Delete
                  </Menu.Item>
                </FlowMenuDropdown>
              </FlowMenu>
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
