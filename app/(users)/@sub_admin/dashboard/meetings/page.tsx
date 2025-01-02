"use client";

import { builder } from "@/builders";
import { useFakeMeetingsList } from "@/builders/types/meetings";
import { MeetingColumns } from "@/columns/for_admins/meetings";
import { MeetingActions } from "@/components/admin/meetings/actions";
import {
  MeetingMinutesForm,
  MeetingMinutesFormProps,
  SheduleMeeting,
} from "@/components/admin/meetings/modals";
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
import { EmptySlot } from "@/components/shared/interface";
import { AppShellHeader } from "@/components/shared/interface/app-shell";
import { FilterDropdown } from "@/components/shared/interface/dropdowns/filter";
import { AddIcon, ClockIcon } from "@/icons";
import { useMeetingDrawer } from "@/packages/hooks/use-meeting-props";
import { APP, MODALS } from "@/packages/libraries";
import { Button, Flex } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { toString } from "lodash";
import { Fragment, useEffect, useMemo } from "react";

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
  const initialMeetingList = useMemo(() => useFakeMeetingsList(), []);
  const pagination = useFlowPagination();

  const { meetingProps, scheduleMeeting, editMeeting } =
    useMeetingDrawer(false);
  const { page, pageSize, query: search, status, sortOrder } = useFlowState();

  const { data: meetings, isPlaceholderData } = useQuery({
    queryKey: builder.meetings.get.table.$get({
      page,
      pageSize,
      status,
      sortOrder,
      search,
    }),
    queryFn: () =>
      builder.$use.meetings.get.table({
        estateId,
        page,
        pageSize,
        search,
        status,
        sortOrder,
      }),
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
                text='Schedule Meeting'
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
              label: "Add minutes",
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
              label: "Schedule meeting",
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
