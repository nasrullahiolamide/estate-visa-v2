"use client";

import { toString } from "lodash";
import { getCookie } from "cookies-next";
import { FlowContainer } from "@/components/layout";
import { FormButtons, TimePickerInput } from "@/components/shared/interface";
import { TrashIcon } from "@/icons";
import {
  Divider,
  Drawer,
  Flex,
  ScrollAreaAutosize,
  Select,
  Stack,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { Form, useForm, yupResolver } from "@mantine/form";
import { useEffect } from "react";
import { object } from "yup";
import { builder } from "@/builders";
import { requiredString } from "@/builders/types/shared";
import { MeetingListData } from "@/builders/types/meetings";
import { handleSuccess, handleError } from "@/packages/notification";
import { APP, cast, formatDate, pass } from "@/packages/libraries";
import { DATE_FORMAT, TIME_FORMAT } from "@/packages/constants/time";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";

enum Location {
  Physical = "Physical",
  Virtual = "Virtual",
  Hybrid = "Hybrid",
}
export interface SheduleMeetingProps {
  closeDrawer: () => void;
  isDrawerOpened: boolean;
  isEditing: boolean;
  data?: MeetingListData | null;
}

const schema = object({
  title: requiredString,
  date: requiredString,
  time: requiredString,
});

const MeetingPlaceholder: Record<PropertyKey, string> = {
  Zoom: "https://zoom.us/j/123456789",
  "Google Meet": "https://meet.google.com/abc-def-ghi",
  WhatsApp: "https://wa.me/123456789",
};

export function SheduleMeeting({ ...props }: SheduleMeetingProps) {
  const queryClient = useQueryClient();
  const estateId = toString(getCookie(APP.ESTATE_ID));
  const { isDrawerOpened, closeDrawer, data, isEditing } = props;

  const { mutate: scheduleMeeting, isPending } = useMutation({
    mutationFn: builder.$use.meetings.schedule,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: builder.meetings.get.table.$get(),
      });
      handleSuccess({
        message: "Meeting Scheduled Successfully",
        autoClose: 1000,
      });
      form.reset();
      closeDrawer();
    },
    onError: handleError(),
  });

  const form = useForm({
    initialValues: {
      estateId,
      title: "",
      date: new Date(),
      time: formatDate(new Date().getTime(), TIME_FORMAT),
      location: Location.Physical,
      notes: "",
      venue: "",
      platform: "",
      meetingLink: "",
    },
    validate: yupResolver(schema),
    validateInputOnBlur: true,
    transformValues: (values) => {
      const { date, time, location } = values;
      return {
        ...values,
        location: cast.string(location.toLowerCase()),
        date: cast.string(date.toISOString()),
        time: cast.string(time),
      };
    },
  });

  useEffect(() => {
    if (data) {
      form.setValues({
        title: pass.string(data.title),
        date: dayjs(data.date, DATE_FORMAT).toDate(),
        time: pass.string(data.time),
        venue: pass.string(data.venue),
        platform: pass.string(data.platform),
        meetingLink: pass.string(data.meetingLink),
        notes: pass.string(data.notes),
        location: Location[data?.location as keyof typeof Location],
      });
    }
  }, [data]);

  function handleSubmit(values: Omit<typeof form.values, "minutes" | "file">) {
    scheduleMeeting(values);
  }

  const renderLocationDetails = () => {
    const location = form.getValues().location;

    if (location === Location.Physical) {
      return (
        <TextInput
          label="Venue"
          withAsterisk
          {...form.getInputProps("venue")}
        />
      );
    }

    if (location === Location.Virtual || location === Location.Hybrid) {
      return (
        <>
          <Select
            label="Platform"
            placeholder="Select meeting platform"
            data={["Zoom", "Google Meet", "WhatsApp"]}
            withAsterisk
            {...form.getInputProps("platform")}
          />
          <TextInput
            label="Meeting Link"
            placeholder={
              MeetingPlaceholder[form.getValues().platform] ??
              "Select meeting platform"
            }
            withAsterisk
            disabled={!form.getValues().platform}
            {...form.getInputProps("meetingLink")}
          />
          {location === Location.Hybrid && (
            <TextInput
              label="Physical Venue"
              placeholder="E.g. Conference Room, Office"
              withAsterisk
              {...form.getInputProps("venue")}
            />
          )}
        </>
      );
    }

    return null;
  };

  return (
    <Drawer
      scrollAreaComponent={ScrollAreaAutosize}
      title={"Schedule meeting"}
      onClose={() => {
        form.reset();
        closeDrawer();
      }}
      opened={isDrawerOpened}
    >
      <Form form={form} onSubmit={handleSubmit}>
        <FlowContainer
          className="bg-primary-background-white sm:overflow-scroll sm:scrollbar-none"
          type="plain"
          bg="white"
          h={{
            base: "auto",
            sm: 760,
          }}
        >
          <Stack gap="lg">
            <Title order={2} c="plum.5" fz={20} fw={500}>
              Meeting Details
            </Title>
            <TextInput
              label="Meeting Title"
              withAsterisk
              {...form.getInputProps("title")}
            />

            <Flex gap={15} className="flex-col sm:flex-row" pos="relative">
              <DatePickerInput
                label="Date"
                minDate={new Date()}
                valueFormat="YYYY-MM-DD"
                withAsterisk
                flex={1}
                {...form.getInputProps("date")}
              />
              <TimePickerInput
                label="Time"
                withAsterisk
                {...form.getInputProps("time")}
              />
            </Flex>
          </Stack>
          <Divider my={30} />
          <Stack gap="lg">
            <Title order={2} c="plum.5" fz={20} fw={500}>
              Location Details
            </Title>

            <Select
              label="Location"
              placeholder="Select meeting location"
              data={["Physical", "Virtual", "Hybrid"]}
              withAsterisk
              {...form.getInputProps("location")}
            />
            {renderLocationDetails()}
          </Stack>

          <Divider my={30} />

          <Textarea
            label="Note"
            placeholder="Add any additional information here..."
            {...form.getInputProps("notes")}
          />
        </FlowContainer>
        <FormButtons
          containerProps={{
            px: 0,
          }}
          leftButton={{
            children: "Discard",
            type: "button",
            c: "red",
            className:
              "hover:bg-red-1 border-red-4 bg-opacity-9 disabled:cursor-not-allowed disabled:opacity-9",
            leftSection: <TrashIcon width="18px" />,
            onClick: () => {
              form.reset();
              closeDrawer();
            },
            disabled: isPending,
          }}
          rightButton={{
            children: isEditing ? "Save Changes" : "Schedule Meeting",
            type: "submit",
            loading: isPending,
            disabled: isPending,
          }}
        />
      </Form>
    </Drawer>
  );
}
