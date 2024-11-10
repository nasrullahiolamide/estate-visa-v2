"use client";

import Timekeeper, { TimeOutput } from "react-timekeeper";
import { useRef, useState } from "react";
import { GetInputPropsReturnType } from "@mantine/form/lib/types";
import { InputWrapper, Button, Menu, Stack } from "@mantine/core";
import { ClockIcon } from "@/icons";

interface TimePickerProps extends GetInputPropsReturnType {
  withAsterisk?: boolean;
  placeholder?: string;
  label: string;
}

export function TimePickerInput({
  label,
  withAsterisk,
  value,
  onChange: handleFormChange,
  placeholder = "--:--",
  ...props
}: TimePickerProps) {
  const timeRef = useRef<HTMLInputElement>(null);
  const [showTime, setShowTime] = useState(false);

  return (
    <Menu
      onChange={(opened) => setShowTime(opened)}
      opened={showTime}
      closeOnClickOutside
      position='bottom'
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
        >
          <Button
            type='button'
            variant='default'
            className='w-full cursor-pointer uppercase'
            fz='sm'
            rightSection={<ClockIcon />}
            style={{
              padding: "0 15px",
              minHeight: "48px",
            }}
            classNames={{
              inner: "justify-between",
            }}
          >
            {value || placeholder}
          </Button>
        </InputWrapper>
      </Menu.Target>

      <Menu.Dropdown>
        <Timekeeper
          closeOnMinuteSelect
          time={value}
          onChange={(t) => handleFormChange(t.formatted12)}
          switchToMinuteOnHourDropdownSelect
          doneButton={(props) => (
            <Button
              p={0}
              variant='transparent'
              w='100%'
              ta='center'
              {...props}
              onClick={() => {
                setShowTime(false);
              }}
            >
              Done
            </Button>
          )}
        />
      </Menu.Dropdown>
    </Menu>
  );
}
