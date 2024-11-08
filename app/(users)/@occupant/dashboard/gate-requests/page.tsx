"use client";

import { Fragment, useEffect } from "react";
import { Add } from "iconsax-react";
import { Button, Flex } from "@mantine/core";
import { modals } from "@mantine/modals";
import { APP, MODALS } from "@/packages/libraries";
import { AppShellHeader } from "@/components/admin/shared/app-shell";
import { FilterDropdown } from "@/components/admin/shared/dropdowns/filter";
import { EmptySlot } from "@/components/shared/interface";
import { AddIcon, DownloadIcon } from "@/icons";
import { gatesColumns } from "@/columns/gates";
import clsx from "clsx";
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
import { GateForm, GatesFormProps } from "@/components/admin/gates/form";
import { useFakeGateRequestList } from "@/builders/types/gate-requests";
import { GateRequestActions } from "@/components/occupant/gate-request/actions";
import { getCookie } from "cookies-next";
import { gateRequestsColumns } from "@/columns/gate-requests";

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
                handlers={{
                  onAdd: () => handleGateForm({ modalType: "add" }),
                  onView: () => {},
                  onEdit: () => {},
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
