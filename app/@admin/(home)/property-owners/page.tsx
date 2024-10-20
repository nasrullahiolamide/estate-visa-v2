"use client";

import { Fragment } from "react";
import { Add } from "iconsax-react";
import { Button, Flex, Menu, Tooltip } from "@mantine/core";
import { modals } from "@mantine/modals";
import { MODALS } from "@/packages/libraries";
import { propertyOwnersColumns } from "@/columns/property-owners";
import { ConfirmDelete } from "@/components/admin/shared/modals";
import { AddNewOccupants } from "@/components/admin/occupants/add";
import { ViewEditPropertyOwners } from "@/components/admin/property-owners/view-edit";
import { AppShellHeader } from "@/components/admin/shared/app-shell/header";
import { FilterDropdown } from "@/components/admin/shared/dropdowns/filter-dropdown";
import { EmptySlot } from "@/components/shared/interface";
import {
  PropertyOwnersData,
  useFakePropertyOwnersList,
} from "@/builders/types/property-owners";
import {
  DownloadIcon,
  UploadIcon,
  EditIcon,
  EyeIcon,
  ActivateIcon,
  DeactivateIcon,
  TrashIcon,
} from "@/svgs";
import {
  FlowContainer,
  FlowContentContainer,
  FlowEntriesPerPage,
  FlowFooter,
  FlowMenu,
  FlowMenuDropdown,
  FlowMenuTarget,
  FlowPagination,
  FlowPaper,
  FlowTable,
  FlowFloatingButtons,
  FlowMenuItem,
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
    modalId: MODALS.CONFIRM_DELETE,
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
        <>
          <FlowMenu wrapperProps={{ className: "block sm:hidden text-center" }}>
            <FlowMenuTarget />
            <FlowMenuDropdown>
              <FlowMenuItem item='view' onClick={() => handleViewEdit(list)} />
              <FlowMenuItem
                item='edit'
                onClick={() => handleViewEdit(list, true)}
              />
              <FlowMenuItem
                item='activate-suspend'
                isActive={isActive}
                handlers={{
                  onActivate: () => console.log("Activated"),
                  onSuspend: () => console.log("Suspended"),
                }}
              />
              <Menu.Divider />
              <FlowMenuItem item='delete' onClick={handleDelete} />
            </FlowMenuDropdown>
          </FlowMenu>

          <Flex className='hidden sm:flex' gap={8} align='center'>
            <Tooltip label='View'>
              <div onClick={() => handleViewEdit(list)}>
                <EyeIcon color='var(--blue-8)' />
              </div>
            </Tooltip>
            <Tooltip label='Edit'>
              <div onClick={() => handleViewEdit(list, true)}>
                <EditIcon color='var(--blue-8)' />
              </div>
            </Tooltip>
            {isActive ? (
              <Tooltip label='De-activate'>
                <div>
                  <DeactivateIcon />
                </div>
              </Tooltip>
            ) : (
              <Tooltip label='Activate'>
                <div>
                  <ActivateIcon />
                </div>
              </Tooltip>
            )}

            <Tooltip label='Delete'>
              <div onClick={handleDelete}>
                <TrashIcon />
              </div>
            </Tooltip>
          </Flex>
        </>
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

export function HeaderOptions() {
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
