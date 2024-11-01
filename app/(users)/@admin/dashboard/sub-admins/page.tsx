"use client";

import clsx from "clsx";
import { Fragment, useEffect } from "react";
import { Add } from "iconsax-react";

import { getCookie } from "cookies-next";
import { useQuery } from "@tanstack/react-query";
import { Button, Flex } from "@mantine/core";
import { modals } from "@mantine/modals";

import { builder } from "@/builders";
import { ProfileData } from "@/builders/types/profile";
import { APP, decryptUri, MODALS } from "@/packages/libraries";

import { subAdminListColumns } from "@/columns/sub-admin-list";
import { AppShellHeader } from "@/components/admin/shared/app-shell";
import { FilterDropdown } from "@/components/admin/shared/dropdowns/filter";
import { AddSubAdmins } from "@/components/admin/sub-admins/add";
import { EmptySlot } from "@/components/shared/interface";
import { ViewSubAdmins } from "@/components/admin/sub-admins/view-edit";
import { DownloadIcon } from "@/icons";
import {
  SubAdminListData,
  useFakeSubAdminList,
} from "@/builders/types/sub-admins";
import {
  FlowContainer,
  FlowContentContainer,
  FlowEntriesPerPage,
  FlowFooter,
  FlowPagination,
  FlowPaper,
  FlowTable,
  FlowFloatingButtons,
  useFlowState,
  useFlowPagination,
} from "@/components/layout";
import { SubAdminActions } from "@/components/admin/sub-admins/actions";

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

const handleViewEdit = (details: SubAdminListData, edit: boolean = false) => {
  modals.open({
    title: "Sub Admin Details",
    modalId: MODALS.VIEW_EDIT_SUB_ADMIN,
    children: <ViewSubAdmins {...details} edit={edit} />,
  });
};

export default function SubAdmins() {
  const initialSubAdminList = useFakeSubAdminList();
  const pagination = useFlowPagination();
  const { page, pageSize, search, numberOfPages } = useFlowState();
  const {
    estate: { id: estateId },
  }: ProfileData = decryptUri(getCookie(APP.USER_DATA));

  const { data: subAdmins, isPlaceholderData } = useQuery({
    queryKey: builder.sub_admins.get.get(),
    queryFn: () =>
      builder.use().sub_admins.get({
        id: estateId,
        params: {
          page,
          pageSize,
          search,
        },
      }),
    placeholderData: initialSubAdminList,
    select({ total, page, data, pageSize }) {
      return {
        total,
        page,
        pageSize,
        data: data.map((list) => {
          console.log(list);
          return {
            ...list,
            action: (
              <SubAdminActions
                id={list.id}
                isActive={list.status.toLowerCase() === "active"}
                handlers={{
                  onAdd: AddSubAdmins,
                  onView: () => handleViewEdit(list),
                  onEdit: () => handleViewEdit(list, true),
                }}
              />
            ),
          };
        }),
      };
    },
  });

  useEffect(() => {
    if (isPlaceholderData) return;

    pagination.setPage(subAdmins?.page);
    pagination.setTotal(subAdmins?.total);
    pagination.setEntriesCount(subAdmins?.data?.length);
    pagination.setPageSize(subAdmins?.pageSize);
  }, [isPlaceholderData]);

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
            {subAdmins?.data.length ? (
              <FlowTable
                data={subAdmins.data}
                columns={subAdminListColumns}
                skeleton={isPlaceholderData}
                initialLeftPinnedColumns={["fullName"]}
                onRowClick={handleViewEdit}
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
          <FlowFooter
            className={clsx("flex", {
              hidden: subAdmins?.data.length === 0 || numberOfPages <= 1,
            })}
          >
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
