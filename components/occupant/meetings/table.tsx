"use client";

import { Menu, Stack } from "@mantine/core";

import { MeetingList } from "@/builders/types/meetings";
import { makePath, PAGES } from "@/packages/libraries";
import { MeetingColumns } from "@/columns/for_admins/meetings";

import { EmptySlot } from "@/components/shared/interface";
import {
  FlowContainer,
  FlowContentContainer,
  FlowEntriesPerPage,
  FlowFooter,
  FlowPagination,
  FlowTable,
  FlowFloatingButtons,
  FlowMenu,
  FlowMenuTarget,
} from "@/components/layout";
import clsx from "clsx";
import { ViewMeeting } from "@/components/admin/meetings/modals/view";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

export const filterOptions = [
  { label: "(A-Z)", value: "a-z" },
  { label: "(Z-A)", value: "z-a" },
  { label: "Recently Added", value: "recent" },
  { label: "Date", value: "date" },
];

interface OccupantMeetingTableProps {
  view?: "scheduled" | "completed" | "cancelled";
  meetings: MeetingList | undefined;
  isLoading?: boolean;
  empty?: boolean;
  numberOfPages: number;
}

export function OccupantMeetingTable({
  view,
  meetings,
  isLoading,
  empty,
}: OccupantMeetingTableProps) {
  const [opened, { open: openDrawer, close: closeDrawer }] =
    useDisclosure(false);

  const [meetingId, setMeetingId] = useState("");

  const ActionableData = meetings?.data.map((meeting) => {
    return {
      ...meeting,
      action: (
        <FlowMenu disabled={meeting.status !== "completed"}>
          <FlowMenuTarget />
          <Menu.Item
            onClick={() => {
              setMeetingId(meeting.id);
              openDrawer();
            }}
          >
            View Meeting Minutes
          </Menu.Item>
        </FlowMenu>
      ),
    };
  });

  return (
    <FlowContainer type='plain' bg='white' h='100%'>
      <FlowContentContainer>
        <Stack mah={610} className='overflow-auto h-full'>
          {meetings?.data.length ? (
            <FlowTable
              data={ActionableData}
              columns={MeetingColumns}
              skeleton={isLoading}
            />
          ) : (
            <EmptySlot
              title={` No meetings ${view} yet. Check back soon for updates!`}
              src='meeting'
            />
          )}
        </Stack>

        <FlowFooter
          className={clsx(
            "flex justify-between bg-white border-t border-primary-border-light",
            {
              hidden: empty,
            }
          )}
        >
          <FlowPagination />
          <FlowEntriesPerPage />
        </FlowFooter>
      </FlowContentContainer>
      <FlowFloatingButtons
        hidden={empty || isLoading}
        buttons={[
          {
            icon: "notes",
            btnProps: {
              component: "a",
              href: makePath(PAGES.DASHBOARD, PAGES.MEETINGS, PAGES.MINUTES),
            },
          },
          { icon: "filter", filterData: filterOptions },
        ]}
      />
      <ViewMeeting open={opened} close={closeDrawer} id={meetingId} />
    </FlowContainer>
  );
}
