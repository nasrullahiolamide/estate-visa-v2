"use client";

import { Button, ButtonProps, Textarea, TextInput } from "@mantine/core";
import { FlowContainer } from "@/components/layout/flow-container";
import { ServiceRequestsData } from "@/builders/types/service-requests";

interface ViewServiceRequestProps extends ServiceRequestsData {
  buttonProps: ButtonProps & { onClick: () => void };
}

export function ViewServiceRequest({
  buttonProps,
  ...data
}: ViewServiceRequestProps) {
  console.log({ ...data });
  return (
    <>
      <FlowContainer
        className='bg-primary-background-white overflow-scroll'
        type='plain'
        bg='white'
        gap={15}
        h={620}
      >
        <TextInput label='House Number' value={data.house_no} disabled />
        <TextInput label='Account Type' value={data.account_type} disabled />
        <TextInput label='Phone Number' disabled value={data.phone_number} />
        <TextInput label='Service Type' disabled value={data.service_type} />
        <TextInput label='Date' disabled value={data.date} />
        <TextInput
          label='Preferred Time'
          disabled
          value={data.preferred_time}
        />
        <TextInput label='Urgency Level' disabled value={data.urgency_level} />
        <Textarea label='Brief Description' disabled value={data.description} />
        <TextInput label='Status' disabled value={data.status} />
      </FlowContainer>
      <Button mt={20} w='100%' {...buttonProps} />
    </>
  );
}
