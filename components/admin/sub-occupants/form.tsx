"use client";

import { SubOccupantsData } from "@/builders/types/sub-occupants";
import { FlowContainer } from "@/components/layout/flow-container";
import { APP, MODALS, pass } from "@/packages/libraries";
import { Button, Select, TextInput } from "@mantine/core";
import { Form, useForm } from "@mantine/form";
import { modals } from "@mantine/modals";

import { FlowPhoneInput } from "@/components/layout";
import { RELATIONSHIP_OPTIONS } from "@/packages/constants/data";
import { getCookie } from "cookies-next";
import { toString } from "lodash";

export interface SubOccupantsFormProps {
  data?: SubOccupantsData;
  modalType: "add" | "edit" | "view";
}

export function SubOccupantsForm({ data, modalType }: SubOccupantsFormProps) {
  const houseId = toString(getCookie(APP.HOUSE_ID));
  const form = useForm({
    initialValues: {
      email: pass.string(data?.user.email),
      fullname: pass.string(data?.user.firstname),
      phone: pass.string(data?.user.phone),
      relationshipToMain: pass.string(data?.relationshipToMain),
      isMain: false,
      isPropertyOwner: false,
      houseId,
      modalType,
    },
  });

  return (
    <Form form={form}>
      <FlowContainer
        className='rounded-2xl bg-primary-background-white'
        justify='center'
        gap={15}
        type='plain'
        bg='white'
      >
        <TextInput
          label='Full Name'
          disabled
          {...form.getInputProps("fullname")}
        />
        <TextInput
          label='Email Address'
          disabled
          {...form.getInputProps("email")}
        />
        <FlowPhoneInput
          label='Phone Number'
          disabled
          {...form.getInputProps("phone")}
        />

        <Select
          data={RELATIONSHIP_OPTIONS}
          label='Relationship'
          disabled
          withAsterisk
          {...form.getInputProps("relationshipToMain")}
        />

        <Button mt={10} onClick={() => modals.close(MODALS.FORM_DETAILS)}>
          Close
        </Button>
      </FlowContainer>
    </Form>
  );
}
