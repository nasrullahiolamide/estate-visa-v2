"use client";

import { Fragment } from "react";
import { Flex } from "@mantine/core";

import { AppShellHeader } from "@/components/admin/shared/app-shell/header";
import { FilterDropdown } from "@/components/admin/shared/dropdowns/filter";

import { FlowContainer } from "@/components/layout/flow-container";
import { FlowContentContainer } from "@/components/layout/flow-content-container";
import { FlowPaper } from "@/components/layout/flow-paper";

import { EmptySlot } from "@/components/shared/interface";
import { FlowFooter } from "@/components/layout/flow-footer";
import { FlowEntriesPerPage } from "@/components/layout/flow-entries-per-page";
import { FlowPagination } from "@/components/layout/flow-pagination";

const filterOptions = [
  { label: "Date", value: "date" },
  {
    label: "Service Type",
    value: "service-type",
    children: [
      {
        label: "Cleaning",
        value: "cleaning",
      },
      {
        label: "Electrical",
        value: "electrical",
      },
      {
        label: "Plumbing",
        value: "plumbing",
      },
    ],
  },
  {
    label: "Status",
    value: "status",
    children: [
      {
        label: "Pending",
        value: "pending",
      },
      {
        label: "In Progress",
        value: "in-progress",
      },
      {
        label: "Completed",
        value: "completed",
      },
    ],
  },
];

export default function ServiceRequest() {
  return (
    <Fragment>
      <AppShellHeader title='Service Request' options={<HeaderOptions />} />

      <FlowContainer type='plain'>
        <FlowContentContainer>
          <FlowPaper>
            <EmptySlot
              title='You have no service requests yet. Check back later for updates!'
              src='question'
            />
          </FlowPaper>

          <FlowFooter hidden={true}>
            <FlowEntriesPerPage />
            <FlowPagination />
          </FlowFooter>
        </FlowContentContainer>
      </FlowContainer>
    </Fragment>
  );
}

function HeaderOptions() {
  return (
    <Flex gap={14} wrap='wrap'>
      <FilterDropdown data={filterOptions} />
    </Flex>
  );
}
