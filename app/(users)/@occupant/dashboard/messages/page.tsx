"use client";

import clsx from "clsx";

import { builder } from "@/builders";
import { useFakeMessagesList } from "@/builders/types/messages";
import {
  FlowContainer,
  FlowContentContainer,
  FlowEntriesPerPage,
  FlowFooter,
  FlowPagination,
  useFlowPagination,
  useFlowState,
} from "@/components/layout";
import { Conversations } from "@/components/shared/chat/messages/conversation";
import { MESSAGE_TYPE } from "@/components/shared/chat/types";
import { AppShellHeader } from "@/components/shared/interface/app-shell";
import { FilterDropdown } from "@/components/shared/interface/dropdowns/filter";
import { Flex, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { Fragment, useEffect } from "react";

export default function Messages() {
  const initialMeetingList = useFakeMessagesList();
  const pagination = useFlowPagination();
  const { page, pageSize } = useFlowState();

  const { data, isPlaceholderData } = useQuery({
    queryKey: builder.messages.get.user.$get({
      page,
      pageSize,
    }),
    queryFn: () =>
      builder.$use.messages.get.user({
        page,
        pageSize,
      }),
    placeholderData: initialMeetingList,
    select: (data) => {
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
          {!noDataAvailable && (
            <Title order={2} c='plum.5' fw={500} className='p-4 lg:p-6 lg:pb-0'>
              Conversations between You and the Estate Management
            </Title>
          )}
          <FlowContentContainer mah={680}>
            <Conversations data={data?.messages} loading={isPlaceholderData} />
          </FlowContentContainer>
        </FlowContentContainer>
        <FlowFooter
          className={clsx(
            "flex bg-white justify-between lg:rounded-b-2xl mt-2",
            { hidden: noDataAvailable || isPlaceholderData }
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
    <Flex gap={14} wrap='wrap' hidden={hidden} align='center'>
      {/* <FilterDropdown
        label='View'
        icon={<Inbox />}
        data={[
          { label: "All", value: "all" },
          { label: "Inbox", value: "inbox" },
          { label: "Sent", value: "sent" },
        ]}
      /> */}
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
