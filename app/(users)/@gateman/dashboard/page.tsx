"use client";

import { builder } from "@/builders";
import {
  GateRequestData,
  useFakeGateRequestList,
} from "@/builders/types/gate-requests";
import { gateRequestsColumns } from "@/columns/for_gateman/gate-requests";
import { ViewGateRequest } from "@/components/gateman";
import {
  FlowContainer,
  FlowContentContainer,
  FlowEntriesPerPage,
  FlowFooter,
  FlowPaper,
  FlowSearch,
  FlowTable,
  useFlowPagination,
  useFlowState,
} from "@/components/layout";
import { EmptySlot } from "@/components/shared/interface";
import { AppShellHeader } from "@/components/shared/interface/app-shell";
import { QuickTour } from "@/components/shared/interface/quick-tour";
import { cast, MODALS, USER_TYPE } from "@/packages/libraries";
import { handleError, handleSuccess } from "@/packages/notification";
import { Button, Flex } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Fragment, useEffect, useMemo } from "react";

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
  const initialGateRequestList = useMemo(() => useFakeGateRequestList(), []);
  const pagination = useFlowPagination();

  const {
    page,
    pageSize,
    query: search,
    status,
    sortBy,
    sortOrder,
  } = useFlowState();

  function handleView(details: GateRequestData) {
    modals.open({
      title: "Gate Request",
      children: <ViewGateRequest {...details} />,
      modalId: MODALS.FORM_DETAILS,
    });
  }

  const { mutate: changeStatus, isPending } = useMutation({
    mutationFn: builder.$use.gates.requests.change_status,
    onError: handleError(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: builder.gates.requests.get.$get(),
      });
      handleSuccess("Gate Request Approved Successfully", { autoClose: 1200 });
      modals.close(MODALS.CONFIRMATION);
    },
  });

  const { data: gateRequests, isPlaceholderData } = useQuery({
    queryKey: builder.gates.requests.get.$get({
      page,
      pageSize,
      search,
      status,
      sortBy,
      sortOrder,
    }),
    queryFn: () =>
      builder.$use.gates.requests.get({
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
          .filter(
            (request) =>
              dayjs(request.visitDate).isAfter(dayjs().startOf("day")) &&
              dayjs(request.visitDate).isBefore(dayjs().endOf("day"))
          )
          .map(({ id, status, ...list }, _, arr) => {
            return {
              ...list,
              id,
              status,
              action: (
                <Button
                  fz='sm'
                  size='sm'
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
          })
          .sort((a, b) => {
            if (a.status === "approved" && b.status !== "approved") return 1;
            if (a.status !== "approved" && b.status === "approved") return -1;
            return 0;
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
          isloading: isPlaceholderData,
          placeholder: "Search by code, e.g. '1234'",
          title: "Gate Request",
          type: "number",
          id: "search",
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
                onRowClick={(details) => handleView(details)}
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

          <FlowFooter
            visible={noDataAvailable || isPlaceholderData}
            ta='center'
            justify='center'
          >
            <FlowEntriesPerPage options={["10", "50", "100", "200"]} />
          </FlowFooter>
        </FlowContentContainer>

        {/* <FlowFloatingButtons
          hidden={noDataAvailable || isPlaceholderData}
          buttons={[
            {
              icon: "help",
              label: "Show Quick Tour",
              btnProps: {
                onClick: () => setStartTour(!startTour),
              },
            },
          ]}
        /> */}
      </FlowContainer>
      <QuickTour
        profile={USER_TYPE.GATEMAN}
        feature='gate-request'
        steps={[
          {
            element: "#search",
            popover: {
              title: "Find gate requests easily",
              description:
                "Search for gate requests by their code to quickly locate them.",
            },
          },
          {
            element: "#flow-row",
            popover: {
              title: "View gate request details",
              description:
                "Click on a row to view all the details of the selected gate request and approve.",
            },
          },
        ]}
      />
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
      <FlowSearch
        id='search'
        isloading={cast.string(isLoading)}
        placeholder="Search by code, e.g. '1234'"
        type='number'
        title='Gate Request'
        hidden={!query && hidden}
      />
      {/* <Flex hidden={hidden || isLoading} gap={14}>
        <FilterDropdown data={filterOptions} />
        <Button
          variant='outline'
          fz='sm'
          size='md'
          leftSection={<DownloadIcon />}
        >
          Download Table
        </Button>
      </Flex> */}
    </Flex>
  );
}
