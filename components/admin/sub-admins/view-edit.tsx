"use client";

import { Button, Select, TextInput } from "@mantine/core";
import { Form, useForm, yupResolver } from "@mantine/form";
import { object, string } from "yup";

import { FlowContainer } from "@/components/layout/flow-container";
import { cast } from "@/packages/libraries";
import { stat } from "fs";
import { ArrowDown01Icon } from "hugeicons-react";
import { FormButtons } from "@/components/shared/interface";
import { SubAdminListData } from "@/builders/types/sub-admins";
import clsx from "clsx";

const schema = object({
  full_name: string().required("Full name is required"),
  phone_number: string().required("Phone number is required"),
});

interface ViewSubAdminsProps extends Omit<SubAdminListData, "edit"> {
  edit: boolean;
}

export function ViewSubAdmins({ edit, ...data }: ViewSubAdminsProps) {
  const isActive = data.status === "Active";

  const form = useForm({
    initialValues: {
      full_name: data.full_name,
      phone_number: data.phone_number,
      status: data.status,
      edit_details: edit,
    },
    validate: yupResolver(schema),
    validateInputOnBlur: true,
    transformValues: (values) => {
      const { full_name, phone_number, status } = values;
      return {
        full_name: cast.string(full_name),
        phone_number: cast.string(phone_number),
        status: cast.string(status),
      };
    },
  });

  const handleSubmit = () => {};

  return (
    <Form form={form} onSubmit={() => {}}>
      <FlowContainer
        className='rounded-2xl bg-primary-background-white'
        justify='center'
        gap={25}
        type='plain'
        bg='white'
      >
        <TextInput
          label='Full Name'
          value={data.full_name}
          disabled={!form.getValues().edit_details}
          withAsterisk
          {...form.getInputProps("full_name")}
        />
        <TextInput
          label='Phone Number'
          value={data.phone_number}
          disabled={!form.getValues().edit_details}
          withAsterisk
          {...form.getInputProps("phone_number")}
        />

        <Select
          data={["Active", "Suspended"]}
          value={data.status}
          disabled={!form.getValues().edit_details}
          label='Account Status'
          rightSection={<ArrowDown01Icon />}
          searchable={false}
          classNames={{
            option: "hover:bg-purple-4 text-sm",
            input: "text-sm",
          }}
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
