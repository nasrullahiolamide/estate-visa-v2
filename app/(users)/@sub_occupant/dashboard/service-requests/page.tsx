"use client";

import clsx from "clsx";
import { Fragment, useEffect } from "react";
import { Button, Flex } from "@mantine/core";

import { AppShellHeader } from "@/components/shared/interface/app-shell";
import { FilterDropdown } from "@/components/shared/interface/dropdowns/filter";
import { EmptySlot } from "@/components/shared/interface";
import { useFakeServiceRequestsList } from "@/builders/types/service-requests";
import { serviceRequestsColumns } from "@/columns/for_occupants/service-requests";
import { AddIcon } from "@/icons";
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
import { modals } from "@mantine/modals";
import { MODALS } from "@/packages/libraries";
import { builder } from "@/builders";
import { useQuery } from "@tanstack/react-query";
import { ServieRequestActions } from "@/components/occupant/service-requests/actions";
import {
  ServiceRequestForm,
  ServiceRequestFormProps,
} from "@/components/occupant/service-requests/form";

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
        value: "pending",
      },
      {
        label: "Completed",
        value: "completed",
      },
    ],
  },
];

const handleRequestForm = ({
  data,
  modalType = "add",
}: ServiceRequestFormProps) => {
  modals.open({
    title: modalType === "add" ? "Generate Request" : "Request Generated",
    modalId: MODALS.FORM_DETAILS,
    children: <ServiceRequestForm data={data} modalType={modalType} />,
  });
};

export default function ServiceRequest() {
  const initialServiceRequestList = useFakeServiceRequestsList();
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
    placeholderData: initialServiceRequestList,
    select({ total, page, data, pageSize }) {
      return {
        total,
        page,
        pageSize,
        data: data.map((list) => {
          return {
            ...list,
            action: (
              <ServieRequestActions
                id={list.id}
                status={list.status}
                onEdit={() =>
                  handleRequestForm({ modalType: "edit", data: list })
                }
              />
            ),
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
              />
            ) : (
              <EmptySlot
                title='You have no service requests yet. Check back later for updates!'
                src='question'
                withButton
                text='Send Request'
                btnProps={{
                  leftSection: <AddIcon />,
                  onClick: () =>
                    handleRequestForm({
                      modalType: "add",
                    }),
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
      <Button
        fz='sm'
        size='md'
        leftSection={<AddIcon />}
        onClick={() => handleRequestForm({ modalType: "add" })}
      >
        Send Request
      </Button>
      <FilterDropdown data={filterOptions} />
    </Flex>
  );
}
