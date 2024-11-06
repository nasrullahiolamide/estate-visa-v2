"use client";
import clsx from "clsx";

import { Fragment, useEffect } from "react";
import { Add } from "iconsax-react";
import { Button, Flex } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useQuery } from "@tanstack/react-query";

import { builder } from "@/builders";
import { useFakeHousesList } from "@/builders/types/houses";
import { makePath, MODALS, PAGES } from "@/packages/libraries";
import { AppShellHeader } from "@/components/admin/shared/app-shell";
import { FilterDropdown } from "@/components/admin/shared/dropdowns/filter";
import { EmptySlot } from "@/components/shared/interface";
import { HousesActions } from "@/components/admin/houses/actions";
import { housesColumns } from "@/columns/houses";
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
import { AddIcon } from "@/icons";

const filterOptions = [
  { label: "Date", value: "date" },
  {
    label: "Applied To:",
    value: "applied-to",
    children: [
      {
        label: "Occupants",
        value: "occupants",
      },
      {
        label: "Sub Occupants",
        value: "sub-occupants",
      },
      {
        label: "All Users",
        value: "all-users",
      },
    ],
  },
  {
    label: "Status",
    value: "status",
    children: [
      {
        label: "Active",
        value: "active",
      },
      {
        label: "In Active",
        value: "in-active",
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

export default function MarketRules() {
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
        title='Market Rules'
        backHref={makePath(PAGES.DASHBOARD, PAGES.MARKET_PLACE)}
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
                title='You have no rules in the market place yet, add a new rule to get started.'
                src='marketplace'
                withButton
                text='Add New Rule'
                btnProps={{
                  leftSection: <AddIcon />,
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
          hasFilterButton
          filterData={filterOptions}
          primaryButton={{
            icon: "add",
            btnProps: {
              onClick: () => handleHouseForm({ modalType: "add" }),
            },
          }}
        />
      </FlowContainer>
    </Fragment>
  );
}

function HeaderOptions({ hidden }: { hidden: boolean }) {
  return (
    <Flex gap={14} hidden={hidden} wrap='wrap'>
      <Button fz='sm' size='md' leftSection={<AddIcon />}>
        Add New Rule
      </Button>
      <FilterDropdown data={filterOptions} />
    </Flex>
  );
}
