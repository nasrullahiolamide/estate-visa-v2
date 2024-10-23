"use client";

import { ArrowDown01Icon } from "hugeicons-react";
import { Button, Select, TextInput } from "@mantine/core";
import { Form, useForm, yupResolver } from "@mantine/form";
import { FlowContainer } from "@/components/layout/flow-container";
import { cast } from "@/packages/libraries";
import { schema } from "./schema";

export function AddNewHouse() {
  const form = useForm({
    initialValues: {
      house_no: "",
      street_name: "",
      house_type: "Single",
      status: "Active",
      validity_period: "3 months",
    },
    validate: yupResolver(schema),
    validateInputOnBlur: true,
    transformValues: (values) => {
      const { house_no, street_name, house_type, status } = values;
      return {
        house_no: cast.string(house_no),
        street_name: cast.string(street_name),
        house_type: cast.string(house_type),
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
        gap={18}
        type='plain'
        bg='white'
      >
        <TextInput
          label='Street Name'
          withAsterisk
          {...form.getInputProps("street_name")}
        />
        <Select
          data={["A11", "B11"]}
          label='House Number'
          {...form.getInputProps("house_no")}
        />
        <Select
          data={["Single", "Double", "Duplex", "Bungalow"]}
          label='House Type'
          withAsterisk
          {...form.getInputProps("house_type")}
        />
        <Select
          data={["Active", "Suspended"]}
          label='House Status'
          withAsterisk
          {...form.getInputProps("status")}
        />
        <Select
          data={["6 months", "3 months", "3 Years", "4 Years", "5 Years"]}
          label='House Validity Period'
          withAsterisk
          {...form.getInputProps("validity_period")}
        />

        <Button mt={10} type='submit' onClick={handleSubmit}>
          Add New House
        </Button>
      </FlowContainer>
    </Form>
  );
}
