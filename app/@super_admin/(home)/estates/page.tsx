"use client";

import { Fragment } from "react";
import { Button, Flex } from "@mantine/core";
import { modals } from "@mantine/modals";
import { makePath, MODALS, PAGES } from "@/packages/libraries";
import { ConfirmDelete } from "@/components/admin/shared/modals";
import { AppShellHeader } from "@/components/admin/shared/app-shell/header";
import { FilterDropdown } from "@/components/admin/shared/dropdowns/filter";
import { EmptySlot } from "@/components/shared/interface";
import { AddIcon, DownloadIcon } from "@/svgs";
import { useFakeEstateList } from "@/builders/types/estates";

import {
  FlowContainer,
  FlowContentContainer,
  FlowEntriesPerPage,
  FlowFooter,
  FlowPagination,
  FlowPaper,
  FlowTable,
  FlowFloatingButtons,
  FlowTableActions,
} from "@/components/layout";
import { estatesColumns } from "@/columns/estates";
import { navigate } from "@/packages/actions";

const filterOptions = [
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
];

const AddNewEstates = () =>
  navigate(makePath(PAGES.ESTATES, PAGES.ADD_NEW_ESTATE));

const handleDelete = () => {
  modals.open({
    children: <ConfirmDelete title='estate' />,
    withCloseButton: false,
    modalId: MODALS.CONFIRMATION,
  });
};

export default function Estates() {
  const estates = useFakeEstateList();

  const dataToDisplay = estates?.data.map((list) => {
    return {
      ...list,
      action: (
        <FlowTableActions
          actions={["view", "edit", "delete"]}
          editProps={{
            onEdit: () => {},
          }}
          deleteProps={{
            onDelete: handleDelete,
          }}
        />
      ),
    };
  });

  return (
    <Fragment>
      <AppShellHeader title='Estates' options={<HeaderOptions />} />
      <FlowContainer type='plain' className='lg:~p-1/8'>
        <FlowContentContainer
          classNames={{
            root: "rounded-none lg:rounded-2xl bg-white",
          }}
        >
          <FlowPaper>
            {estates?.data.length ? (
              <FlowTable
                data={dataToDisplay}
                columns={estatesColumns}
                skeleton={false}
              />
            ) : (
              <EmptySlot
                title='No estate added yet. Start by adding an estate to manage!'
                src='house'
                withButton
                text='Add Estate'
                btnProps={{
                  leftSection: <AddIcon />,
                  onClick: AddNewEstates,
                }}
              />
            )}
          </FlowPaper>

          <FlowFooter hidden={false}>
            <FlowPagination />
            <FlowEntriesPerPage />
          </FlowFooter>
        </FlowContentContainer>

        <FlowFloatingButtons
          withPrimaryButon
          withSecondaryButtons
          hasFilterButton
          filterData={filterOptions}
          primaryButton={{
            icon: "add",
            btnProps: {
              onClick: AddNewEstates,
            },
          }}
          secondaryButtons={[
            {
              icon: "download",
              btnProps: {
                onClick: AddNewEstates,
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
    <Flex gap={14}>
      <Button
        fz='sm'
        size='md'
        leftSection={<AddIcon />}
        onClick={AddNewEstates}
      >
        Add New Estate
      </Button>
      <FilterDropdown data={filterOptions} />
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
