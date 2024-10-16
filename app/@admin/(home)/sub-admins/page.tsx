"use client";

import { Fragment } from "react";
import { Add } from "iconsax-react";
import { Button, Flex } from "@mantine/core";

import { AppShellHeader } from "@/components/admin/shared/app-shell/header";
import { FilterDropdown } from "@/components/admin/shared/dropdowns/filter-dropdown";

import { FlowContainer } from "@/components/layout/flow-container";
import { FlowContentContainer } from "@/components/layout/flow-content-container";
import { FlowPaper } from "@/components/layout/flow-paper";

import { EmptySlot } from "@/components/shared/interface";
import { DownloadIcon } from "@/svgs";
import { FlowFooter } from "@/components/layout/flow-footer";
import { FlowCurrentPage } from "@/components/layout/flow-current-page";
import { FlowPagination } from "@/components/layout/flow-pagination";
import { modals } from "@mantine/modals";
import { AddSubAdmins } from "@/components/admin/sub-admins/add";
import { MODALS } from "@/packages/libraries";
import { CancelCircleIcon } from "@/svgs";

export default function SubAdmins() {
  const handleAddSubAdmin = () => {
    modals.open({
      title: "Add New Sub Admin",
      children: <AddSubAdmins />,
      modalId: MODALS.ADD_SUB_ADMIN,
    });
  };

  return (
    <Fragment>
      <AppShellHeader
        title='Sub Admins'
        options={<Options addSubAdmin={handleAddSubAdmin} />}
      />

      <FlowContainer type='plain'>
        <FlowContentContainer>
          <FlowPaper>
            <EmptySlot
              title='There are no sub-admins here yet. Add one to get started!'
              src='person-minus'
              withButton
              text='Add Sub-Admin'
              btnProps={{
                leftSection: <Add />,
                onClick: handleAddSubAdmin,
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

interface OptionsProps {
  addSubAdmin: () => void;
}

function Options({ addSubAdmin }: OptionsProps) {
  return (
    <Flex gap={14}>
      <Button fz='sm' size='md' leftSection={<Add />} onClick={addSubAdmin}>
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
