"use client";

import clsx from "clsx";
import { Fragment, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { modals } from "@mantine/modals";
import { Button, Flex } from "@mantine/core";
import { builder } from "@/builders";
import { useFakeSubOccupantsList } from "@/builders/types/sub-occupants";
import { MODALS } from "@/packages/libraries";

import { AppShellHeader } from "@/components/admin/shared/app-shell";
import { FilterDropdown } from "@/components/admin/shared/dropdowns/filter";
import { EmptySlot } from "@/components/shared/interface";
import { SubOccupantActions } from "@/components/occupant/sub-occupants/actions";
import { ActionSubOccupantsColumns } from "@/columns/for_occupants/sub-occupants";

import { AddIcon, DownloadIcon } from "@/icons";
import {
  SubOccupantsForm,
  SubOccupantsFormProps,
} from "@/components/occupant/sub-occupants/form";
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
  const initialSubOccupantsList = useFakeSubOccupantsList();
  const pagination = useFlowPagination();
  const { page, pageSize, search, numberOfPages } = useFlowState();

  const { data: subOccupants, isPlaceholderData } = useQuery({
    queryKey: builder.sub_occupants.get.get(),
    queryFn: () =>
      builder.use().sub_occupants.get({
        page,
        pageSize,
        search,
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

  console.log(subOccupants?.data);

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
                onRowClick={() => handleSubOccupantForm({ modalType: "view" })}
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
          <FlowFooter
            className={clsx("flex justify-between", {
              hidden: noDataAvailable || numberOfPages <= 1,
            })}
          >
            <FlowPagination />
            <FlowEntriesPerPage />
          </FlowFooter>
        </FlowContentContainer>

        <FlowFloatingButtons
          hidden={noDataAvailable || isPlaceholderData}
          withSecondaryButtons
          hasFilterButton
          filterData={filterOptions}
          secondaryButtons={[
            {
              icon: "download",
              btnProps: {
                onClick: () => console.log("Downloaded"),
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
