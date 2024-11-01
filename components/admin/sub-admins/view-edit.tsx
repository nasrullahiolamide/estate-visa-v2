"use client";

import { Select, TextInput } from "@mantine/core";
import { Form, useForm, yupResolver } from "@mantine/form";

import { FlowContainer } from "@/components/layout/flow-container";
import { cast, MODALS } from "@/packages/libraries";
import { FormButtons } from "@/components/shared/interface";
import { SubAdminListData } from "@/builders/types/sub-admins";
import clsx from "clsx";
import { modals } from "@mantine/modals";
import { schema } from "./schema";

interface ViewSubAdminsProps extends Omit<SubAdminListData, "edit"> {
  edit: boolean;
}

export function ViewSubAdmins({ edit, ...data }: ViewSubAdminsProps) {
  const isActive = data.status.toLowerCase() === "active";

  const form = useForm({
    initialValues: {
      fullname: data.firstname,
      phone: data.phone,
      status: data.status,
      edit_details: edit,
    },
    validate: yupResolver(schema),
    validateInputOnBlur: true,
    transformValues: (values) => {
      const { fullname, phone, status } = values;
      return {
        fullname: cast.string(fullname),
        phone_number: cast.string(phone),
        status: cast.string(status),
      };
    },
  });

  const handleSubmit = () => {
    modals.close(MODALS.VIEW_EDIT_SUB_ADMIN);
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
        <TextInput
          label='Full Name'
          disabled={!form.getValues().edit_details}
          withAsterisk
          {...form.getInputProps("fullname")}
        />
        <TextInput
          label='Phone Number'
          disabled={!form.getValues().edit_details}
          withAsterisk
          {...form.getInputProps("phone")}
        />

        <Select
          data={[
            {
              value: "active",
              label: "Active",
            },
            {
              value: "suspended",
              label: "Suspended",
            },
          ]}
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
            children:
              !form.getValues().edit_details &&
              `${isActive ? "Disable" : "Activate"} Account`,
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
