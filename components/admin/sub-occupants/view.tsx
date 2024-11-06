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
      <TextInput label='House Number' value={data.id} disabled />
      <TextInput label='Full Name' value={data.user.firstname} disabled />
      <TextInput label='Email Address' value={data.user.email} disabled />
      <TextInput label='Phone Number' disabled value={data.user.phone} />
      <TextInput label="Occupant's Name" disabled value={data.user.firstname} />
      <TextInput
        label='Relationship'
        disabled
        value={data.relationshipToMain}
      />

      <Button onClick={() => modals.close(MODALS.FORM_DETAILS)} mt={10}>
        Close
      </Button>
    </FlowContainer>
  );
}
