"use client";

import { FlowContainer } from "@/components/layout";
import { FormButtons } from "@/components/shared/interface";
import { cast, pass } from "@/packages/libraries";
import { TrashIcon } from "@/icons";
import {
  Divider,
  Drawer,
  Flex,
  Popover,
  PopoverDropdown,
  PopoverTarget,
  ScrollAreaAutosize,
  Select,
  Stack,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { DateInput, DatePickerInput, TimeInput } from "@mantine/dates";
import { Form, useForm, yupResolver } from "@mantine/form";
import { ReactNode, useEffect, useRef, useState } from "react";
import { object, string } from "yup";

enum Location {
  Physical = "Physical",
  Virtual = "Virtual",
  Hybrid = "Hybrid",
}

const requiredString = string().required(
  "This field is required. Please enter the necessary information."
);

const schema = object({
  title: requiredString,
  date: requiredString,
  time: requiredString,
});

interface SheduleMeetingProps {
  open: boolean;
  close: () => void;
}

const MeetingPlaceholder: Record<PropertyKey, string> = {
  Zoom: "https://zoom.us/j/123456789",
  "Google Meet": "https://meet.google.com/abc-def-ghi",
  WhatsApp: "https://wa.me/123456789",
};

export function SheduleMeeting({ open, close }: SheduleMeetingProps) {
  const timeRef = useRef<HTMLInputElement>(null);

  const [timeOpen, setTimeOpen] = useState(false);

  const form = useForm({
    initialValues: {
      title: "",
      date: new Date(),
      time: "12:00",
      location: "Physical",
      note: "",
      venue: "",
      platform: "",
      "meeting-link": "",
      "physical-venue": "",
    },

    validate: yupResolver(schema),
    validateInputOnBlur: true,
    transformValues: (values) => {
      const { title, date } = values;
      return {
        title: cast.string(title),
        date: cast.string(date),
        time: cast.string(values.time),
        location: cast.string(values.location.toLowerCase()),
        note: cast.string(values.note),
        venue: cast.string(values.venue),
        platform: cast.string(values.platform),
        "meeting-link": cast.string(values["meeting-link"]),
        "physical-venue": cast.string(values["physical-venue"]),
      };
    },
  });

  const handleTimeChange = (newTime: any) => {
    console.log(newTime);
  };

  useEffect(() => {
    if (open) form.reset();
  }, [open]);

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
          {...form.getInputProps("meeting-link")}
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
          {...form.getInputProps("meeting-link")}
        />
        <TextInput
          label='Physical Venue'
          placeholder='E.g. Conference Room, Office'
          withAsterisk
          {...form.getInputProps("physical-venue")}
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
      <Form form={form}>
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
              <DateInput
                label='Date'
                clearable
                defaultValue={new Date()}
                withAsterisk
                flex={1}
                {...form.getInputProps("date")}
              />

              {/* <Popover
                opened={timeOpen}
                classNames={{
                  dropdown: "bg-transparent border-none",
                }}
              >
                <PopoverTarget> */}
              {/* <TimeInput
                label='Time'
                flex={1}
                withAsterisk
                ref={timeRef}
                onClick={() => setTimeOpen(!timeOpen)}
                {...form.getInputProps("time")}
              /> */}

              {/* </PopoverTarget>
                <PopoverDropdown>
                  <Timekeeper
                    switchToMinuteOnHourDropdownSelect
                    closeOnMinuteSelect
                    doneButton={(props) => (
                      <button
                        onClick={() => {
                          setTimeOpen(false);
                        }}
                      >
                        Done
                      </button>
                    )}
                  />
                </PopoverDropdown>
              </Popover> */}
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
            {...form.getInputProps("note")}
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
            c: "red",
            className: "hover:bg-red-1 border-red-4 bg-opacity-9",
            leftSection: <TrashIcon width='18px' />,
            onClick: close,
          }}
          rightButton={{
            children: "Shedule",
            onClick: () => {},
          }}
        />
      </Form>
    </Drawer>
  );
}
