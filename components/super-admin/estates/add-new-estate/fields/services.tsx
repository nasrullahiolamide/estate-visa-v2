import { Title, Checkbox, Stack } from "@mantine/core";
import { Fragment } from "react";
import { serviceRequests, serviceTypes } from "../data";
import { useFormContext } from "../form-context";

export function Services() {
  const form = useFormContext();

  return (
    <Fragment>
      <Title order={3} fw={400}>
        Service Requests
      </Title>
      <Checkbox.Group withAsterisk {...form.getInputProps("service_requests")}>
        <Stack p={14} className='border border-gray-4 rounded-lg'>
          {serviceRequests.map((request) => (
            <Checkbox
              variant='outline'
              size='sm'
              label={request}
              value={request}
            />
          ))}
        </Stack>
      </Checkbox.Group>

      <Title order={3} fw={400}>
        Service Types
      </Title>
      <Checkbox.Group withAsterisk {...form.getInputProps("service_types")}>
        <Stack p={14} className='border border-gray-4 rounded-lg'>
          {serviceTypes.map((type) => (
            <Checkbox variant='outline' size='sm' label={type} value={type} />
          ))}
        </Stack>
      </Checkbox.Group>
    </Fragment>
  );
}
