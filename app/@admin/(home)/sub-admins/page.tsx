"use client";

import { Fragment, useEffect } from "react";
import { Add, Trash } from "iconsax-react";
import { Button, Flex, Menu, Tooltip } from "@mantine/core";
import { modals } from "@mantine/modals";
import { MODALS } from "@/packages/libraries";
import { subAdminListColumns } from "@/columns/sub-admin-list";
import { AppShellHeader } from "@/components/admin/shared/app-shell/header";
import { FilterDropdown } from "@/components/admin/shared/dropdowns/filter-dropdown";
import { AddSubAdmins } from "@/components/admin/sub-admins/add";
import { EmptySlot } from "@/components/shared/interface";
import { ConfirmDelete } from "@/components/admin/shared/modals";
import { ViewSubAdmins } from "@/components/admin/sub-admins/view-edit";
import {
  SubAdminListData,
  useFakeSubAdminList,
} from "@/builders/types/sub-admins";
import {
  DownloadIcon,
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
  useFlowState,
  useFlowPagination,
  FlowMenuItem,
} from "@/components/layout";

const filterData = [
  { label: "Recently Added", value: "recent" },
  { label: "Name(A-Z)", value: "a-z" },
  { label: "Name(Z-A)", value: "z-a" },
];

const handleAddSubAdmin = () => {
  modals.open({
    title: "Add New Sub Admin",
    children: <AddSubAdmins />,
    modalId: MODALS.ADD_SUB_ADMIN,
  });
};

const handleDelete = () => {
  modals.open({
    children: <ConfirmDelete title='property owner' />,
    withCloseButton: false,
    modalId: MODALS.CONFIRM_DELETE,
  });
};

const handleViewEdit = (details: SubAdminListData, edit: boolean = false) => {
  modals.open({
    title: "Sub Admin Details",
    modalId: MODALS.VIEW_EDIT_SUB_ADMIN,
    children: <ViewSubAdmins {...details} edit={edit} />,
  });
};

export default function SubAdmins() {
  const subAdminsData = useFakeSubAdminList();

  const dataToDisplay = subAdminsData?.data.map((list) => {
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

  const { page, search } = useFlowState();
  const pagination = useFlowPagination();

  useEffect(() => {
    if (false) return;

    pagination.setPage(subAdminsData?.current_page);
    pagination.setTotal(subAdminsData?.total);
    pagination.setEntriesCount(subAdminsData?.data?.length);
    pagination.setPageSize(subAdminsData?.page_size);
  }, []);

  return (
    <Fragment>
      <AppShellHeader title='Sub Admins' options={<HeaderOptions />} />

      <FlowContainer type='plain' className='lg:~p-1/8'>
        <FlowContentContainer
          classNames={{
            root: "rounded-none lg:rounded-2xl bg-white",
          }}
        >
          <FlowPaper>
            {subAdminsData?.data.length ? (
              <FlowTable
                data={dataToDisplay}
                columns={subAdminListColumns}
                skeleton={false}
              />
            ) : (
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
          filterData={filterData}
          primaryButton={{
            icon: "add",
            btnProps: {
              onClick: handleAddSubAdmin,
            },
          }}
          secondaryButtons={[
            {
              icon: "download",
              btnProps: {
                onClick: handleAddSubAdmin,
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
        leftSection={<Add />}
        onClick={handleAddSubAdmin}
      >
        Add New Sub Admin
      </Button>
      <FilterDropdown data={filterData} />
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
