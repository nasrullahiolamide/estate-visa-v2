"use client";

import { builder } from "@/builders";
import { useFakeMessagesList } from "@/builders/types/messages";
import {
  FlowEntriesPerPage,
  FlowFooter,
  FlowPagination,
  useFlowPagination,
  useFlowState,
} from "@/components/layout";
import { FlowContainer } from "@/components/layout/flow-container";
import { FlowContentContainer } from "@/components/layout/flow-content-container";
import { Announcements } from "@/components/shared/chat/notice-board/conversation";
import { MESSAGE_TYPE } from "@/components/shared/chat/types";
import { AppShellHeader } from "@/components/shared/interface/app-shell";
import { FilterDropdown } from "@/components/shared/interface/dropdowns/filter";
import { Flex } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { Fragment, useEffect, useMemo } from "react";

export default function NoticeBoard() {
  const initialMeetingList = useMemo(() => useFakeMessagesList(), []);
  const pagination = useFlowPagination();
  const { page, pageSize } = useFlowState();

  const { data, isPlaceholderData } = useQuery({
    queryKey: builder.messages.get.user.$get(),
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
          (message) => message.type === MESSAGE_TYPE.BROADCAST
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
        title='Notice Board'
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
          <Announcements data={data?.messages} loading={isPlaceholderData} />
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
      <FilterDropdown
        label='Filter'
        data={[
          { label: "Recently Added", value: "recent" },
          { label: "Street Name(A-Z)", value: "a-z" },
          { label: "Street Name(Z-A)", value: "z-a" },
          { label: "Date", value: "date" },
        ]}
      />
    </Flex>
  );
}
