"use client";

import { Fragment, ReactNode } from "react";
import { Flex, Menu } from "@mantine/core";

import { AppShellHeader } from "@/components/admin/shared/app-shell";
import { FilterDropdown } from "@/components/admin/shared/dropdowns/filter";
import { EmptySlot } from "@/components/shared/interface";
import {
  ServiceRequestsData,
  useFakeServiceRequestsList,
} from "@/builders/types/service-requests";
import { DoubleMarkIcon } from "@/svgs";
import { serviceRequestsColumns } from "@/columns/service-requests";
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
} from "@/components/layout";
import { modals } from "@mantine/modals";
import { ViewServiceRequest } from "@/components/admin/service-requests/view";
import { MODALS } from "@/packages/libraries";

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
          onClick: () => modals.close(MODALS.VIEW_EDIT),
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
          onClick: () => modals.close(MODALS.VIEW_EDIT),
        }}
      />
    ),
  };

  modals.open({
    title: "Service Request",
    children: view[details.status.toLowerCase()],
    modalId: MODALS.VIEW_EDIT,
  });
}

export default function ServiceRequest() {
  const serviceRequests = useFakeServiceRequestsList();

  const dataToDisplay = serviceRequests?.data.map((list) => {
    const render: Record<PropertyKey, ReactNode> = {
      "in progress": (
        <FlowTableActions
          actions={["others"]}
          showDesktopView={false}
          otherProps={{
            children: (
              <Menu.Item c='green' leftSection={<DoubleMarkIcon width={14} />}>
                Set as Completed
              </Menu.Item>
            ),
          }}
        />
      ),

      pending: (
        <FlowTableActions
          actions={["others"]}
          showDesktopView={false}
          otherProps={{
            children: (
              <Menu.Item
                color='blue.7'
                leftSection={<DoubleMarkIcon width={14} />}
              >
                Set as In Progress
              </Menu.Item>
            ),
          }}
        />
      ),
    };

    return {
      ...list,
      action: render[list.status.toLowerCase()],
    };
  });

  return (
    <Fragment>
      <AppShellHeader title='Service Request' options={<HeaderOptions />} />

      <FlowContainer type='plain' className='lg:~p-1/8'>
        <FlowContentContainer
          classNames={{
            root: "rounded-none lg:rounded-2xl bg-white",
          }}
        >
          <FlowPaper>
            {serviceRequests?.data.length ? (
              <FlowTable
                data={dataToDisplay}
                columns={serviceRequestsColumns}
                skeleton={false}
                onRowClick={handleView}
              />
            ) : (
              <EmptySlot
                title='You have no service requests yet. Check back later for updates!'
                src='question'
              />
            )}
          </FlowPaper>

          <FlowFooter hidden={false}>
            <FlowPagination />
            <FlowEntriesPerPage />
          </FlowFooter>
        </FlowContentContainer>

        <FlowFloatingButtons hasFilterButton filterData={filterOptions} />
      </FlowContainer>
    </Fragment>
  );
}

function HeaderOptions() {
  return (
    <Flex gap={14} wrap='wrap'>
      <FilterDropdown data={filterOptions} />
    </Flex>
  );
}
