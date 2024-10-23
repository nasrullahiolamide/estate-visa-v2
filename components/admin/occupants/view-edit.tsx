"use client";

import clsx from "clsx";
import { ArrowDown01Icon } from "hugeicons-react";
import { Select, TextInput } from "@mantine/core";
import { Form, useForm, yupResolver } from "@mantine/form";

import { cast, MODALS } from "@/packages/libraries";
import { FlowContainer } from "@/components/layout/flow-container";
import { FormButtons } from "@/components/shared/interface";
import { OccupantsData } from "@/builders/types/occupants";
import { schema } from "./schema";
import { modals } from "@mantine/modals";

interface ViewEditOccupantsProps extends Omit<OccupantsData, "edit"> {
  edit: boolean;
}

export function ViewEditOccupants({ edit, ...data }: ViewEditOccupantsProps) {
  const isActive = data.status === "Active";

  const form = useForm({
    initialValues: {
      house_no: data.house_no,
      full_name: data.full_name,
      email_address: data.email_address,
      phone_number: data.phone_number,
      sub_occupants: data.sub_occupants,
      status: data.status,
      edit_details: edit,
    },
    validate: yupResolver(schema),
    validateInputOnBlur: true,
    transformValues: (values) => {
      const { full_name, phone_number, status } = values;
      return {
        house_no: cast.string(data.house_no),
        full_name: cast.string(full_name),
        email_address: cast.string(data.email_address),
        phone_number: cast.string(phone_number),
        sub_occupants: cast.number(data.sub_occupants),
        status: cast.string(status),
      };
    },
  });

  const handleSubmit = () => {
    modals.close(MODALS.VIEW_EDIT_NEW_OCCUPANTS);
  };

  return (
    <Form form={form}>
      <FlowContainer
        className='rounded-2xl bg-primary-background-white'
        justify='center'
        gap={18}
        type='plain'
        bg='white'
      >
        <Select
          data={["A11", "B11"]}
          disabled={!form.getValues().edit_details}
          label='House Number'
          withAsterisk
          {...form.getInputProps("house_no")}
        />
        <TextInput
          label='Full Name'
          disabled={!form.getValues().edit_details}
          withAsterisk
          {...form.getInputProps("full_name")}
        />
        <TextInput
          label='Email Address'
          disabled={!form.getValues().edit_details}
          withAsterisk
          {...form.getInputProps("email_address")}
        />
        <TextInput
          label='Phone Number'
          disabled={!form.getValues().edit_details}
          withAsterisk
          {...form.getInputProps("phone_number")}
        />

        <Select
          data={["Active", "Suspended"]}
          disabled={!form.getValues().edit_details}
          label='Account Status'
          {...form.getInputProps("status")}
        />

        <FormButtons
          containerProps={{
            pt: 15,
            pb: 0,
            px: 0,
          }}
          leftButton={{
            children: `${isActive ? "Disable" : "Activate"} Account`,
            c: isActive ? "red" : "green",
            className: clsx(
              isActive
                ? "hover:bg-red-1 border-red-4"
                : "hover:bg-green-1 border-green-9",
              "bg-opacity-9"
            ),
            onClick: () => {},
          }}
          rightButton={{
            children: form.getValues().edit_details ? "Save changes" : "Edit",
            onClick: form.getValues().edit_details
              ? handleSubmit
              : () => form.setValues({ edit_details: true }),
          }}
        />
      </FlowContainer>
    </Form>
  );
}
