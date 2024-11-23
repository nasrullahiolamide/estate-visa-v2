"use client";

import clsx from "clsx";
import { Fragment, useEffect } from "react";
import { APP, MODALS } from "@/packages/libraries";
import { AppShellHeader } from "@/components/shared/interface/app-shell";
import { FilterDropdown } from "@/components/shared/interface/dropdowns/filter";
import { OccupantWriteModal } from "@/components/occupant/messages/modals/write";
import { modals } from "@mantine/modals";
import {
  Button,
  Checkbox,
  Flex,
  Stack,
  Text,
  Title,
  Menu,
} from "@mantine/core";
import {
  FlowEntriesPerPage,
  FlowFooter,
  FlowMenu,
  FlowMenuDropdown,
  FlowMenuTarget,
  FlowPagination,
  FlowContentContainer,
  FlowContainer,
  useFlowState,
  useFlowPagination,
} from "@/components/layout";
import {
  Inbox,
  AddIcon,
  ArrowBack,
  ClockIcon,
  DoubleMarkIcon,
  EditIcon,
  TrashIcon,
} from "@/icons";
import { builder } from "@/builders";
import { MESSAGE_TYPE } from "@/components/admin/messages/modals/write";
import { useQuery } from "@tanstack/react-query";
import { useFakeMessagesList } from "@/builders/types/messages";
import { getCookie } from "cookies-next";
import { toString } from "lodash";
import { useMessagesValue } from "@/packages/hooks/use-messages-value";
import { EmptySlot } from "@/components/shared/interface";

const handleWriteMessage = () => {
  modals.open({
    title: "Write Message",
    modalId: MODALS.WRTIE_MESSAGE,
    children: <OccupantWriteModal />,
  });
};

export default function Messages() {
  const estateId = toString(getCookie(APP.ESTATE_ID));
  const initialMeetingList = useFakeMessagesList();
  const pagination = useFlowPagination();

  const { page, pageSize } = useFlowState();
  const { setContent } = useMessagesValue();

  const { data, isPlaceholderData } = useQuery({
    queryKey: builder.messages.get.user.get(),
    queryFn: () =>
      builder.use().messages.get.user({
        page,
        pageSize,
      }),
    placeholderData: initialMeetingList,
    select: (data) => {
      console.log(data);
      return {
        ...data,
        messages: data?.messages?.filter(
          (message) => message.type === MESSAGE_TYPE.OCCUPANT
        ),
      };
    },
  });

  useEffect(() => {
    if (isPlaceholderData) return;

    pagination.setPage(data?.page);
    pagination.setTotal(data?.total);
    pagination.setEntriesCount(data?.messages?.length);
    pagination.setPageSize(data?.pageSize);
  }, [isPlaceholderData]);

  const noDataAvailable = !data?.messages?.length;

  return (
    <Fragment>
      <AppShellHeader
        title='Messages'
        options={
          <HeaderOptions hidden={noDataAvailable || isPlaceholderData} />
        }
      />
      <FlowContainer type='plain' className='lg:~p-1/8'>
        <FlowContentContainer
          classNames={{
            root: "rounded-none lg:rounded-2xl bg-white",
          }}
        >
          {data?.messages?.length ? (
            <Fragment>
              <Title order={2} c='plum.5' fw={500} className='p-4 lg:p-8'>
                Conversations between You and the Estate Management
              </Title>

              <Stack mah={576} className='overflow-auto h-full'>
                {data?.messages.map((item, i) => {
                  const viewLink = setContent({
                    id: item.id,
                    view: MESSAGE_TYPE.OCCUPANT,
                  });
                  return (
                    <Flex
                      key={i}
                      align='center'
                      className='flex items-center border-t border-t-gray-3 py-4 px-4 lg:px-8 gap-2'
                      mih={130}
                    >
                      <Flex gap={12} align='center' miw={110} w={350}>
                        <Checkbox size='xs' />
                        {true ? (
                          <ArrowBack
                            width={14}
                            className='text-red-5 rotate-90'
                          />
                        ) : (
                          <ArrowBack className='text-green-5' />
                        )}
                        <Text className='prose-base/bold sm:prose-lg/semi-bold'>
                          You
                        </Text>
                      </Flex>

                      <Stack className='flex-grow' gap={12}>
                        <Text lineClamp={2} fz={14}>
                          <span className='font-bold mr-1'>{item.subject}</span>
                          <span className='text-gray-800'>{item.content}</span>
                        </Text>
                        <Flex align='center' gap={4}>
                          <ClockIcon width={14} height={14} />
                          <Text className='text-gray-300 space-x-1' fz={12}>
                            <span>{item.localDate}</span>
                            <span>at</span>
                            <span className='uppercase'>{item.localTime}</span>
                          </Text>
                        </Flex>
                      </Stack>

                      <FlowMenu position='bottom-end'>
                        <FlowMenuTarget />
                        <FlowMenuDropdown>
                          <Menu.Item leftSection={<DoubleMarkIcon />}>
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
                })}
              </Stack>
            </Fragment>
          ) : (
            <EmptySlot
              title='You have no messages yet. Start a conversation to stay connected!'
              src='no-talk'
              withButton
              text='Write a Message'
              btnProps={{
                leftSection: <AddIcon />,
                onClick: handleWriteMessage,
              }}
            />
          )}
        </FlowContentContainer>
        <FlowFooter
          className={clsx(
            "flex bg-white justify-between lg:rounded-b-2xl mt-2",
            {
              hidden: noDataAvailable,
            }
          )}
        >
          <FlowPagination />
          <FlowEntriesPerPage />
        </FlowFooter>
      </FlowContainer>
    </Fragment>
  );
}

function HeaderOptions({ hidden }: { hidden: boolean }) {
  return (
    <Flex gap={14} wrap='wrap' hidden={hidden}>
      <Button
        fz='sm'
        size='md'
        leftSection={<AddIcon />}
        onClick={handleWriteMessage}
      >
        Write Message
      </Button>

      <FilterDropdown
        label='All'
        icon={<Inbox />}
        data={[
          { label: "All", value: "all" },
          { label: "Inbox", value: "inbox" },
          { label: "Sent", value: "sent" },
        ]}
      />
      <FilterDropdown
        label='Filter'
        data={[
          { label: "Read Messages", value: "read-messages" },
          { label: "Unread Messages", value: "unread-messages" },
          { label: "Date", value: "date" },
        ]}
      />
    </Flex>
  );
}
