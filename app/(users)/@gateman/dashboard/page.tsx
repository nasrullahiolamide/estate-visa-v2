"use client";

import clsx from "clsx";

import { Fragment, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Flex } from "@mantine/core";

import { builder } from "@/builders";
import { useFakeGateRequestList } from "@/builders/types/gate-requests";
import { gateRequestsColumns } from "@/columns/for_occupants/gate-requests";
import { AppShellHeader } from "@/components/shared/interface/app-shell";
import { FilterDropdown } from "@/components/shared/interface/dropdowns/filter";
import { EmptySlot } from "@/components/shared/interface";
import { DownloadIcon } from "@/icons";

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
import { MODALS } from "@/packages/libraries";
import { handleError, handleSuccess } from "@/packages/notification";
import { modals } from "@mantine/modals";
import { AxiosError } from "axios";
import dayjs from "dayjs";

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
    ],
  },
];

export default function Gates() {
  const queryClient = useQueryClient();
  const initialGateRequestList = useFakeGateRequestList();
  const pagination = useFlowPagination();
  const { page, pageSize, search, numberOfPages, status } = useFlowState();

  const { mutate: changeStatus, isPending } = useMutation({
    mutationFn: builder.use().gates.requests.change_status,
    onError: (error: AxiosError) => {
      handleError(error)();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: builder.gates.requests.get.get(),
      });
      handleSuccess({
        message: "Gate Request Approved Successfully",
        autoClose: 1200,
      });
      modals.close(MODALS.CONFIRMATION);
    },
  });

  const { data: gateRequests, isPlaceholderData } = useQuery({
    queryKey: builder.gates.requests.get.get(),
    queryFn: () =>
      builder.use().gates.requests.get({ page, pageSize, search, status }),
    placeholderData: initialGateRequestList,
    select({ page, pageSize, total, data }) {
      return {
        page,
        pageSize,
        total,
        data: data
          .filter((request) => !dayjs(request.visitDate).isAfter(dayjs()))
          .map(({ id, status, ...list }) => {
            return {
              ...list,
              id,
              status,
              action: (
                <Button
                  fz='sm'
                  size='md'
                  onClick={() => changeStatus({ id, status: "approved" })}
                  loading={isPending}
                  disabled={isPending || status !== "pending"}
                  className='disabled:bg-opacity-30'
                >
                  Approve
                </Button>
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
                title='You have no gate requests yet. You’ll surely get one soon!'
                src='question'
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
                onClick: () => {},
              },
            },
            {
              icon: "filter",
              filterData: filterOptions,
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
