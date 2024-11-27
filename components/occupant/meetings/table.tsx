"use client";

import clsx from "clsx";

import { useState } from "react";

import { Menu, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { MeetingList } from "@/builders/types/meetings";
import { makePath, PAGES } from "@/packages/libraries";

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
  FlowMenuDropdown,
} from "@/components/layout";
import { ViewMeeting } from "@/components/admin/meetings/modals/view";
import { EmptySlot } from "@/components/shared/interface";

import { meetingColumns } from "@/columns/for_occupants/meetings";
import { MeetingColumns } from "@/columns/for_admins/meetings";

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
          <FlowMenuDropdown>
            <Menu.Item
              onClick={() => {
                setMeetingId(meeting.id);
                openDrawer();
              }}
            >
              View Meeting Minutes
            </Menu.Item>
          </FlowMenuDropdown>
        </FlowMenu>
      ),
    };
  });

  return (
    <FlowContainer type='plain' bg='white' h='100%'>
      <FlowContentContainer>
        <Stack mah={610} className='overflow-auto h-full'>
          {meetings?.data.length ? (
            view === "completed" ? (
              <FlowTable
                data={ActionableData}
                columns={MeetingColumns}
                skeleton={isLoading}
              />
            ) : (
              <FlowTable
                data={meetings?.data}
                columns={meetingColumns}
                skeleton={isLoading}
              />
            )
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
