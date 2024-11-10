"use client";

import clsx from "clsx";
import { Fragment, useEffect } from "react";
import { modals } from "@mantine/modals";
import { Button, Flex } from "@mantine/core";
import { MODALS } from "@/packages/libraries";
import { builder } from "@/builders";
import { useQuery } from "@tanstack/react-query";
import { AppShellHeader } from "@/components/admin/shared/app-shell";
import { FilterDropdown } from "@/components/admin/shared/dropdowns/filter";
import { EmptySlot } from "@/components/shared/interface";
import { subOccupantsColumns } from "@/columns/for_admins/sub-occupants";
import { DownloadIcon } from "@/icons";
import { useFakeSubOccupantsList } from "@/builders/types/sub-occupants";
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
import {
  SubOccupantsForm,
  SubOccupantsFormProps,
} from "@/components/occupant/sub-occupants/form";

const filterOptions = [
  { label: "Recently Added", value: "recent" },
  { label: "Name(A-Z)", value: "a-z" },
  { label: "Name(Z-A)", value: "z-a" },
];

const handleSubOccupantForm = ({ data }: SubOccupantsFormProps) => {
  modals.open({
    title: "Sub Occupant Details",
    modalId: MODALS.FORM_DETAILS,
    children: <SubOccupantsForm data={data} modalType='view' />,
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
        data,
      };
    },
  });
  console.log(subOccupants);
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
                columns={subOccupantsColumns}
                skeleton={isPlaceholderData}
                onRowClick={handleSubOccupantForm}
              />
            ) : (
              <EmptySlot
                title='There are no sub-occupants yet. Check back later for updates!'
                src='person-minus'
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
