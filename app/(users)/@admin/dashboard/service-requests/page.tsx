"use client";

import { Fragment, ReactNode, useEffect } from "react";
import { Flex, Menu } from "@mantine/core";

import { AppShellHeader } from "@/components/admin/shared/app-shell";
import { FilterDropdown } from "@/components/admin/shared/dropdowns/filter";
import { EmptySlot } from "@/components/shared/interface";
import {
  ServiceRequestsData,
  useFakeServiceRequestsList,
} from "@/builders/types/service-requests";
import { DoubleMarkIcon } from "@/icons";
import { serviceRequestsColumns } from "@/columns/for_occupants/service-requests";
import {
  FlowContainer,
  FlowContentContainer,
  FlowEntriesPerPage,
  FlowFooter,
  FlowPagination,
  FlowPaper,
  FlowTable,
  FlowFloatingButtons,
  FlowTableActions,
  useFlowPagination,
  useFlowState,
  FlowMenu,
} from "@/components/layout";
import { modals } from "@mantine/modals";
import { ViewServiceRequest } from "@/components/admin/service-requests/view";
import { MODALS } from "@/packages/libraries";
import clsx from "clsx";
import { builder } from "@/builders";
import { OccupantActions } from "@/components/admin/occupants/actions";
import { useQuery } from "@tanstack/react-query";
import { ServiceRequestActions } from "@/components/admin/service-requests/actions";

const filterOptions = [
  { label: "Date", value: "date" },
  {
    label: "Service Type",
    value: "service-type",
    children: [
      {
        label: "Cleaning",
        value: "cleaning",
      },
      {
        label: "Electrical",
        value: "electrical",
      },
      {
        label: "Plumbing",
        value: "plumbing",
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
        label: "In Progress",
        value: "in-progress",
      },
      {
        label: "Completed",
        value: "completed",
      },
    ],
  },
];

function handleView(details: ServiceRequestsData) {
  const view: Record<PropertyKey, ReactNode> = {
    "in progress": (
      <ViewServiceRequest
        {...details}
        buttonProps={{
          children: "Close",
          onClick: () => modals.close(MODALS.FORM_DETAILS),
        }}
      />
    ),

    pending: (
      <ViewServiceRequest
        {...details}
        buttonProps={{
          children: "Set as In Progress",
          onClick: () => console.log("Set as In Progress"),
        }}
      />
    ),

    completed: (
      <ViewServiceRequest
        {...details}
        buttonProps={{
          children: "Close",
          onClick: () => modals.close(MODALS.FORM_DETAILS),
        }}
      />
    ),
  };

  modals.open({
    title: "Service Request",
    children: view[details.status.toLowerCase()],
    modalId: MODALS.FORM_DETAILS,
  });
}

export default function ServiceRequest() {
  const initialServiceRequests = useFakeServiceRequestsList();
  const pagination = useFlowPagination();
  const { page, pageSize, search, numberOfPages } = useFlowState();

  const { data: serviceRequests, isPlaceholderData } = useQuery({
    queryKey: builder.service_requests.get.get(),
    queryFn: () =>
      builder.use().service_requests.get({
        page,
        pageSize,
        search,
      }),
    placeholderData: initialServiceRequests,
    select({ total, page, data, pageSize }) {
      return {
        total,
        page,
        pageSize,
        data: data.map((list) => {
          return {
            ...list,
            action: <ServiceRequestActions id={list.id} status={list.status} />,
          };
        }),
      };
    },
  });

  useEffect(() => {
    if (isPlaceholderData) return;

    pagination.setPage(serviceRequests?.page);
    pagination.setTotal(serviceRequests?.total);
    pagination.setEntriesCount(serviceRequests?.data?.length);
    pagination.setPageSize(serviceRequests?.pageSize);
  }, [isPlaceholderData]);

  const noDataAvailable = serviceRequests?.data.length === 0;

  return (
    <Fragment>
      <AppShellHeader
        title='Service Request'
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
            {serviceRequests?.data.length ? (
              <FlowTable
                data={serviceRequests.data}
                columns={serviceRequestsColumns}
                skeleton={isPlaceholderData}
                onRowClick={handleView}
              />
            ) : (
              <EmptySlot
                title='You have no service requests yet. Check back later for updates!'
                src='question'
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
          hasFilterButton
          filterData={filterOptions}
        />
      </FlowContainer>
    </Fragment>
  );
}

function HeaderOptions({ hidden }: { hidden: boolean }) {
  return (
    <Flex gap={14} hidden={hidden} wrap='wrap'>
      {/* <SearchTable /> */}
      <FilterDropdown data={filterOptions} />
    </Flex>
  );
}
