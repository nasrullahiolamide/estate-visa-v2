"use client";

import clsx from "clsx";
import { Add } from "iconsax-react";
import { Fragment, useEffect } from "react";
import { Button, Flex } from "@mantine/core";
import { modals } from "@mantine/modals";
import { MODALS } from "@/packages/libraries";
import { useQuery } from "@tanstack/react-query";
import { builder } from "@/builders";
import { useFakeOccupantsList } from "@/builders/types/occupants";
import { OccupantActions } from "@/components/admin/occupants/actions";
import { occupantsColumns } from "@/columns/for_admins/occupants";
import { AppShellHeader } from "@/components/admin/shared/app-shell";
import { FilterDropdown } from "@/components/admin/shared/dropdowns/filter";
import { EmptySlot } from "@/components/shared/interface";
import { DownloadIcon, UploadIcon } from "@/icons";
import {
  OccupantsForm,
  OccupantsFormProps,
} from "@/components/admin/occupants/modals/form";
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
  { label: "Name(A-Z)", value: "A-Z" },
  { label: "Name(Z-A)", value: "Z-A" },
];

const handleOccupantForm = ({ data, modalType }: OccupantsFormProps) => {
  modals.open({
    title: modalType === "add" ? "Add New Occupant" : "Occupant Details",
    modalId: MODALS.FORM_DETAILS,
    children: <OccupantsForm data={data} modalType={modalType} />,
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
                  onAdd: () => handleOccupantForm({ modalType: "add" }),
                  onView: () =>
                    handleOccupantForm({ data: list, modalType: "view" }),
                  onEdit: () =>
                    handleOccupantForm({ data: list, modalType: "edit" }),
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
                // onRowClick={handleOccupantForm}
              />
            ) : (
              <EmptySlot
                title='There are no occupants yet. Add one to get started!'
                src='person-minus'
                withButton
                text='Add New Occupant'
                btnProps={{
                  leftSection: <Add />,
                  onClick: () => handleOccupantForm({ modalType: "add" }),
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
              onClick: () => handleOccupantForm({ modalType: "add" }),
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
        onClick={() => handleOccupantForm({ modalType: "add" })}
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
