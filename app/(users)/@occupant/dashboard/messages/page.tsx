"use client";

import clsx from "clsx";
import { Fragment } from "react";
import { MODALS } from "@/packages/libraries";
import { AppShellHeader } from "@/components/admin/shared/app-shell";
import { FilterDropdown } from "@/components/admin/shared/dropdowns/filter";
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

const handleWriteMessage = () => {
  modals.open({
    title: "Write Message",
    modalId: MODALS.WRTIE_MESSAGE,
    children: <OccupantWriteModal />,
  });
};

export default function Messages() {
  return (
    <Fragment>
      <AppShellHeader title='Messages' options={<HeaderOptions />} />
      <FlowContainer type='plain' className='lg:~p-1/8'>
        <FlowContentContainer
          classNames={{
            root: "rounded-none lg:rounded-2xl bg-white",
          }}
        >
          <Title order={2} c='plum.5' fw={500} className='p-4 lg:p-8'>
            Conversations between You and the Estate Management
          </Title>

          <Stack mah={576} className='overflow-auto h-full'>
            {Array.from({ length: 10 }).map((_, i) => {
              // const viewLink = setContent({
              //   id: i.toString(),
              //   view: "occupants",
              // });
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
                      <ArrowBack width={14} className='text-red-5 rotate-90' />
                    ) : (
                      <ArrowBack className='text-green-5' />
                    )}
                    <Text className='prose-base/bold sm:prose-lg/semi-bold'>
                      You
                    </Text>
                  </Flex>

                  <Stack className='flex-grow' gap={12}>
                    <Text lineClamp={2} fz={14}>
                      <span className='font-bold mr-1'>
                        Meeting Minutes Review.
                      </span>
                      <span className='text-gray-800'>
                        Lorem ipsum dolor sit amet consectetur. Semper id lacus
                        pretium tellus feugiat pretium tellus. Lorem ipsum dolor
                        sit amet consectetur. Semper id lacus pretium tellus
                        feugiat pretium tellus
                      </span>
                    </Text>
                    <Flex align='center' gap={4}>
                      <ClockIcon width={14} height={14} />
                      <Text className='text-gray-300 space-x-1' fz={12}>
                        <span>24/07/2024</span>
                        <span>at</span>
                        <span>9:00AM</span>
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
        </FlowContentContainer>
        <FlowFooter
          className={clsx(
            "flex bg-white justify-between lg:rounded-b-2xl mt-2",
            {
              hidden: false,
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

function HeaderOptions() {
  return (
    <Flex gap={14} wrap='wrap'>
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
