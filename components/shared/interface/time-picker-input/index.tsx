"use client";

import { useRef, useState } from "react";
import { UnstyledButton, InputWrapper, Button, Menu } from "@mantine/core";
import Timekeeper from "react-timekeeper";
import dayjs from "dayjs";
import { GetInputPropsReturnType } from "@mantine/form/lib/types";
import { Stack } from "@mantine/core";
import { TIME_FORMAT } from "@/packages/constants/time";

interface TimePickerProps extends GetInputPropsReturnType {
  withAsterisk?: boolean;
  label: string;
}

export function TimePickerInput({
  label,
  withAsterisk,
  ...props
}: TimePickerProps) {
  const timeRef = useRef<HTMLInputElement>(null);
  const [selectedTime, setSelectedTime] = useState(dayjs().format(TIME_FORMAT));
  const [timeOpen, setTimeOpen] = useState(false);

  const handleTimeChange = (newTime) => {
    setSelectedTime(newTime);
    // form.setFieldValue("visitTime", formattedTime);
  };

  return (
    <Menu
      position='bottom'
      offset={5}
      classNames={{
        dropdown: "bg-transparent border-none",
      }}
    >
      <Menu.Target>
        <InputWrapper
          withAsterisk={withAsterisk}
          label={label}
          ref={timeRef}
          component={Stack}
          classNames={{
            label: "text-primary-text-body",
            root: "gap-1.5",
          }}
          {...props}
        >
          <UnstyledButton
            type='button'
            variant='default'
            onClick={() => setTimeOpen(!timeOpen)}
            className='w-full cursor-pointer text-sm rounded-xl'
            style={{
              padding: "0 12px",
              minHeight: "48px",
              textAlign: "left",
              border: "1px solid var(--mantine-color-gray-4)",
              borderRadius: "6px",
            }}
          >
            {selectedTime}
          </UnstyledButton>
        </InputWrapper>
      </Menu.Target>

      <Menu.Dropdown>
        <Timekeeper
          closeOnMinuteSelect
          time={selectedTime}
          onChange={(data) => handleTimeChange(data.formatted12)}
          switchToMinuteOnHourDropdownSelect
          doneButton={(props) => (
            <Button variant='transparent' w='100%' ta='center' {...props}>
              Done
            </Button>
          )}
        />
      </Menu.Dropdown>
    </Menu>
  );
}
