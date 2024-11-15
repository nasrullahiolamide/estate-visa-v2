"use client";

import { FlowContainer } from "@/components/layout";
import { FormButtons, TimePickerInput } from "@/components/shared/interface";
import { cast, formatDate } from "@/packages/libraries";
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
import { ReactNode, useEffect } from "react";
import { object } from "yup";
import { requiredString } from "@/builders/types/shared";
import { builder } from "@/builders";
import { handleSuccess, handleError } from "@/packages/notification";
import { modals } from "@mantine/modals";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TIME_FORMAT } from "@/packages/constants/time";

enum Location {
  Physical = "Physical",
  Virtual = "Virtual",
  Hybrid = "Hybrid",
}

const schema = object({
  title: requiredString,
  date: requiredString,
  time: requiredString,
  location: requiredString,
  venue: requiredString,
});

interface SheduleMeetingProps {
  open: boolean;
  close: () => void;
  id: string;
}

const MeetingPlaceholder: Record<PropertyKey, string> = {
  Zoom: "https://zoom.us/j/123456789",
  "Google Meet": "https://meet.google.com/abc-def-ghi",
  WhatsApp: "https://wa.me/123456789",
};

export function SheduleMeeting({ open, close, id }: SheduleMeetingProps) {
  const queryClient = useQueryClient();

  const { mutate: scheduleMeeting, isPending } = useMutation({
    mutationFn: builder.use().meetings.schedule,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: builder.meetings.get.table.get(),
      });
      handleSuccess({
        message: "Meeting Scheduled Successfully",
      });
      close();
    },
    onError: handleError(),
  });

  const form = useForm({
    initialValues: {
      title: "",
      estateId: id,
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
    if (open) form.reset();
  }, [open]);

  function handleSubmit(values: typeof form.values) {
    scheduleMeeting(values);
  }

  const nextView: Record<PropertyKey, ReactNode> = {
    [Location.Physical]: (
      <TextInput
        label='Venue'
        placeholder='E.g. Conference Room, Office'
        withAsterisk
        {...form.getInputProps("venue")}
      />
    ),
    [Location.Virtual]: (
      <>
        <Select
          label='Platform'
          placeholder='Select meeting platform'
          data={["Zoom", "Google Meet", "WhatsApp"]}
          withAsterisk
          {...form.getInputProps("platform")}
        />
        <TextInput
          label='Meeting Link'
          placeholder={MeetingPlaceholder[form.getValues().platform]}
          withAsterisk
          {...form.getInputProps("meetingLink")}
        />
      </>
    ),
    [Location.Hybrid]: (
      <>
        <Select
          label='Virtual Platform'
          data={["Zoom", "Google Meet", "WhatsApp"]}
          placeholder='--select--'
          withAsterisk
          {...form.getInputProps("platform")}
        />
        <TextInput
          label='Meeting Link'
          withAsterisk
          placeholder={
            MeetingPlaceholder[form.getValues().platform] ||
            "Select a virtual platform"
          }
          disabled={!form.getValues().platform}
          {...form.getInputProps("meetingLink")}
        />
        <TextInput
          label='Physical Venue'
          placeholder='E.g. Conference Room, Office'
          withAsterisk
          {...form.getInputProps("venue")}
        />
      </>
    ),
  };

  return (
    <Drawer
      scrollAreaComponent={ScrollAreaAutosize}
      title='Shedule meeting'
      onClose={close}
      opened={open}
    >
      <Form form={form} onSubmit={handleSubmit}>
        <FlowContainer
          className='bg-primary-background-white sm:overflow-scroll'
          type='plain'
          bg='white'
          h={{
            base: "auto",
            sm: 720,
          }}
        >
          <Stack gap='lg'>
            <Title order={2} c='plum.5' fz={20} fw={500}>
              Meeting Details
            </Title>
            <TextInput
              label='Meeting Title'
              placeholder='E.g. Team Meeting'
              withAsterisk
              {...form.getInputProps("title")}
            />

            <Flex gap={15} className='flex-col sm:flex-row' pos='relative'>
              <DatePickerInput
                label='Date'
                minDate={new Date()}
                valueFormat='YYYY-MM-DD'
                withAsterisk
                flex={1}
                {...form.getInputProps("date")}
              />
              <TimePickerInput
                label='Time'
                withAsterisk
                {...form.getInputProps("time")}
              />
            </Flex>
          </Stack>
          <Divider my={30} />
          <Stack gap='lg'>
            <Title order={2} c='plum.5' fz={20} fw={500}>
              Location Details
            </Title>

            <Select
              label='Location'
              placeholder='Select meeting location'
              data={["Physical", "Virtual", "Hybrid"]}
              withAsterisk
              {...form.getInputProps("location")}
            />

            {nextView[form.getValues().location]}
          </Stack>

          <Divider my={30} />

          <Textarea
            label='Note'
            placeholder='Add a note for the meeting'
            {...form.getInputProps("notes")}
          />
        </FlowContainer>
        <FormButtons
          containerProps={{
            my: 30,
            pb: 0,
            px: 0,
          }}
          leftButton={{
            children: "Discard",
            type: "button",
            c: "red",
            className: "hover:bg-red-1 border-red-4 bg-opacity-9",
            leftSection: <TrashIcon width='18px' />,
            onClick: close,
            disabled: isPending,
          }}
          rightButton={{
            children: "Shedule",
            type: "submit",
            loading: isPending,
            disabled: isPending,
          }}
        />
      </Form>
    </Drawer>
  );
}
