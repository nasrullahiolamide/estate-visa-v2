"use client";

import clsx from "clsx";

import { Fragment, useEffect } from "react";
import { Add } from "iconsax-react";
import { Button, Flex } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useQuery } from "@tanstack/react-query";

import { builder } from "@/builders";
import { useFakeHousesList } from "@/builders/types/houses";
import { MODALS } from "@/packages/libraries";
import { AppShellHeader } from "@/components/admin/shared/app-shell";
import { FilterDropdown } from "@/components/admin/shared/dropdowns/filter";
import { EmptySlot } from "@/components/shared/interface";
import { HousesActions } from "@/components/admin/houses/actions";
import { housesColumns } from "@/columns/for_admins/houses";
import { DownloadIcon, UploadIcon } from "@/icons";
import {
  HouseForm,
  HouseFormProps,
} from "@/components/admin/houses/modals/form";
import {
  FlowContainer,
  FlowContentContainer,
  FlowEntriesPerPage,
  FlowFooter,
  FlowPagination,
  FlowPaper,
  FlowTable,
  FlowFloatingButtons,
  useFlowPagination,
  useFlowState,
} from "@/components/layout";

const filterOptions = [
  { label: "Recently Added", value: "recent" },
  { label: "Street Name(A-Z)", value: "a-z" },
  { label: "Street Name(Z-A)", value: "z-a" },
  {
    label: "Status",
    value: "status",
    children: [
      {
        label: "Active",
        value: "active",
      },
      {
        label: "Suspended",
        value: "suspended",
      },
    ],
  },
];

const handleHouseForm = ({ data, modalType = "add" }: HouseFormProps) => {
  modals.open({
    title: modalType === "add" ? "Add New House" : "House Details",
    modalId: MODALS.FORM_DETAILS,
    children: <HouseForm data={data} modalType={modalType} />,
  });
};

export default function Houses() {
  const initialHousesList = useFakeHousesList();
  const pagination = useFlowPagination();
  const { page, pageSize, search, numberOfPages } = useFlowState();

  const { data: houses, isPlaceholderData } = useQuery({
    queryKey: builder.houses.list.table.get(),
    queryFn: () =>
      builder.use().houses.list.table({
        page,
        pageSize,
        search,
      }),
    placeholderData: initialHousesList,
    select({ total, page, data, pageSize }) {
      return {
        total,
        page,
        pageSize,
        data: data.map((list) => {
          return {
            ...list,
            action: (
              <HousesActions
                id={list.id}
                isActive={list.status.toLowerCase() === "active"}
                handlers={{
                  onAdd: () => handleHouseForm({ modalType: "add" }),
                  onView: () =>
                    handleHouseForm({ data: list, modalType: "view" }),
                  onEdit: () =>
                    handleHouseForm({ data: list, modalType: "edit" }),
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

    pagination.setPage(houses?.page);
    pagination.setTotal(houses?.total);
    pagination.setEntriesCount(houses?.data?.length);
    pagination.setPageSize(houses?.pageSize);
  }, [isPlaceholderData]);

  const noDataAvailable = houses?.data.length === 0;

  return (
    <Fragment>
      <AppShellHeader
        title='Houses'
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
            {houses?.data.length ? (
              <FlowTable
                data={houses.data}
                columns={housesColumns}
                skeleton={isPlaceholderData}
              />
            ) : (
              <EmptySlot
                title='No houses added yet. Start by adding a house to manage!'
                src='house'
                withButton
                text='Add New House'
                btnProps={{
                  leftSection: <Add />,
                  onClick: () => handleHouseForm({ modalType: "add" }),
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
              onClick: () => handleHouseForm({ modalType: "add" }),
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

function HeaderOptions({ hidden }: { hidden: boolean }) {
  return (
    <Flex gap={14} hidden={hidden} wrap='wrap'>
      <Button
        fz='sm'
        size='md'
        leftSection={<Add />}
        onClick={() => handleHouseForm({ modalType: "add" })}
      >
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
