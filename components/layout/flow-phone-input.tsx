"use client";

import { Input, Stack, TextInputProps } from "@mantine/core";
import { GetInputPropsReturnType } from "@mantine/form/lib/types";

import { PhoneInput } from "react-international-phone";

interface FlowPhoneInputProps
  extends GetInputPropsReturnType,
    Omit<TextInputProps, keyof GetInputPropsReturnType> {}

export function FlowPhoneInput(props: FlowPhoneInputProps) {
  const { value, onChange, onFocus, onBlur, error, ...textInputProps } = props;
  const { label, withAsterisk, placeholder, classNames, disabled } =
    textInputProps;

  return (
    <Input.Wrapper
      withAsterisk={withAsterisk}
      label={label}
      component={Stack}
      classNames={{
        label: "prose-sm/regular text-primary-text-body",
        root: "gap-1.5",
        ...classNames,
      }}
    >
      <PhoneInput
        defaultCountry='ng'
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        inputClassName='w-full !py-6 !prose-sm/regular !rounded-tr-lg !rounded-br-lg'
        countrySelectorStyleProps={{
          buttonClassName: "py-6 px-3 !rounded-tl-lg !rounded-bl-lg",
        }}
      />

      <Input.Error>{error}</Input.Error>
    </Input.Wrapper>
  );
}
