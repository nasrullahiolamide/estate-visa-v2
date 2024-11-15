"use client";

import { getCookie } from "cookies-next";

import { Fragment, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button, Flex } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";

import { builder } from "@/builders";
import { useFakeMeetingsList } from "@/builders/types/meetings";
import { MeetingColumns } from "@/columns/for_admins/meetings";
import { APP, MODALS } from "@/packages/libraries";
import { SheduleMeeting } from "@/components/admin/meetings/modals/shedule";
import {
  MeetingMinutesForm,
  MeetingMinutesFormProps,
} from "@/components/admin/meetings/modals/form";
import { MeetingActions } from "@/components/admin/meetings/actions";
import { AppShellHeader } from "@/components/admin/shared/app-shell";
import { FilterDropdown } from "@/components/admin/shared/dropdowns/filter";
import { EmptySlot } from "@/components/shared/interface";
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
import clsx from "clsx";

const filterOptions = [
  { label: "A-Z", value: "A-Z" },
  {
    label: "Status",
    value: "status",
    children: [
      { label: "Completed", value: "completed" },
      { label: "Scheduled", value: "sheduled" },
      { label: "Cancelled", value: "cancelled" },
    ],
  },
];

const handleMinuteForm = ({ formType, meetingId }: MeetingMinutesFormProps) => {
  modals.open({
    title: "Add Meeting Minutes",
    children: <MeetingMinutesForm formType={formType} meetingId={meetingId} />,
    modalId: MODALS.FORM_DETAILS,
  });
};

export default function Meetings() {
  const [isDrawerOpened, { open: openDrawer, close: closeDrawer }] =
    useDisclosure(false);

  const estateId = getCookie(APP.ESTATE_ID) ?? "";
  const initialMeetingList = useFakeMeetingsList();
  const pagination = useFlowPagination();
  const { page, pageSize, search, numberOfPages } = useFlowState();

  const { data: meetings, isPlaceholderData } = useQuery({
    queryKey: builder.meetings.get.get(),
    queryFn: () =>
      builder.use().meetings.get.table({ estateId, page, pageSize, search }),
    placeholderData: initialMeetingList,
    select({ total, page, data, pageSize }) {
      return {
        total,
        page,
        pageSize,
        data: data.map((list) => {
          return {
            ...list,
            action: (
              <MeetingActions
                status={list.status}
                id={list.id}
                handlers={{
                  onAddMinutes: () =>
                    handleMinuteForm({ formType: "add", meetingId: list.id }),
                  onViewMinutes: () =>
                    handleMinuteForm({ formType: "edit", meetingId: list.id }),
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

    pagination.setPage(meetings?.page);
    pagination.setTotal(meetings?.total);
    pagination.setEntriesCount(meetings?.data?.length);
    pagination.setPageSize(meetings?.pageSize);
  }, [isPlaceholderData]);

  const noDataAvailable = meetings?.data.length === 0;

  return (
    <Fragment>
      <AppShellHeader
        title='Meeting Overview'
        options={
          <HeaderOptions
            openDrawer={openDrawer}
            hidden={noDataAvailable || isPlaceholderData}
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
            {meetings?.data.length ? (
              <FlowTable
                data={meetings.data}
                columns={MeetingColumns}
                skeleton={isPlaceholderData}
              />
            ) : (
              <EmptySlot
                title='You have no meetings yet. Schedule one to get started!'
                src='meeting'
                withButton
                text='Shedule Meeting'
                btnProps={{
                  leftSection: <AddIcon />,
                  onClick: openDrawer,
                }}
              />
            )}
          </FlowPaper>
          <FlowFooter
            className={clsx("flex justify-between", {
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
          hasFilterButton
          filterData={filterOptions}
          primaryButton={{
            icon: "add",
            btnProps: {
              onClick: openDrawer,
            },
          }}
          secondaryButtons={[
            {
              icon: "add",
              btnProps: {
                onClick: () => handleMinuteForm({ formType: "add" }),
              },
            },
          ]}
        />
        <SheduleMeeting
          open={isDrawerOpened}
          close={closeDrawer}
          id={estateId}
        />
      </FlowContainer>
    </Fragment>
  );
}

interface HeaderOptionsProps {
  openDrawer: () => void;
  hidden?: boolean;
}

function HeaderOptions({ openDrawer, hidden }: HeaderOptionsProps) {
  return (
    <Flex gap={14} hidden={hidden} wrap='wrap'>
      <Button fz='sm' size='md' leftSection={<AddIcon />} onClick={openDrawer}>
        Schedule Meeting
      </Button>
      <Button
        fz='sm'
        variant='outline'
        size='md'
        leftSection={<AddIcon />}
        onClick={() => handleMinuteForm({ formType: "add" })}
      >
        Add Meeting Minutes
      </Button>
      <FilterDropdown data={filterOptions} />
    </Flex>
  );
}
