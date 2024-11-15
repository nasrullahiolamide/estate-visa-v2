import { Checkbox, Stack } from "@mantine/core";
import { Fragment } from "react";
import { useFormContext } from "../form-context";
import { builder } from "@/builders";
import { useQuery } from "@tanstack/react-query";
import { serviceRequests } from "../data";
import clsx from "clsx";

export function Services() {
  const form = useFormContext();

  // const { data: serviceRequests } = useQuery({
  //   queryKey: builder.estates.house_types.get(),
  //   queryFn: () => builder.use().estates.house_types.get(),
  //   select: (data) => data,
  // });

  const { data: serviceTypes, isLoading: serviceTypesLoading } = useQuery({
    queryKey: builder.estates.service_types.get.get(),
    queryFn: () => builder.use().estates.service_types.get(),
    select: (data) => data,
  });

  return (
    <Fragment>
      <Checkbox.Group
        label='Service Requests'
        withAsterisk
        classNames={{
          label: "mb-2",
          error: "mt-3",
        }}
        {...form.getInputProps("serviceRequestTypes")}
      >
        <Stack p={14} className='border border-gray-4 rounded-lg'>
          {serviceRequests?.map((request) => (
            <Checkbox
              key={request}
              variant='outline'
              size='sm'
              label={request}
              value={request}
              className={clsx({ skeleton: serviceTypesLoading })}
              disabled={form.getValues().action === "view"}
            />
          ))}
        </Stack>
      </Checkbox.Group>

      <Checkbox.Group
        label='Service Types'
        withAsterisk
        classNames={{
          label: "mb-2",
          error: "mt-3",
        }}
        {...form.getInputProps("interests")}
      >
        <Stack p={14} className='border border-gray-4 rounded-lg'>
          {serviceTypes?.map((type) => (
            <Checkbox
              key={type.id}
              variant='outline'
              size='sm'
              label={type.name}
              value={type.name}
              className={clsx({ skeleton: serviceTypesLoading })}
              disabled={form.getValues().action === "view"}
            />
          ))}
        </Stack>
      </Checkbox.Group>
    </Fragment>
  );
}
