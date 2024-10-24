"use client";

import { Fragment } from "react";
import { Add } from "iconsax-react";
import { Button, Flex } from "@mantine/core";
import { modals } from "@mantine/modals";
import { MODALS } from "@/packages/libraries";
import { ConfirmDelete } from "@/components/admin/shared/modals";
import { AppShellHeader } from "@/components/admin/shared/app-shell/header";
import { FilterDropdown } from "@/components/admin/shared/dropdowns/filter";
import { EmptySlot } from "@/components/shared/interface";
import { DownloadIcon, UploadIcon } from "@/svgs";
import { ViewEditGates } from "@/components/admin/gates/view-edit";
import { AddNewGate } from "@/components/admin/gates/add";
import { GatesData, useFakeGatesList } from "@/builders/types/gates";
import { gatesColumns } from "@/columns/gates";
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

const filterOptions = [
  { label: "Recently Added", value: "recent" },
  { label: "Name(A-Z)", value: "a-z" },
  { label: "Name(Z-A)", value: "z-a" },
];

const handleNewGate = () => {
  modals.open({
    title: "Add New Gate",
    children: <AddNewGate />,
    modalId: MODALS.ADD_NEW_HOUSE,
  });
};

const handleDelete = () => {
  modals.open({
    children: <ConfirmDelete title='gate' />,
    withCloseButton: false,
    modalId: MODALS.CONFIRMATION,
  });
};

const handleViewEdit = (details: GatesData, edit: boolean = false) => {
  modals.open({
    title: "Gate Details",
    modalId: MODALS.VIEW_EDIT_GATES,
    children: <ViewEditGates {...details} edit={edit} />,
  });
};

export default function Gates() {
  const gates = useFakeGatesList();

  const dataToDisplay = gates?.data.map((list) => {
    const isGateOpened = list.status.toLowerCase() === "open";

    return {
      ...list,
      action: (
        <FlowTableActions
          actions={["activate-suspend", "edit", "view", "delete"]}
          editProps={{
            onEdit: () => handleViewEdit(list, true),
          }}
          viewProps={{
            onView: () => handleViewEdit(list),
          }}
          deleteProps={{
            onDelete: handleDelete,
          }}
          activateSuspendProps={{
            isActive: isGateOpened,
            onActivate: () => {},
            onSuspend: () => {},
          }}
        />
      ),
    };
  });

  return (
    <Fragment>
      <AppShellHeader title='Houses' options={<HeaderOptions />} />

      <FlowContainer type='plain' className='lg:~p-1/8'>
        <FlowContentContainer
          classNames={{
            root: "rounded-none lg:rounded-2xl bg-white",
          }}
        >
          <FlowPaper>
            {gates?.data.length ? (
              <FlowTable
                data={dataToDisplay}
                columns={gatesColumns}
                skeleton={false}
              />
            ) : (
              <EmptySlot
                title='No gates have been added yet. Add a gate to begin managing access!'
                src='gate'
                withButton
                text='Add New Gate'
                btnProps={{
                  leftSection: <Add />,
                  onClick: handleNewGate,
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
              onClick: handleNewGate,
            },
          }}
          secondaryButtons={[
            {
              icon: "download",
              btnProps: {
                onClick: () => {},
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
      <Button fz='sm' size='md' leftSection={<Add />} onClick={handleNewGate}>
        Add New Gate
      </Button>
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
