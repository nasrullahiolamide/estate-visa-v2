"use client";

import clsx from "clsx";

import { Fragment, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button, Flex } from "@mantine/core";
import { modals } from "@mantine/modals";

import { builder } from "@/builders";
import { useFakeGateRequestList } from "@/builders/types/gate-requests";
import { APP, MODALS } from "@/packages/libraries";
import { gateRequestsColumns } from "@/columns/for_occupants/gate-requests";
import { AppShellHeader } from "@/components/shared/interface/app-shell";
import { FilterDropdown } from "@/components/shared/interface/dropdowns/filter";
import { EmptySlot } from "@/components/shared/interface";
import { GateRequestActions } from "@/components/occupant/gate-request/actions";
import { AddIcon, DownloadIcon } from "@/icons";
import { Add } from "iconsax-react";
import {
  GateRequestForm,
  GateRequestFormProps,
} from "@/components/occupant/gate-request/form";
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
  {
    label: "Guest Type",
    value: "guest-type",
    children: [
      {
        label: "Family",
        value: "family",
      },
      {
        label: "Friend",
        value: "friend",
      },
      {
        label: "Worker",
        value: "worker",
      },
    ],
  },
  {
    label: "Status",
    value: "status",
    children: [
      {
        label: "Pending",
        value: "pending",
      },
      {
        label: "Approved",
        value: "approved",
      },
      {
        label: "Cancelled",
        value: "cancelled",
      },
    ],
  },
];

const handleGateRequestForm = ({ data, modalType }: GateRequestFormProps) => {
  modals.open({
    title: modalType === "add" ? "Generate Request" : "Request Details",
    modalId: MODALS.FORM_DETAILS,
    children: <GateRequestForm data={data} modalType={modalType} />,
  });
};

export default function Gates() {
  const initialGateRequestList = useFakeGateRequestList();
  const pagination = useFlowPagination();

  const { page, pageSize, search, numberOfPages } = useFlowState();

  const { data: gateRequests, isPlaceholderData } = useQuery({
    queryKey: builder.gates.requests.get.get(),
    queryFn: () => builder.use().gates.requests.get({ page, pageSize, search }),
    placeholderData: initialGateRequestList,
    select({ page, pageSize, total, data }) {
      return {
        page,
        pageSize,
        total,
        data: data.map((list) => {
          return {
            ...list,
            action: (
              <GateRequestActions
                id={list.id}
                accessCode={list.accessCode}
                handlers={{
                  onAdd: () => handleGateRequestForm({ modalType: "add" }),
                  onEdit: () =>
                    handleGateRequestForm({ modalType: "edit", data: list }),
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

    pagination.setPage(gateRequests?.page);
    pagination.setTotal(gateRequests?.total);
    pagination.setEntriesCount(gateRequests?.data?.length);
    pagination.setPageSize(gateRequests?.pageSize);
  }, [isPlaceholderData]);

  const noDataAvailable = gateRequests?.data.length === 0;

  console.log({ gateRequests });

  return (
    <Fragment>
      <AppShellHeader
        title='Gate Request'
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
            {gateRequests?.data.length ? (
              <FlowTable
                data={gateRequests.data}
                columns={gateRequestsColumns}
                skeleton={isPlaceholderData}
              />
            ) : (
              <EmptySlot
                title='You have no gate requests yet. Create one to get started!'
                src='question'
                withButton
                text='Send New Request'
                btnProps={{
                  leftSection: <AddIcon />,
                  onClick: () => handleGateRequestForm({ modalType: "add" }),
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
              onClick: () => handleGateRequestForm({ modalType: "add" }),
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
        onClick={() => handleGateRequestForm({ modalType: "add" })}
      >
        Send New Request
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
