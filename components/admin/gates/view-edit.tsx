"use client";

import { Button, Select, TextInput } from "@mantine/core";
import { Form, useForm, yupResolver } from "@mantine/form";

import { cast, MODALS } from "@/packages/libraries";
import { FlowContainer } from "@/components/layout/flow-container";
import { schema } from "./schema";
import { modals } from "@mantine/modals";
import { GatesData } from "@/builders/types/gates";

interface ViewEditGatesProps extends Omit<GatesData, "edit"> {
  edit: boolean;
}

export function ViewEditGates({ edit, ...data }: ViewEditGatesProps) {
  const form = useForm({
    initialValues: {
      name: data.name,
      location: data.location,
      status: data.status,
      edit_details: edit,
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

  const handleSubmit = () => {
    isEditing
      ? modals.close(MODALS.VIEW_EDIT_HOUSES)
      : form.setValues({ edit_details: true });
  };

  const isEditing = form.getValues().edit_details;

  return (
    <Form form={form}>
      <FlowContainer
        className='rounded-2xl bg-primary-background-white'
        justify='center'
        gap={25}
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

        <Button
          mt={10}
          type={isEditing ? "submit" : "button"}
          onClick={handleSubmit}
        >
          {isEditing ? "Save Changes" : "Edit"}
        </Button>
      </FlowContainer>
    </Form>
  );
}
