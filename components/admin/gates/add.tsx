"use client";

import { Button, Select, TextInput } from "@mantine/core";
import { Form, useForm, yupResolver } from "@mantine/form";
import { FlowContainer } from "@/components/layout/flow-container";
import { cast } from "@/packages/libraries";
import { schema } from "./schema";

export function AddNewGate() {
  const form = useForm({
    initialValues: {
      name: "",
      location: "",
      status: "Open",
    },
    validate: yupResolver(schema),
    validateInputOnBlur: true,
    transformValues: (values) => {
      const { name, location, status } = values;
      return {
        name: cast.string(name),
        location: cast.string(location),
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
          label='Gate Name'
          withAsterisk
          {...form.getInputProps("name")}
        />
        <TextInput
          label='Location'
          withAsterisk
          {...form.getInputProps("location")}
        />
        <Select
          data={["Open", "Closed"]}
          label='House Status'
          withAsterisk
          {...form.getInputProps("status")}
        />

        <Button mt={10} type='submit' onClick={handleSubmit}>
          Add Gate
        </Button>
      </FlowContainer>
    </Form>
  );
}
