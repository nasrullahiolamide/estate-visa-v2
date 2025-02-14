"use client";

import Link from "next/link";
import { useQueryState } from "nuqs";
import { Fragment, useEffect, useMemo } from "react";

import {
  FlowContainer,
  FlowContentContainer,
  FlowTabs,
  FlowTabsPanel,
  useFlowPagination,
  useFlowState,
} from "@/components/layout";
import {
  filterOptions,
  OccupantMeetingTable,
} from "@/components/occupant/meetings/table";
import { AppShellHeader } from "@/components/shared/interface/app-shell";
import { FilterDropdown } from "@/components/shared/interface/dropdowns/filter";
import { APP, makePath, PAGES } from "@/packages/libraries";
import { Button, CheckIcon, Flex, Tabs } from "@mantine/core";

import { builder } from "@/builders";
import { useFakeMeetingsList } from "@/builders/types/meetings";
import { CancelCircleIcon, HourglassIcon, NotesIcon } from "@/icons";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { toString } from "lodash";

export default function Minutes() {
  const [view, setView] = useQueryState("type", {
    defaultValue: "scheduled",
  });

  const estateId = toString(getCookie(APP.ESTATE_ID));
  const initialMeetingList = useMemo(() => useFakeMeetingsList(), []);
  const pagination = useFlowPagination();
  const { page, pageSize, query: search, numberOfPages } = useFlowState();

  const { data: meetings, isPlaceholderData } = useQuery({
    queryKey: builder.meetings.get.table.$get(),
    queryFn: () =>
      builder.$use.meetings.get.table({
        estateId,
        page,
        pageSize,
        search,
        status: view,
      }),
    placeholderData: initialMeetingList,
    select: (data) => data,
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
        title='Meetings'
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
          <FlowTabs
            value={view}
            onChange={setView}
            tabsContainerProps={{ gap: 0 }}
          >
            <Tabs.List className='!w-full'>
              <Tabs.Tab
                value='scheduled'
                flex={1}
                className='w-full'
                py={18}
                leftSection={<HourglassIcon />}
              >
                Scheduled
              </Tabs.Tab>
              <Tabs.Tab
                value='completed'
                flex={1}
                className='w-full'
                py={18}
                leftSection={<CheckIcon />}
              >
                Completed
              </Tabs.Tab>
              <Tabs.Tab
                value='cancelled'
                flex={1}
                className='w-full'
                py={18}
                leftSection={<CancelCircleIcon />}
              >
                Cancelled
              </Tabs.Tab>
            </Tabs.List>

            <FlowTabsPanel value='scheduled'>
              <OccupantMeetingTable
                view='scheduled'
                meetings={meetings}
                isLoading={isPlaceholderData}
                numberOfPages={numberOfPages}
                empty={noDataAvailable || isPlaceholderData}
              />
            </FlowTabsPanel>
            <FlowTabsPanel value='completed'>
              <OccupantMeetingTable
                view='completed'
                meetings={meetings}
                isLoading={isPlaceholderData}
                numberOfPages={numberOfPages}
                empty={noDataAvailable || isPlaceholderData}
              />
            </FlowTabsPanel>
            <FlowTabsPanel value='cancelled'>
              <OccupantMeetingTable
                view='cancelled'
                meetings={meetings}
                isLoading={isPlaceholderData}
                numberOfPages={numberOfPages}
                empty={noDataAvailable || isPlaceholderData}
              />
            </FlowTabsPanel>
          </FlowTabs>
        </FlowContentContainer>
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
      <Button
        fz='sm'
        size='md'
        leftSection={<NotesIcon />}
        component={Link}
        href={makePath(PAGES.DASHBOARD, PAGES.MEETINGS, PAGES.MINUTES)}
      >
        Meeting Minutes
      </Button>
    </Flex>
  );
}
