"use client";

import { ReactNode } from "react";
import { Button, Select, TextInput } from "@mantine/core";
import { Form, yupResolver } from "@mantine/form";
import { modals } from "@mantine/modals";
import { APP, decryptUri, MODALS } from "@/packages/libraries";
import { FlowContainer } from "@/components/layout/flow-container";

import { schema } from "../schema";
import { ConfirmOccupant } from "./confirmation";
import { ConfirmPropertyOwner } from "../../property-owners/confirm-property-owner";
import { builder } from "@/builders";
import { ProfileData } from "@/builders/types/profile";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { FormProvider, useForm } from "../form-context";

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

  const form = useForm({
    initialValues: {
      houseId: "",
      fullname: "",
      email: "",
      phone: "",
      relationshipToMain: "",
      status: "active",
      isMain: true,
      isPropertyOwner: false,
    },
    validate: yupResolver(schema),
    validateInputOnBlur: true,
  });

  const handleSubmit = () => {
    modals.open({
      modalId: MODALS.CONFIRMATION,
      children:
        viewId === "property-owners" ? (
          <FormProvider form={form}>
            <ConfirmPropertyOwner />
          </FormProvider>
        ) : (
          <FormProvider form={form}>
            <ConfirmOccupant />
          </FormProvider>
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
          data={houseNumbers}
          nothingFoundMessage='No house numbers found'
          label='House Number'
          placeholder='Select House Number'
          withAsterisk
          {...form.getInputProps("houseId")}
        />
        <TextInput
          label='Full Name'
          withAsterisk
          {...form.getInputProps("fullname")}
        />
        <TextInput
          label='Email Address'
          withAsterisk
          {...form.getInputProps("email")}
        />
        <TextInput
          label='Phone Number'
          withAsterisk
          {...form.getInputProps("phone")}
        />
        {children}
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

        <Button type='submit' mt={10}>
          Add New Occupant
        </Button>
      </FlowContainer>
    </Form>
  );
}
