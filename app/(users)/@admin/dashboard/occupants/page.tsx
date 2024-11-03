"use client";

import { Fragment, useEffect } from "react";
import { Add } from "iconsax-react";
import { Button, Flex } from "@mantine/core";
import { modals } from "@mantine/modals";
import { MODALS } from "@/packages/libraries";
import { occupantsColumns } from "@/columns/occupants";
import { ConfirmDelete } from "@/components/admin/shared/modals";
import { AddNewOccupants } from "@/components/admin/occupants/modals/add";
import { ViewEditOccupants } from "@/components/admin/occupants/modals/view-edit";
import { AppShellHeader } from "@/components/admin/shared/app-shell";
import { FilterDropdown } from "@/components/admin/shared/dropdowns/filter";
import { EmptySlot } from "@/components/shared/interface";
import { DownloadIcon, UploadIcon } from "@/icons";
import {
  OccupantsData,
  useFakeOccupantsList,
} from "@/builders/types/occupants";
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
  useFlowPagination,
  useFlowState,
} from "@/components/layout";
import clsx from "clsx";
import { useQuery } from "@tanstack/react-query";
import { builder } from "@/builders";
import { OccupantActions } from "@/components/admin/occupants/actions";

const filterOptions = [
  { label: "Recently Added", value: "recent" },
  { label: "Name(A-Z)", value: "a-z" },
  { label: "Name(Z-A)", value: "z-a" },
];

const handleNewOccupants = () => {
  modals.open({
    title: "Add New Occupant",
    children: <AddNewOccupants />,
    modalId: MODALS.ADD_DETAILS,
  });
};

const handleViewEdit = (details: OccupantsData, edit: boolean = false) => {
  modals.open({
    title: "Occupant Details",
    modalId: MODALS.VIEW_EDIT_DETAILS,
    children: <ViewEditOccupants {...details} edit={edit} />,
  });
};

export default function Occupants() {
  const initialOccupantsList = useFakeOccupantsList();
  const pagination = useFlowPagination();
  const { page, pageSize, search, numberOfPages } = useFlowState();

  const { data: occupants, isPlaceholderData } = useQuery({
    queryKey: builder.occupants.get.get(),
    queryFn: () =>
      builder.use().occupants.get({
        page,
        pageSize,
        search,
      }),
    placeholderData: initialOccupantsList,
    select({ total, page, data, pageSize }) {
      return {
        total,
        page,
        pageSize,
        data: data.map((list) => {
          return {
            ...list,
            action: (
              <OccupantActions
                id={list.id}
                isActive={list.status.toLowerCase() === "active"}
                handlers={{
                  onAdd: handleNewOccupants,
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

    pagination.setPage(occupants?.page);
    pagination.setTotal(occupants?.total);
    pagination.setEntriesCount(occupants?.data?.length);
    pagination.setPageSize(occupants?.pageSize);
  }, [isPlaceholderData]);

  const noDataAvailable = occupants?.data.length === 0;

  return (
    <Fragment>
      <AppShellHeader
        title='Occupants'
        options={
          <HeaderOptions hidden={noDataAvailable || isPlaceholderData} />
        }
      />

      <FlowContainer type='plain' className='lg:~p-1/8'>
        <FlowContentContainer
          classNames={{
            root: "rounded-none lg:rounded-2xl bg-white",
          }}
        >
          <FlowPaper>
            {occupants?.data.length ? (
              <FlowTable
                data={occupants.data}
                columns={occupantsColumns}
                skeleton={isPlaceholderData}
                onRowClick={handleViewEdit}
              />
            ) : (
              <EmptySlot
                title='There are no occupants yet. Add one to get started!'
                src='person-minus'
                withButton
                text='Add New Occupant'
                btnProps={{
                  leftSection: <Add />,
                  onClick: handleNewOccupants,
                }}
              />
            )}
          </FlowPaper>

          <FlowFooter
            className={clsx("flex", {
              hidden: noDataAvailable || numberOfPages <= 1,
            })}
          >
            <FlowPagination />
            <FlowEntriesPerPage />
          </FlowFooter>
        </FlowContentContainer>

        <FlowFloatingButtons
          hidden={noDataAvailable || isPlaceholderData}
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

function HeaderOptions({ hidden }: { hidden: boolean }) {
  return (
    <Flex gap={14} hidden={hidden} wrap='wrap'>
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
