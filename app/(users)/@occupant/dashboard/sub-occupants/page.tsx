"use client";

import { useQuery } from "@tanstack/react-query";
import { Fragment, useEffect, useMemo } from "react";

import { builder } from "@/builders";
import { useFakeSubOccupantsList } from "@/builders/types/sub-occupants";
import { MODALS } from "@/packages/libraries";
import { Button, Flex } from "@mantine/core";
import { modals } from "@mantine/modals";

import { ActionSubOccupantsColumns } from "@/columns/for_occupants/sub-occupants";
import { SubOccupantActions } from "@/components/occupant/sub-occupants/actions";
import { EmptySlot } from "@/components/shared/interface";
import { AppShellHeader } from "@/components/shared/interface/app-shell";
import { FilterDropdown } from "@/components/shared/interface/dropdowns/filter";

import {
  FlowContainer,
  FlowContentContainer,
  FlowEntriesPerPage,
  FlowFloatingButtons,
  FlowFooter,
  FlowPagination,
  FlowPaper,
  FlowTable,
  useFlowPagination,
  useFlowState,
} from "@/components/layout";
import {
  SubOccupantsForm,
  SubOccupantsFormProps,
} from "@/components/occupant/sub-occupants/form";
import { AddIcon, DownloadIcon } from "@/icons";

const filterOptions = [
  { label: "Recently Added", value: "recent" },
  { label: "Name(A-Z)", value: "a-z" },
  { label: "Name(Z-A)", value: "z-a" },
];

const handleSubOccupantForm = ({ data, modalType }: SubOccupantsFormProps) => {
  modals.open({
    title: modalType === "add" ? "Add Sub Occupant" : "Sub Occupant Details",
    modalId: MODALS.FORM_DETAILS,
    children: <SubOccupantsForm data={data} modalType={modalType} />,
  });
};

export default function SubOccupants() {
  const initialSubOccupantsList = useMemo(() => useFakeSubOccupantsList(), []);
  const pagination = useFlowPagination();
  const { page, pageSize, query: search, sortBy, sortOrder } = useFlowState();

  const { data: subOccupants, isPlaceholderData } = useQuery({
    queryKey: builder.sub_occupants.get.$get({
      page,
      pageSize,
      search,
      sortBy,
      sortOrder,
    }),
    queryFn: () =>
      builder.$use.sub_occupants.get({
        page,
        pageSize,
        search,
        sortBy,
        sortOrder,
      }),
    placeholderData: initialSubOccupantsList,
    select({ total, page, data, pageSize }) {
      return {
        total,
        page,
        pageSize,
        data: data.map((list) => {
          return {
            ...list,
            action: (
              <SubOccupantActions
                id={list.id}
                handlers={{
                  onAdd: () => handleSubOccupantForm({ modalType: "add" }),
                  onEdit: () =>
                    handleSubOccupantForm({ modalType: "edit", data: list }),
                  onView: () =>
                    handleSubOccupantForm({ modalType: "view", data: list }),
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

    pagination.setPage(subOccupants?.page);
    pagination.setTotal(subOccupants?.total);
    pagination.setEntriesCount(subOccupants?.data?.length);
    pagination.setPageSize(subOccupants?.pageSize);
  }, [isPlaceholderData]);

  const noDataAvailable = subOccupants?.data.length === 0;

  return (
    <Fragment>
      <AppShellHeader
        title='Sub-Occupants'
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
            {subOccupants?.data.length ? (
              <FlowTable
                data={subOccupants.data}
                columns={ActionSubOccupantsColumns}
                skeleton={isPlaceholderData}
                onRowClick={(data) =>
                  handleSubOccupantForm({ modalType: "view", data })
                }
              />
            ) : (
              <EmptySlot
                title='There are no sub-occupants yet. Add one to get started!'
                src='person-minus'
                withButton
                text='Add Sub-Occupant'
                btnProps={{
                  leftSection: <AddIcon />,
                  onClick: () => handleSubOccupantForm({ modalType: "add" }),
                }}
              />
            )}
          </FlowPaper>
          <FlowFooter visible={noDataAvailable || isPlaceholderData}>
            <FlowPagination />
            <FlowEntriesPerPage />
          </FlowFooter>
        </FlowContentContainer>

        <FlowFloatingButtons
          hidden={noDataAvailable || isPlaceholderData}
          buttons={[
            {
              icon: "download",
              btnProps: {
                onClick: () => console.log("Downloaded"),
              },
            },
            { icon: "filter", filterData: filterOptions },
            {
              icon: "add",
              btnProps: {
                onClick: () => handleSubOccupantForm({ modalType: "add" }),
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
        leftSection={<AddIcon />}
        onClick={() => handleSubOccupantForm({ modalType: "add" })}
      >
        Add Sub-Occupant
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
