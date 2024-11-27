"use client";

import clsx from "clsx";
import { toString } from "lodash";
import { getCookie } from "cookies-next";
import { useQuery } from "@tanstack/react-query";
import { Fragment, useEffect } from "react";
import { modals } from "@mantine/modals";
import { Button, Flex } from "@mantine/core";
import { builder } from "@/builders";
import { useFakeMeetingsList } from "@/builders/types/meetings";
import { MeetingColumns } from "@/columns/for_admins/meetings";
import { APP, MODALS } from "@/packages/libraries";
import { useMeetingDrawer } from "@/packages/hooks/use-meeting-props";
import { MeetingActions } from "@/components/admin/meetings/actions";
import { AppShellHeader } from "@/components/shared/interface/app-shell";
import { FilterDropdown } from "@/components/shared/interface/dropdowns/filter";
import { EmptySlot } from "@/components/shared/interface";
import { AddIcon, ClockIcon } from "@/icons";
import {
  SheduleMeeting,
  MeetingMinutesForm,
  MeetingMinutesFormProps,
} from "@/components/admin/meetings/modals";
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

const handleMinuteForm = ({ ...props }: MeetingMinutesFormProps) => {
  const { formType = "add", meetingId, data } = props;
  modals.open({
    modalId: MODALS.FORM_DETAILS,
    title: formType === "add" ? "Add Meeting Minutes" : "Edit Meeting Minutes",
    children: (
      <MeetingMinutesForm
        formType={formType}
        meetingId={meetingId}
        data={data}
      />
    ),
  });
};

export default function Meetings() {
  const estateId = toString(getCookie(APP.ESTATE_ID));
  const initialMeetingList = useFakeMeetingsList();
  const pagination = useFlowPagination();

  const { meetingProps, scheduleMeeting, editMeeting } =
    useMeetingDrawer(false);
  const { page, pageSize, search, numberOfPages } = useFlowState();

  const { data: meetings, isPlaceholderData } = useQuery({
    queryKey: builder.meetings.get.table.get(),
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
                hasMeeting={list.minutes ? true : false}
                handlers={{
                  onEditMeeting: () => editMeeting(list),
                  onAddMinutes: () =>
                    handleMinuteForm({ formType: "add", meetingId: list.id }),
                  onEditMinutes: () =>
                    handleMinuteForm({
                      formType: "edit",
                      meetingId: list.id,
                      data: list,
                    }),
                }}
              />
            ),
          };
        }),
      };
    },
  });

  const noDataAvailable = meetings?.data.length === 0;

  useEffect(() => {
    if (isPlaceholderData) return;

    pagination.setPage(meetings?.page);
    pagination.setTotal(meetings?.total);
    pagination.setEntriesCount(meetings?.data?.length);
    pagination.setPageSize(meetings?.pageSize);
  }, [isPlaceholderData]);

  return (
    <Fragment>
      <AppShellHeader
        title='Meeting Overview'
        options={
          <HeaderOptions
            scheduleMeeting={scheduleMeeting}
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
                  onClick: scheduleMeeting,
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
              icon: "clock",
              btnProps: {
                onClick: () => handleMinuteForm({ formType: "add" }),
              },
            },
            {
              icon: "filter",
              filterData: filterOptions,
            },
            {
              icon: "add",
              btnProps: {
                onClick: scheduleMeeting,
              },
            },
          ]}
        />
        <SheduleMeeting {...meetingProps} />
      </FlowContainer>
    </Fragment>
  );
}

interface HeaderOptionsProps {
  scheduleMeeting: () => void;
  hidden?: boolean;
}

function HeaderOptions({ scheduleMeeting, hidden }: HeaderOptionsProps) {
  return (
    <Flex gap={14} hidden={hidden} wrap='wrap'>
      <Button
        fz='sm'
        size='md'
        leftSection={<AddIcon />}
        onClick={scheduleMeeting}
      >
        Schedule Meeting
      </Button>
      <Button
        fz='sm'
        variant='outline'
        size='md'
        leftSection={<ClockIcon />}
        onClick={() => handleMinuteForm({ formType: "add" })}
      >
        Add Meeting Minutes
      </Button>
      <FilterDropdown data={filterOptions} />
    </Flex>
  );
}
