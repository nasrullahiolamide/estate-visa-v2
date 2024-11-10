"use client";

import clsx from "clsx";

import { Fragment, useEffect } from "react";
import { Add } from "iconsax-react";
import { Button, Flex } from "@mantine/core";
import { modals } from "@mantine/modals";
import { APP, MODALS } from "@/packages/libraries";
import { AppShellHeader } from "@/components/admin/shared/app-shell";
import { FilterDropdown } from "@/components/admin/shared/dropdowns/filter";
import { EmptySlot } from "@/components/shared/interface";
import { DownloadIcon } from "@/icons";
import { useFakeGatesList } from "@/builders/types/gates";
import { gatesColumns } from "@/columns/for_admins/gates";
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
import { useQuery } from "@tanstack/react-query";
import { builder } from "@/builders";
import { getCookie } from "cookies-next";
import { GateActions } from "@/components/admin/gates/actions";
import { GateForm, GatesFormProps } from "@/components/admin/gates/form";

const filterOptions = [
  { label: "Recently Added", value: "recent" },
  { label: "Name(A-Z)", value: "a-z" },
  { label: "Name(Z-A)", value: "z-a" },
];

const handleGateForm = ({ data, modalType }: GatesFormProps) => {
  modals.open({
    title: modalType === "add" ? "Add New Gate" : "Gate Details",
    modalId: MODALS.FORM_DETAILS,
    children: <GateForm data={data} modalType={modalType} />,
  });
};

export default function Gates() {
  const initialGatesList = useFakeGatesList();
  const pagination = useFlowPagination();
  const estateId = getCookie(APP.ESTATE_ID) ?? "";

  const { page, pageSize, search, numberOfPages } = useFlowState();

  const { data: gates, isPlaceholderData } = useQuery({
    queryKey: builder.gates.get.get(),
    queryFn: () =>
      builder.use().gates.get({
        id: estateId,
        params: { page, pageSize, search },
      }),
    placeholderData: initialGatesList,
    select({ page, pageSize, total, data }) {
      return {
        page,
        pageSize,
        total,
        data: data.map((list) => {
          return {
            ...list,
            action: (
              <GateActions
                id={list.id}
                handlers={{
                  onAdd: () => handleGateForm({ modalType: "add" }),
                  onView: () =>
                    handleGateForm({ data: list, modalType: "view" }),
                  onEdit: () =>
                    handleGateForm({ data: list, modalType: "edit" }),
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

    pagination.setPage(gates?.page);
    pagination.setTotal(gates?.total);
    pagination.setEntriesCount(gates?.data?.length);
    pagination.setPageSize(gates?.pageSize);
  }, [isPlaceholderData]);

  const noDataAvailable = gates?.data.length === 0;

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
            {gates?.data.length ? (
              <FlowTable
                data={gates.data}
                columns={gatesColumns}
                skeleton={isPlaceholderData}
              />
            ) : (
              <EmptySlot
                title='No gates have been added yet. Add a gate to begin managing access!'
                src='gate'
                withButton
                text='Add New Gate'
                btnProps={{
                  leftSection: <Add />,
                  onClick: () => handleGateForm({ modalType: "add" }),
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
              onClick: () => handleGateForm({ modalType: "add" }),
            },
          }}
          secondaryButtons={[
            {
              icon: "download",
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
        onClick={() => handleGateForm({ modalType: "add" })}
      >
        Add New Gate
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
