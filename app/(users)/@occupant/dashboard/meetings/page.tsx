"use client";

import Link from "next/link";
import { Fragment } from "react";
import { useQueryState } from "nuqs";

import { Button, CheckIcon, Flex, Tabs } from "@mantine/core";
import { makePath, PAGES } from "@/packages/libraries";
import { AppShellHeader } from "@/components/admin/shared/app-shell";
import { FilterDropdown } from "@/components/admin/shared/dropdowns/filter";
import {
  filterOptions,
  OccupantMeetingTable,
} from "@/components/occupant/meetings/table";
import {
  FlowContainer,
  FlowContentContainer,
  FlowTabs,
  FlowTabsPanel,
} from "@/components/layout";

import {
  CarbonRule,
  CancelCircleIcon,
  HourglassIcon,
  NotesIcon,
} from "@/icons";

export default function Minutes() {
  const [view, setView] = useQueryState("type", {
    defaultValue: "scheduled",
  });

  return (
    <Fragment>
      <AppShellHeader title='Meetings' options={<HeaderOptions />} />
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
            <Flex align='center'>
              <Tabs.List className='w-full'>
                <Tabs.Tab
                  value='scheduled'
                  flex={1}
                  py={18}
                  leftSection={<HourglassIcon />}
                >
                  Scheduled
                </Tabs.Tab>
                <Tabs.Tab
                  value='completed'
                  flex={1}
                  py={18}
                  leftSection={<CheckIcon />}
                >
                  Completed
                </Tabs.Tab>
                <Tabs.Tab
                  value='cancelled'
                  flex={1}
                  py={18}
                  leftSection={<CancelCircleIcon />}
                >
                  Cancelled
                </Tabs.Tab>
              </Tabs.List>
            </Flex>

            <FlowTabsPanel value='scheduled'>
              <OccupantMeetingTable view='scheduled' />
            </FlowTabsPanel>
            <FlowTabsPanel value='completed'>
              <OccupantMeetingTable view='completed' />
            </FlowTabsPanel>
            <FlowTabsPanel value='cancelled'>
              <OccupantMeetingTable view='cancelled' />
            </FlowTabsPanel>
          </FlowTabs>
        </FlowContentContainer>
      </FlowContainer>
    </Fragment>
  );
}

function HeaderOptions() {
  return (
    <Flex gap={14} wrap='wrap'>
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
