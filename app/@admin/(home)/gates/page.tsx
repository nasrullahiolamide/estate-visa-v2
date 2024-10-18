"use client";

import { Fragment } from "react";
import { Add } from "iconsax-react";
import { Button, Flex } from "@mantine/core";

import { AppShellHeader } from "@/components/admin/shared/app-shell/header";
import { FilterDropdown } from "@/components/admin/shared/dropdowns/filter-dropdown";

import { FlowContainer } from "@/components/layout/flow-container";
import { FlowContentContainer } from "@/components/layout/flow-content-container";
import { FlowPaper } from "@/components/layout/flow-paper";
import { FlowTable } from "@/components/layout/flow-table";

import { EmptySlot } from "@/components/shared/interface";
import { DownloadIcon, UploadIcon } from "@/svgs";
import { FlowFooter } from "@/components/layout/flow-footer";
import { FlowEntriesPerPage } from "@/components/layout/flow-entries-per-page";
import { FlowPagination } from "@/components/layout/flow-pagination";

export default function Gates() {
  return (
    <Fragment>
      <AppShellHeader title='Gates' options={<Options />} />

      <FlowContainer type='plain'>
        <FlowContentContainer>
          <FlowPaper>
            <EmptySlot
              title='No gates have been added yet. Add a gate to begin managing access!'
              src='gate'
              withButton
              text='Add New Gate'
              btnProps={{
                leftSection: <Add />,
              }}
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
      <Button fz='sm' size='md' leftSection={<Add />}>
        Add New Gate
      </Button>
      <FilterDropdown
        data={[
          { label: "Recently Added", value: "recent" },
          { label: "Name(A-Z)", value: "a-z" },
          { label: "Name(Z-A)", value: "z-a" },
        ]}
      />
      <Button
        variant='outline'
        fz='sm'
        size='md'
        leftSection={<DownloadIcon />}
      >
        Download Table
      </Button>
    </Flex>
  );
}