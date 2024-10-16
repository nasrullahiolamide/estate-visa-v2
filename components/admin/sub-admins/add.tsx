"use client";

import { Button, Select, SimpleGrid, Stack, TextInput } from "@mantine/core";
import { Form, useForm, yupResolver } from "@mantine/form";
import { Fragment } from "react";
import { object, string } from "yup";

import { FlowContainer } from "@/components/layout/flow-container";
import { cast } from "@/packages/libraries";
import { stat } from "fs";
import { ArrowDown01Icon } from "hugeicons-react";

const schema = object({
  full_name: string().required("Full name is required"),
  email: string().email("Invalid email").required("Email is required"),
  phone_number: string().required("Phone number is required"),
});

export function AddSubAdmins() {
  const form = useForm({
    initialValues: {
      full_name: "",
      email: "",
      phone_number: "",
      status: "Active",
    },
    validate: yupResolver(schema),
    validateInputOnBlur: true,
    transformValues: (values) => {
      const { full_name, email, phone_number, status } = values;
      return {
        full_name: cast.string(full_name),
        email: cast.string(email),
        phone_number: cast.string(phone_number),
        status: cast.string(status),
      };
    },
  });

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
          withAsterisk
          {...form.getInputProps("full_name")}
        />
        <TextInput
          label='Email Address'
          withAsterisk
          {...form.getInputProps("email")}
        />
        <TextInput
          label='Phone Number'
          withAsterisk
          {...form.getInputProps("phone_number")}
        />

        <Select
          data={["Active", "Suspended"]}
          label='Account Status'
          rightSection={<ArrowDown01Icon />}
          searchable={false}
          classNames={{
            option: "hover:bg-purple-4",
          }}
          {...form.getInputProps("status")}
        />

        <Button type='submit' mt={10}>
          Add Sub Admin
        </Button>
      </FlowContainer>
    </Form>
  );
}
