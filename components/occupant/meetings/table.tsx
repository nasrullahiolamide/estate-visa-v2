"use client";

import { Stack } from "@mantine/core";

import { MeetingList } from "@/builders/types/meetings";
import { makePath, PAGES } from "@/packages/libraries";
import { meetingColumns } from "@/columns/for_occupants/meetings";

import { EmptySlot } from "@/components/shared/interface";
import {
  FlowContainer,
  FlowContentContainer,
  FlowEntriesPerPage,
  FlowFooter,
  FlowPagination,
  FlowTable,
  FlowFloatingButtons,
} from "@/components/layout";
import clsx from "clsx";

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
  numberOfPages,
}: OccupantMeetingTableProps) {
  return (
    <FlowContainer type='plain' bg='white' h='100%'>
      <FlowContentContainer>
        <Stack mah={610} className='overflow-auto h-full'>
          {meetings?.data.length ? (
            <FlowTable
              data={meetings?.data}
              columns={meetingColumns}
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
    </FlowContainer>
  );
}
