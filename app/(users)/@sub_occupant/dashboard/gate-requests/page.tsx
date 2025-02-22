"use client";

import { builder } from "@/builders";
import { useFakeGateRequestList } from "@/builders/types/gate-requests";
import { gateRequestsColumns } from "@/columns/for_occupants/gate-requests";
import {
  FlowContainer,
  FlowContentContainer,
  FlowEntriesPerPage,
  FlowFloatingButtons,
  FlowFooter,
  FlowPagination,
  FlowPaper,
  FlowTable,
  useFlowPagination,
  useFlowState,
} from "@/components/layout";
import { GateRequestActions } from "@/components/occupant/gate-request/actions";
import {
  GateRequestForm,
  GateRequestFormProps,
} from "@/components/occupant/gate-request/form";
import { EmptySlot } from "@/components/shared/interface";
import { AppShellHeader } from "@/components/shared/interface/app-shell";
import { FilterDropdown } from "@/components/shared/interface/dropdowns/filter";
import { QuickTour } from "@/components/shared/interface/quick-tour";
import { AddIcon } from "@/icons";
import { MODALS, USER_TYPE } from "@/packages/libraries";
import { Button, Flex } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useQuery } from "@tanstack/react-query";
import { Add } from "iconsax-react";
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
  const initialGateRequestList = useMemo(() => useFakeGateRequestList(), []);
  const pagination = useFlowPagination();

  const { page, pageSize, query: search, sortBy, sortOrder } = useFlowState();

  const { data: gateRequests, isPlaceholderData } = useQuery({
    queryKey: builder.gates.requests.get.$get({
      page,
      pageSize,
      search,
      sortBy,
      sortOrder,
    }),
    queryFn: () =>
      builder.$use.gates.requests.get({
        page,
        pageSize,
        search,
        sortBy,
        sortOrder,
      }),
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
                status={list.status}
                data={list}
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
                onRowClick={(data) =>
                  handleGateRequestForm({ modalType: "view", data })
                }
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

          <FlowFooter visible={noDataAvailable || isPlaceholderData}>
            <FlowPagination />
            <FlowEntriesPerPage />
          </FlowFooter>
        </FlowContentContainer>

        <FlowFloatingButtons
          hidden={noDataAvailable || isPlaceholderData}
          buttons={[
            {
              icon: "add",
              id: "step-1",
              btnProps: {
                id: "step-1",
                onClick: () => handleGateRequestForm({ modalType: "add" }),
              },
            },
          ]}
        />
      </FlowContainer>
      {!noDataAvailable && !isPlaceholderData && (
        <QuickTour
          profile={USER_TYPE.OCCUPANT}
          feature='gate-requests'
          steps={[
            {
              element: "#step-1",
              popover: {
                title: "Schedule a Guest Visit",
                description:
                  "Click here to start scheduling a visit for your guest. You'll then generate an access code and share it with them for entry.",
              },
            },

            {
              element: "#flow-row",
              popover: {
                title: "View Details",
                description:
                  "Click on any row to view the details of the gate request.",
              },
            },
          ]}
        />
      )}
    </Fragment>
  );
}

function HeaderOptions({ hidden }: { hidden: boolean }) {
  return (
    <Flex gap={14} hidden={hidden} wrap='wrap'>
      <Button
        id='step-1'
        fz='sm'
        size='md'
        leftSection={<Add />}
        onClick={() => handleGateRequestForm({ modalType: "add" })}
      >
        Send New Request
      </Button>
      <FilterDropdown data={filterOptions} />
      {/* <Button
        variant="outline"
        fz="sm"
        size="md"
        leftSection={<DownloadIcon />}
      >
        Download Table
      </Button> */}
    </Flex>
  );
}
