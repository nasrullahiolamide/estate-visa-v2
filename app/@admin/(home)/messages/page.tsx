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

import { EmptySlot } from "@/components/admin/interface";
import { DownloadIcon, UploadIcon } from "@/svgs";
import { FlowFooter } from "@/components/layout/flow-footer";
import { FlowCurrentPage } from "@/components/layout/flow-current-page";
import { FlowPagination } from "@/components/layout/flow-pagination";

export default function PropertyOwners() {
  return (
    <Fragment>
      <AppShellHeader title='Messages' options={<Options />} />

      <FlowContainer type='plain'>
        <FlowContentContainer>
          <FlowPaper>
            <EmptySlot
              title='You have no messages yet. Start a conversation to stay connected!'
              src='no-talk'
              withButton
              href=''
              text='Wite a Message'
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
    <Flex gap={14} wrap='wrap'>
      <Button fz='sm' size='md' leftSection={<Add />}>
        Write a Message
      </Button>
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
