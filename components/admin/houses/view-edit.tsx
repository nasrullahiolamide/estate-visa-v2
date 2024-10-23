"use client";

import { Button, Select, TextInput } from "@mantine/core";
import { Form, useForm, yupResolver } from "@mantine/form";

import { cast, MODALS } from "@/packages/libraries";
import { FlowContainer } from "@/components/layout/flow-container";
import { HousesData } from "@/builders/types/houses";
import { schema } from "./schema";
import { modals } from "@mantine/modals";

interface ViewEditHousesProps extends Omit<HousesData, "edit"> {
  edit: boolean;
}

export function ViewEditHouses({ edit, ...data }: ViewEditHousesProps) {
  const form = useForm({
    initialValues: {
      house_no: data.house_no,
      street_name: data.street_name,
      house_type: data.house_type,
      status: data.status,
      validity_period: data.validity_period,
      edit_details: edit,
    },
    validate: yupResolver(schema),
    validateInputOnBlur: true,
    transformValues: (values) => {
      const { street_name, house_type, status, validity_period } = values;
      return {
        house_no: cast.string(data.house_no),
        street_name: cast.string(street_name),
        house_type: cast.string(house_type),
        status: cast.string(status),
        validity_period: cast.string(validity_period),
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
          label='Street Name'
          disabled={!isEditing}
          withAsterisk
          {...form.getInputProps("street_name")}
        />
        <Select
          data={["A11", "B11"]}
          disabled={!isEditing}
          label='House Number'
          withAsterisk
          {...form.getInputProps("house_no")}
        />
        <Select
          data={["Single", "Double", "Duplex", "Bungalow"]}
          disabled={!isEditing}
          label='House Type'
          withAsterisk
          {...form.getInputProps("house_type")}
        />
        <Select
          data={["Active", "Suspended"]}
          disabled={!isEditing}
          label='House Status'
          {...form.getInputProps("status")}
        />
        <Select
          data={["Active", "Suspended"]}
          disabled={!isEditing}
          label='House Validity Period'
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
