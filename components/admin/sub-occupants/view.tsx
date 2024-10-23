"use client";

import { Button, Select, TextInput } from "@mantine/core";
import { MODALS } from "@/packages/libraries";
import { FlowContainer } from "@/components/layout/flow-container";
import { modals } from "@mantine/modals";
import { SubOccupantsData } from "@/builders/types/sub-occupants";

interface ViewSubOccupantsProps extends SubOccupantsData {}

export function ViewSubOccupants({ ...data }: ViewSubOccupantsProps) {
  return (
    <FlowContainer
      className='rounded-2xl bg-primary-background-white'
      justify='center'
      gap={15}
      type='plain'
      bg='white'
    >
      <TextInput label='House Number' value={data.house_no} disabled />
      <TextInput label='Full Name' value={data.email_address} disabled />
      <TextInput label='Email Address' value={data.email_address} disabled />
      <TextInput label='Phone Number' disabled value={data.phone_number} />
      <TextInput label="Occupant's Name" disabled value={data.occupant} />
      <TextInput label='Relationship' disabled value={data.relationship} />

      <Button onClick={() => modals.close(MODALS.VIEW_SUB_OCCUPANTS)} mt={10}>
        Close
      </Button>
    </FlowContainer>
  );
}
