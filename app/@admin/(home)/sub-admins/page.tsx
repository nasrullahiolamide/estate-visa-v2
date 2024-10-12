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

import { EmptySlot } from "@/components/interface";
import { DownloadIcon } from "@/svgs";
import { FlowFooter } from "@/components/layout/flow-footer";
import { FlowCurrentPage } from "@/components/layout/flow-current-page";
import { FlowPagination } from "@/components/layout/flow-pagination";

export default function SubAdmins() {
  return (
    <Fragment>
      <AppShellHeader title='Sub Admins' options={<Options />} />

      <FlowContainer type='plain'>
        <FlowContentContainer>
          <FlowPaper>
            <EmptySlot
              title='There are no sub-admins here yet. Add one to get started!'
              src='person-minus'
              withButton
              href=''
              text='Add Sub-Admin'
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

export function Options() {
  return (
    <Flex gap={14}>
      <Button fz='sm' size='md' leftSection={<Add />}>
        Add New Sub Admin
      </Button>
      <FilterDropdown
        data={[
          { label: "Recently Added", value: "recent" },
          { label: "Name(A-Z)", value: "a-z" },
          { label: "Name(Z-A)", value: "z-a" },
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
