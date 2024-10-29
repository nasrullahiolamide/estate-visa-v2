"use client";

import { Fragment } from "react";
import { Add } from "iconsax-react";
import { Button, Flex } from "@mantine/core";

import { AppShellHeader } from "@/components/admin/shared/app-shell";
import { FilterDropdown } from "@/components/admin/shared/dropdowns/filter";

import { FlowContainer } from "@/components/layout/flow-container";
import { FlowContentContainer } from "@/components/layout/flow-content-container";
import { FlowPaper } from "@/components/layout/flow-paper";

import { EmptySlot } from "@/components/shared/interface";
import { FlowFooter } from "@/components/layout/flow-footer";
import { FlowEntriesPerPage } from "@/components/layout/flow-entries-per-page";
import { FlowPagination } from "@/components/layout/flow-pagination";

export default function PropertyOwners() {
  return (
    <Fragment>
      <AppShellHeader title='Market Place' options={<Options />} />

      <FlowContainer type='plain'>
        <FlowContentContainer>
          <FlowPaper>
            <EmptySlot
              title='You have no rules in the market place yet, add a new rule to get started.'
              src='marketplace'
              withButton
              text='Add New Rule'
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
        Add New Rule
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
