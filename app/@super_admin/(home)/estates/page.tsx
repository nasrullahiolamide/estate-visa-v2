"use client";

import { Fragment } from "react";
import { Add } from "iconsax-react";
import { Button, Flex } from "@mantine/core";

import { AppShellHeader } from "@/components/admin/shared/app-shell-header";
import { FilterDropdown } from "@/components/admin/shared/filter-dropdown";

import { FlowContainer } from "@/components/layout/flow-container";
import { FlowContentContainer } from "@/components/layout/flow-content-container";
import { FlowPaper } from "@/components/layout/flow-paper";
import { FlowTable } from "@/components/layout/flow-table";

import { EmptySlot } from "@/components/shared/interface";
import { estateListColumns } from "@/columns/estate-list";
import { DownloadIcon } from "@/svgs";
import { FlowFooter } from "@/components/layout/flow-footer";
import { FlowCurrentPage } from "@/components/layout/flow-current-page";
import { FlowPagination } from "@/components/layout/flow-pagination";
import { useFakeStaffList } from "@/builders/types/estate-list";

export default function Estates() {
  const estateList = useFakeStaffList();

  return (
    <Fragment>
      <AppShellHeader title='Estates' options={<Options />} />

      <FlowContainer type='plain'>
        <FlowContentContainer>
          <FlowPaper>
            <EmptySlot
              title='No estate added yet. Start by adding an estate to manage!'
              src='house'
              withButton
              href=''
              text='Add Estate'
              btnProps={{
                leftSection: <Add />,
              }}
            />
          </FlowPaper>

          <FlowFooter hidden={true}>
            <FlowCurrentPage />
            <FlowPagination />
          </FlowFooter>
        </FlowContentContainer>
      </FlowContainer>
    </Fragment>
  );
}

function Options() {
  return (
    <Flex gap={14}>
      <Button fz='sm' size='md' leftSection={<Add />}>
        Add New Estate
      </Button>
      <FilterDropdown
        data={[
          { label: "A - Z", value: "a-z" },
          { label: "Z - A", value: "z-a" },
          { label: "Most Recent", value: "most-recent" },
          {
            label: "Number of houses (low to high)",
            value: "low-to-high",
          },
          {
            label: "Number of houses (high to low)",
            value: "high-to-low",
          },
        ]}
      />
      <Button
        fz='sm'
        size='md'
        variant='outline'
        leftSection={<DownloadIcon />}
      >
        Download Table
      </Button>
    </Flex>
  );
}
