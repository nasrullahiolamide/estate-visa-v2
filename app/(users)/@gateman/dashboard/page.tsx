"use client";

import dayjs from "dayjs";

import { AxiosError } from "axios";
import { Fragment, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Box, Button, Flex, Stack } from "@mantine/core";
import { modals } from "@mantine/modals";

import { builder } from "@/builders";
import { MODALS } from "@/packages/libraries";
import { handleError, handleSuccess } from "@/packages/notification";
import { useFakeGateRequestList } from "@/builders/types/gate-requests";

import { gateRequestsColumns } from "@/columns/for_gateman/gate-requests";
import { DownloadIcon } from "@/icons";

import { AppShellHeader } from "@/components/shared/interface/app-shell";
import { FilterDropdown } from "@/components/shared/interface/dropdowns/filter";
import { EmptySlot } from "@/components/shared/interface";
import {
  FlowContainer,
  FlowContentContainer,
  FlowEntriesPerPage,
  FlowFooter,
  FlowCurrentPage,
  FlowPaper,
  FlowTable,
  FlowFloatingButtons,
  useFlowPagination,
  useFlowState,
  FlowSearch,
} from "@/components/layout";
import { SearchTable } from "@/components/shared/search-table";
import { debounce } from "lodash";
import { SpotlightActionData } from "@mantine/spotlight";

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

  const [actions, setActions] = useState<SpotlightActionData[]>([]);
  const {
    page,
    pageSize,
    query: search,
    status,
    sortBy,
    sortOrder,
  } = useFlowState();

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
    queryKey: builder.gates.requests.get.get({
      page,
      pageSize,
      search,
      status,
      sortBy,
      sortOrder,
    }),
    queryFn: () =>
      builder.use().gates.requests.get({
        page,
        pageSize,
        search,
        status,
        sortBy,
        sortOrder,
      }),
    placeholderData: initialGateRequestList,
    select({ page, pageSize, total, data }) {
      return {
        page,
        pageSize,
        total,
        data: data
          .filter((request) => dayjs(request.visitDate).isSame(dayjs(), "day"))
          .map(({ id, status, ...list }, _, arr) => {
            return {
              ...list,
              id,
              status,
              action: (
                <Button
                  fz='sm'
                  size='md'
                  onClick={() => changeStatus({ id, status: "approved" })}
                  loading={isPending && arr.some((req) => req.id === id)}
                  disabled={
                    isPending || status === "approved" || status === "cancelled"
                  }
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

  const noDataAvailable = !gateRequests?.data.length;

  return (
    <Fragment>
      <AppShellHeader
        title='Gate Request'
        withSearch
        searchProps={{
          actions: [],
          placeholder: "Search by code...",
        }}
        options={
          <HeaderOptions
            isLoading={isPlaceholderData}
            hidden={noDataAvailable}
          />
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
                title={
                  search
                    ? "Gate Request not found"
                    : "You have no gate requests for today yet. You'll surely get one soon!"
                }
                src='question'
              />
            )}
          </FlowPaper>

          <FlowFooter visible={isPlaceholderData}>
            <FlowCurrentPage />
            <FlowEntriesPerPage />
          </FlowFooter>
        </FlowContentContainer>

        <FlowFloatingButtons
          hidden={noDataAvailable}
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

function HeaderOptions({
  hidden,
  isLoading,
}: {
  hidden?: boolean;
  isLoading?: boolean;
}) {
  const { query } = useFlowState();
  return (
    <Flex gap={14} wrap='wrap' align='center' hidden={!query && isLoading}>
      <FlowSearch isLoading={isLoading} placeholder='Search by code...' />
      <Flex hidden={hidden || isLoading} gap={14}>
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
    </Flex>
  );
}
