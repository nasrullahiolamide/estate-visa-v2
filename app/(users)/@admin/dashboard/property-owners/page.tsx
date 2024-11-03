"use client";

import { Fragment } from "react";
import { Add } from "iconsax-react";
import { Button, Flex, Menu, Tooltip } from "@mantine/core";
import { modals } from "@mantine/modals";
import { MODALS } from "@/packages/libraries";
import { propertyOwnersColumns } from "@/columns/property-owners";
import { ConfirmDelete } from "@/components/admin/shared/modals";
import { AddNewOccupants } from "@/components/admin/occupants/modals/add";
import { ViewEditPropertyOwners } from "@/components/admin/property-owners/view-edit";
import { AppShellHeader } from "@/components/admin/shared/app-shell";
import { FilterDropdown } from "@/components/admin/shared/dropdowns/filter";
import { EmptySlot } from "@/components/shared/interface";
import {
  PropertyOwnersData,
  useFakePropertyOwnersList,
} from "@/builders/types/property-owners";
import { DownloadIcon, UploadIcon } from "@/icons";
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

const handleNewOccupants = () => {
  modals.open({
    title: "Add New Occupant",
    children: <AddNewOccupants viewId='property-owners' />,
    modalId: MODALS.ADD_NEW_OCCUPANTS,
  });
};

const handleDelete = () => {
  modals.open({
    children: <ConfirmDelete title='property owner' />,
    withCloseButton: false,
    modalId: MODALS.CONFIRMATION,
  });
};

const handleViewEdit = (details: PropertyOwnersData, edit: boolean = false) => {
  modals.open({
    title: "Property Owner Details",
    modalId: MODALS.VIEW_EDIT_NEW_OCCUPANTS,
    children: <ViewEditPropertyOwners {...details} edit={edit} />,
  });
};

export default function PropertyOwners() {
  const propertyOwners = useFakePropertyOwnersList();

  const dataToDisplay = propertyOwners?.data.map((list) => {
    const isActive = list.status === "Active";

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
            isActive,
            onActivate: () => {},
            onSuspend: () => {},
          }}
        />
      ),
    };
  });

  return (
    <Fragment>
      <AppShellHeader title='Property Owners' options={<HeaderOptions />} />

      <FlowContainer type='plain' className='lg:~p-1/8'>
        <FlowContentContainer
          classNames={{
            root: "rounded-none lg:rounded-2xl bg-white",
          }}
        >
          <FlowPaper>
            {propertyOwners?.data.length ? (
              <FlowTable
                data={dataToDisplay}
                columns={propertyOwnersColumns}
                skeleton={false}
              />
            ) : (
              <EmptySlot
                title='There are no property owners here yet. Add an occupant to get started!'
                src='person-minus'
                withButton
                text='Add New Occupant'
                btnProps={{
                  leftSection: <Add />,
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
              onClick: handleNewOccupants,
            },
          }}
          secondaryButtons={[
            {
              icon: "download",
              btnProps: {
                onClick: handleNewOccupants,
              },
            },
            {
              icon: "upload",
              btnProps: {
                onClick: handleNewOccupants,
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
      <Button
        fz='sm'
        size='md'
        leftSection={<Add />}
        onClick={handleNewOccupants}
      >
        Add New Occupant
      </Button>
      <FilterDropdown data={filterOptions} />
      <Button variant='outline' fz='sm' size='md' leftSection={<UploadIcon />}>
        Bulk Upload
      </Button>
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
