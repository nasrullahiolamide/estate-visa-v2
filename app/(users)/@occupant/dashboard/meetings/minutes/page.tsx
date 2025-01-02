"use client";

import { Flex, Stack, Text, Title } from "@mantine/core";
import { Fragment, useEffect, useMemo } from "react";

import { AppShellHeader } from "@/components/admin/shared";
import { EmptySlot } from "@/components/shared/interface";
import { APP, formatDate, makePath, PAGES } from "@/packages/libraries";

import {
  FlowContainer,
  FlowContentHorizontal,
  FlowEntriesPerPage,
  FlowFooter,
  FlowPagination,
  useFlowPagination,
  useFlowState,
} from "@/components/layout";

import { builder } from "@/builders";
import { useFakeMeetingsList } from "@/builders/types/meetings";
import { ViewMeeting } from "@/components/admin/meetings/modals/view";
import { filterOptions } from "@/components/occupant/meetings/table";
import { FilterDropdown } from "@/components/shared/interface/dropdowns";
import { DownloadIcon } from "@/icons";
import { DATE_FORMAT } from "@/packages/constants/time";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { getCookie } from "cookies-next";
import { toString } from "lodash";

export default function MeetingMinutes() {
  const [opened, { open: openDrawer, close: closeDrawer }] =
    useDisclosure(false);

  const estateId = toString(getCookie(APP.ESTATE_ID));
  const initialMeetingList = useMemo(() => useFakeMeetingsList(), []);
  const pagination = useFlowPagination();
  const { page, pageSize, query: search } = useFlowState();

  const { data: meetings, isPlaceholderData } = useQuery({
    queryKey: builder.meetings.get.table.$get(),
    queryFn: () =>
      builder.$use.meetings.get.table({
        estateId,
        page,
        pageSize,
        search,
      }),
    placeholderData: initialMeetingList,
    select: ({ page, pageSize, total, data }) => {
      return {
        page,
        pageSize,
        total,
        data: data.filter((meeting) => meeting.minutes),
      };
    },
  });

  const noDataAvailable = meetings?.data.length === 0;

  useEffect(() => {
    if (isPlaceholderData) return;

    pagination.setPage(meetings?.page);
    pagination.setTotal(meetings?.total);
    pagination.setEntriesCount(meetings?.data?.length);
    pagination.setPageSize(meetings?.pageSize);
  }, [isPlaceholderData]);

  return (
    <Fragment>
      <AppShellHeader
        title='Meetings Minutes'
        backHref={makePath(PAGES.DASHBOARD, PAGES.MEETINGS)}
        showLinks={false}
        options={
          <HeaderOptions hidden={noDataAvailable || isPlaceholderData} />
        }
      />
      <FlowContainer
        type='plain'
        justify='center'
        className={"lg:~px-1/8 bg-white bg-opacity-60"}
        gap={0}
      >
        <Stack className='overflow-auto h-full max-h-[680px] lg:max-h-[700px] ~px-1/8 lg:px-0 xl:pb-3'>
          {meetings?.data.length ? (
            <FlowContentHorizontal className='p-4 sm:p-0' gap={18} flex='none'>
              {meetings?.data.map((minute) => {
                return (
                  <Fragment>
                    <FlowContainer
                      key={minute.id}
                      p={24}
                      gap={30}
                      h={230}
                      type='plain'
                      bg='white'
                      className={clsx("rounded-xl", {
                        skeleton: isPlaceholderData,
                      })}
                    >
                      <Flex justify='space-between' align='center'>
                        <Stack gap={6}>
                          <Title order={2} fw={500}>
                            {minute.title}
                          </Title>
                          <Text fz={14}>
                            <span>{formatDate(minute.date, DATE_FORMAT)}</span>{" "}
                            <span>at</span>{" "}
                            <span className='uppercase'>{minute.time}</span>
                          </Text>
                        </Stack>
                        <Flex
                          justify='center'
                          align='center'
                          w={40}
                          h={40}
                          className='rounded-full border border-blue-7 cursor-pointer hover:bg-blue-1 hover:bg-opacity-50'
                        >
                          <DownloadIcon color='var(--blue-7)' />
                        </Flex>
                      </Flex>

                      <Text lineClamp={3}>
                        {minute.minutes.replace(/<[^>]*>/g, "").trim()}
                      </Text>
                      <Text
                        c='blue.7'
                        className='underline cursor-pointer'
                        mt={10}
                        onClick={openDrawer}
                      >
                        View Details
                      </Text>
                    </FlowContainer>
                    <ViewMeeting
                      open={opened}
                      close={closeDrawer}
                      id={minute.id}
                    />
                  </Fragment>
                );
              })}
            </FlowContentHorizontal>
          ) : (
            <EmptySlot
              title='There are no meeting minutes yet. Check back for updates!'
              src='meeting'
            />
          )}
        </Stack>

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

interface HeaderOptionsProps {
  hidden?: boolean;
}

function HeaderOptions({ hidden }: HeaderOptionsProps) {
  return (
    <Flex gap={14} hidden={hidden} wrap='wrap'>
      <FilterDropdown label='Filter' data={filterOptions} />
    </Flex>
  );
}
