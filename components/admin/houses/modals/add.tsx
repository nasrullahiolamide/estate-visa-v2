"use client";

import { ArrowDown01Icon } from "hugeicons-react";
import { Button, Select, TextInput } from "@mantine/core";
import { Form, useForm, yupResolver } from "@mantine/form";
import { FlowContainer } from "@/components/layout/flow-container";
import { APP, cast, decryptUri } from "@/packages/libraries";
import { schema } from "../schema";
import { builder } from "@/builders";
import { ProfileData } from "@/builders/types/profile";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";

export function AddNewHouse() {
  const userData: ProfileData = decryptUri(getCookie(APP.USER_DATA));

  const { data: houseNumbers } = useQuery({
    queryKey: builder.houses.list.all.get(userData.estate.id),
    queryFn: () => builder.use().houses.list.all(userData.estate.id),
    select: (data) => {
      return data.map((house) => ({
        value: house.id,
        label: house.houseNumber,
      }));
    },
  });

  const { data: houseTypes } = useQuery({
    queryKey: builder.estates.house_types.get.get(),
    queryFn: () => builder.use().estates.house_types.get(),
    select: (data) => {
      return data.map((type) => ({
        value: type.id,
        label: type.name,
      }));
    },
  });

  const form = useForm({
    initialValues: {
      houseNumber: "",
      streetName: "",
      houseTypeId: "",
      status: "active",
      validityPeriod: "3 months",
    },
    validate: yupResolver(schema),
    validateInputOnBlur: true,
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
          {...form.getInputProps("streetName")}
        />
        <Select
          data={houseNumbers}
          nothingFoundMessage='No house numbers found'
          label='House Number'
          {...form.getInputProps("houseNumber")}
        />
        <Select
          data={houseTypes}
          label='House Type'
          nothingFoundMessage='No house types found'
          withAsterisk
          {...form.getInputProps("houseTypeId")}
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
          label='Status'
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
