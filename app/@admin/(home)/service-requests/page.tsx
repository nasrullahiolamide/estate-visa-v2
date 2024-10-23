"use client";

import { Fragment } from "react";
import { Add } from "iconsax-react";
import { Button, Flex } from "@mantine/core";

import { AppShellHeader } from "@/components/admin/shared/app-shell/header";
import { FilterDropdown } from "@/components/admin/shared/dropdowns/filter";

import { FlowContainer } from "@/components/layout/flow-container";
import { FlowContentContainer } from "@/components/layout/flow-content-container";
import { FlowPaper } from "@/components/layout/flow-paper";
import { FlowTable } from "@/components/layout/flow-table";

import { EmptySlot } from "@/components/shared/interface";
import { DownloadIcon, UploadIcon } from "@/svgs";
import { FlowFooter } from "@/components/layout/flow-footer";
import { FlowEntriesPerPage } from "@/components/layout/flow-entries-per-page";
import { FlowPagination } from "@/components/layout/flow-pagination";

export default function ServiceRequest() {
  return (
    <Fragment>
      <AppShellHeader title='Service Request' options={<Options />} />

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

function Options() {
  return (
    <Flex gap={14} wrap='wrap'>
      <FilterDropdown
        data={[
          { label: "Recently Added", value: "recent" },
          { label: "Street Name(A-Z)", value: "a-z" },
          { label: "Street Name(Z-A)", value: "z-a" },
        ]}
      />
    </Flex>
  );
}
