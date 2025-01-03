"use client";

import { builder } from "@/builders";
import {
  ServiceRequestsData,
  useFakeServiceRequestsList,
} from "@/builders/types/service-requests";
import { serviceRequestsColumns } from "@/columns/for_admins/service-requests";
import { ServiceRequestActions } from "@/components/admin/service-requests/actions";
import { ViewServiceRequest } from "@/components/admin/service-requests/view";
import {
  FlowContainer,
  FlowContentContainer,
  FlowEntriesPerPage,
  FlowFloatingButtons,
  FlowFooter,
  FlowPagination,
  FlowPaper,
  FlowSearch,
  FlowTable,
  useFlowPagination,
  useFlowState,
} from "@/components/layout";
import { EmptySlot } from "@/components/shared/interface";
import { AppShellHeader } from "@/components/shared/interface/app-shell";
import { FilterDropdown } from "@/components/shared/interface/dropdowns/filter";
import { MODALS } from "@/packages/libraries";
import { Flex } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useQuery } from "@tanstack/react-query";
import { Fragment, useEffect, useMemo } from "react";

const filterOptions = [
  // { label: "Date", value: "date" },
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
  modals.open({
    title: "Service Request",
    children: <ViewServiceRequest {...details} />,
    modalId: MODALS.FORM_DETAILS,
  });
}

export default function ServiceRequest() {
  const initialServiceRequests = useMemo(
    () => useFakeServiceRequestsList(),
    []
  );
  const pagination = useFlowPagination();
  const {
    page,
    pageSize,
    query: search,
    sortBy,
    sortOrder,
    status,
  } = useFlowState();

  const { data: serviceRequests, isPlaceholderData } = useQuery({
    queryKey: builder.service_requests.get.$get({
      page,
      pageSize,
      search,
      sortBy,
      sortOrder,
      status,
    }),
    queryFn: () =>
      builder.$use.service_requests.get({
        page,
        pageSize,
        search,
        sortBy,
        sortOrder,
        status,
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
        withSearch
        searchProps={{
          title: "Service Request",
        }}
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
                onRowClick={(data) => handleView(data)}
              />
            ) : (
              <EmptySlot
                title='You have no service requests yet. Check back later for updates!'
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
          buttons={[{ icon: "filter", filterData: filterOptions }]}
        />
      </FlowContainer>
    </Fragment>
  );
}

function HeaderOptions({ hidden }: { hidden: boolean }) {
  return (
    <Flex gap={14} hidden={hidden} wrap='wrap'>
      <FlowSearch title='Service Request' />
      <FilterDropdown data={filterOptions} />
    </Flex>
  );
}
