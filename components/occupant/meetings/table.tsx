"use client";

import { Fragment } from "react";
import { useFakeMeetingsList } from "@/builders/types/meetings";
import { EmptySlot } from "@/components/shared/interface";
import {
  FlowContainer,
  FlowContentContainer,
  FlowEntriesPerPage,
  FlowFooter,
  FlowPagination,
  FlowPaper,
  FlowTable,
  FlowFloatingButtons,
} from "@/components/layout";
import { makePath, PAGES } from "@/packages/libraries";
import { Stack } from "@mantine/core";
import { meetingColumns } from "@/columns/for_occupants/meetings";

export const filterOptions = [
  { label: "(A-Z)", value: "a-z" },
  { label: "(Z-A)", value: "z-a" },
  { label: "Recently Added", value: "recent" },
  { label: "Date", value: "date" },
];

interface OccupantMeetingTableProps {
  view: "scheduled" | "completed" | "cancelled";
}

export function OccupantMeetingTable({}: OccupantMeetingTableProps) {
  const meetings = useFakeMeetingsList();

  return (
    <FlowContainer type='plain' bg='white' h='100%'>
      <FlowContentContainer>
        <Stack mah={610} className='overflow-auto h-full'>
          {true ? (
            <FlowTable
              data={meetings?.data}
              columns={meetingColumns}
              skeleton={false}
            />
          ) : (
            <EmptySlot
              title='No meetings scheduled yet. Check back soon for upcoming events!'
              src='meeting'
            />
          )}
        </Stack>

        <FlowFooter>
          <FlowPagination />
          <FlowEntriesPerPage />
        </FlowFooter>
      </FlowContentContainer>
      <FlowFloatingButtons
        hasFilterButton
        filterData={filterOptions}
        withSecondaryButtons
        secondaryButtons={[
          {
            icon: "notes",
            btnProps: {
              component: "a",
              href: makePath(PAGES.DASHBOARD, PAGES.MEETINGS, PAGES.MINUTES),
            },
          },
        ]}
      />
    </FlowContainer>
  );
}
