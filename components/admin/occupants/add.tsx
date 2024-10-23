"use client";

import { ReactNode } from "react";
import { ArrowDown01Icon } from "hugeicons-react";
import { Button, Select, TextInput } from "@mantine/core";
import { Form, useForm, yupResolver } from "@mantine/form";
import { modals } from "@mantine/modals";
import { cast, MODALS } from "@/packages/libraries";
import { FlowContainer } from "@/components/layout/flow-container";
import { schema } from "./schema";
import { ConfirmOccupant } from "./confirm-occupant";
import { ConfirmPropertyOwner } from "../property-owners/confirm-property-owner";

type ViewId = "occupants" | "property-owners";

type AddNewOccupantsProps = {
  viewId?: ViewId;
} & (
  | { viewId: "property-owners"; children?: ReactNode }
  | {
      viewId?: Exclude<ViewId, "property-owners">;
      children?: never;
    }
);

export function AddNewOccupants({
  viewId = "occupants",
  children,
}: AddNewOccupantsProps) {
  const form = useForm({
    initialValues: {
      house_no: "",
      full_name: "",
      email_address: "",
      phone_number: "",
      status: "Active",
    },
    validate: yupResolver(schema),
    validateInputOnBlur: true,
    transformValues: (values) => {
      const { house_no, full_name, email_address, phone_number, status } =
        values;
      return {
        house_no: cast.string(house_no),
        full_name: cast.string(full_name),
        email_address: cast.string(email_address),
        phone_number: cast.string(phone_number),
        status: cast.string(status),
      };
    },
  });

  const handleSubmit = () => {
    const today = new Date().toISOString();
    // const isOccupant = viewId === "property-owners";

    const formData = {
      ...form.getValues(),
      sub_occupants: 0,
      created_at: today,
      updated_at: today,
    };

    modals.open({
      modalId: MODALS.CONFIRM_OCCUPANT,
      children:
        viewId === "property-owners" ? (
          <ConfirmPropertyOwner data={formData} />
        ) : (
          <ConfirmOccupant data={formData} />
        ),
    });
  };

  return (
    <Form form={form} onSubmit={handleSubmit}>
      <FlowContainer
        className='rounded-2xl bg-primary-background-white'
        justify='center'
        gap={18}
        type='plain'
        bg='white'
      >
        <Select
          data={["A11", "B11"]}
          label='House Number'
          withAsterisk
          {...form.getInputProps("house_no")}
        />
        <TextInput
          label='Full Name'
          withAsterisk
          {...form.getInputProps("full_name")}
        />
        <TextInput
          label='Email Address'
          withAsterisk
          {...form.getInputProps("email_address")}
        />
        <TextInput
          label='Phone Number'
          withAsterisk
          {...form.getInputProps("phone_number")}
        />
        {children}
        <Select
          data={["Active", "Suspended"]}
          label='Status'
          {...form.getInputProps("status")}
        />

        <Button type='submit' mt={10}>
          Add New Occupant
        </Button>
      </FlowContainer>
    </Form>
  );
}
