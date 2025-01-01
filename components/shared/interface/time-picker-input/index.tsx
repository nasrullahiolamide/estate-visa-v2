"use client";

import { ClockIcon } from "@/icons";
import { Button, InputWrapper, Menu, Stack } from "@mantine/core";
import { GetInputPropsReturnType } from "@mantine/form/lib/types";
import { useRef, useState } from "react";
import Timekeeper from "react-timekeeper";

interface TimePickerProps extends GetInputPropsReturnType {
  withAsterisk?: boolean;
  placeholder?: string;
  disabled?: boolean;
  label: string;
}

export function TimePickerInput({
  label,
  withAsterisk,
  value,
  onChange: handleFormChange,
  disabled,
  placeholder = "--:--",
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
          flex={1}
        >
          <Button
            type='button'
            variant='default'
            className='w-full cursor-pointer uppercase'
            fz='sm'
            rightSection={<ClockIcon />}
            disabled={disabled}
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
