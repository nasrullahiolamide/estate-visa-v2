"use client";

import { Fragment } from "react";
import { Add } from "iconsax-react";
import { Button, Flex } from "@mantine/core";
import { modals } from "@mantine/modals";
import { MODALS } from "@/packages/libraries";
import { ConfirmDelete } from "@/components/admin/shared/modals";
import { ViewEditHouses } from "@/components/admin/houses/view-edit";
import { AddNewHouse } from "@/components/admin/houses/add";
import { AppShellHeader } from "@/components/admin/shared/app-shell/header";
import { FilterDropdown } from "@/components/admin/shared/dropdowns/filter";
import { EmptySlot } from "@/components/shared/interface";
import { HousesData, useFakeHousesList } from "@/builders/types/houses";
import { housesColumns } from "@/columns/houses";
import { DownloadIcon, UploadIcon } from "@/svgs";
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

const handleNewHouse = () => {
  modals.open({
    title: "Add New House",
    children: <AddNewHouse />,
    modalId: MODALS.ADD_NEW_HOUSE,
  });
};

const handleDelete = () => {
  modals.open({
    children: <ConfirmDelete title='house' />,
    withCloseButton: false,
    modalId: MODALS.CONFIRM_DELETE,
  });
};

const handleViewEdit = (details: HousesData, edit: boolean = false) => {
  modals.open({
    title: "House Details",
    modalId: MODALS.VIEW_EDIT_HOUSES,
    children: <ViewEditHouses {...details} edit={edit} />,
  });
};

export default function Houses() {
  const houses = useFakeHousesList();

  const dataToDisplay = houses?.data.map((list) => {
    const isActive = list.status === "Active";

    return {
      ...list,
      action: (
        <FlowTableActions
          actions={["activate-suspend", "edit", "view", "delete"]}
          editProps={{
            onEdit: () => handleViewEdit(list, true),
            label: "Edit House",
          }}
          viewProps={{
            onView: () => handleViewEdit(list),
            label: "View House",
          }}
          deleteProps={{
            onDelete: handleDelete,
            label: "Delete House",
          }}
          activateSuspendProps={{
            isActive,
            onActivate: () => {},
            onSuspend: () => {},
            label: isActive ? "Suspend House" : "Activate House",
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
            {houses?.data.length ? (
              <FlowTable
                data={dataToDisplay}
                columns={housesColumns}
                skeleton={false}
              />
            ) : (
              <EmptySlot
                title='No houses added yet. Start by adding a house to manage!'
                src='house'
                withButton
                text='Add New House'
                btnProps={{
                  leftSection: <Add />,
                  onClick: handleNewHouse,
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
              onClick: handleNewHouse,
            },
          }}
          secondaryButtons={[
            {
              icon: "download",
              btnProps: {
                onClick: () => {},
              },
            },
            {
              icon: "upload",
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
      <Button fz='sm' size='md' leftSection={<Add />} onClick={handleNewHouse}>
        Add New House
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
