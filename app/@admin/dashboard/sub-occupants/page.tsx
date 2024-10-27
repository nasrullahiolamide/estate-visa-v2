"use client";

import { Fragment } from "react";
import { Button, Flex } from "@mantine/core";
import { AppShellHeader } from "@/components/admin/shared/app-shell/header";
import { FilterDropdown } from "@/components/admin/shared/dropdowns/filter";
import { EmptySlot } from "@/components/shared/interface";
import {
  SubOccupantsData,
  useFakeSubOccupantsList,
} from "@/builders/types/sub-occupants";
import { subOccupantsColumns } from "@/columns/sub-occupants";
import { DownloadIcon } from "@/svgs";
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
import { ViewSubOccupants } from "@/components/admin/sub-occupants/view";
import { MODALS } from "@/packages/libraries";
import { modals } from "@mantine/modals";

const filterOptions = [
  { label: "Recently Added", value: "recent" },
  { label: "Name(A-Z)", value: "a-z" },
  { label: "Name(Z-A)", value: "z-a" },
];

const handleView = (details: SubOccupantsData) => {
  modals.open({
    title: "Sub Occupant Details",
    modalId: MODALS.VIEW_SUB_OCCUPANTS,
    children: <ViewSubOccupants {...details} />,
  });
};

export default function SubOccupants() {
  const subOccupants = useFakeSubOccupantsList();

  return (
    <Fragment>
      <AppShellHeader title='Sub-Occupants' options={<HeaderOptions />} />

      <FlowContainer type='plain' className='lg:~p-1/8'>
        <FlowContentContainer
          classNames={{
            root: "rounded-none lg:rounded-2xl bg-white",
          }}
        >
          <FlowPaper>
            {subOccupants?.data.length ? (
              <FlowTable
                data={subOccupants.data}
                columns={subOccupantsColumns}
                skeleton={false}
                onRowClick={handleView}
              />
            ) : (
              <EmptySlot
                title='There are no sub-occupants yet. Check back later for updates!'
                src='person-minus'
              />
            )}
          </FlowPaper>

          <FlowFooter hidden={false}>
            <FlowPagination />
            <FlowEntriesPerPage />
          </FlowFooter>
        </FlowContentContainer>

        <FlowFloatingButtons
          withSecondaryButtons
          hasFilterButton
          filterData={filterOptions}
          secondaryButtons={[
            {
              icon: "download",
              btnProps: {
                onClick: () => console.log("Downloaded"),
              },
            },
          ]}
        />
      </FlowContainer>
    </Fragment>
  );
}

function HeaderOptions() {
  return (
    <Flex gap={14} wrap='wrap'>
      <FilterDropdown data={filterOptions} />
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
