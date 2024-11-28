import clsx from "clsx";

import { Fragment } from "react";
import { useQuery } from "@tanstack/react-query";
import { Checkbox, Flex, Stack, Button } from "@mantine/core";
import { useFormContext } from "../form-context";

// import { serviceRequests } from "../data";

import { builder } from "@/builders";
import { useFakeOptionsData } from "@/builders/types/shared";
import { EditIcon } from "@/icons";
import { modals } from "@mantine/modals";
import { MODALS } from "@/packages/libraries";
import { CheckboxEditForm } from "../actions/types";

export function Services() {
  const form = useFormContext();
  const initialValues = useFakeOptionsData();

  const { data: interests, isLoading: interestsLoading } = useQuery({
    queryKey: builder.estates.options.interests.get.get(),
    queryFn: () => builder.use().estates.options.interests.get(),
    select: (data) => data,
  });

  const { data: serviceRequests, isPlaceholderData: isServiceRequests } =
    useQuery({
      queryKey: builder.estates.options.service_types.get.get(),
      queryFn: () => builder.use().estates.options.service_types.get(),
      placeholderData: Array.from({ length: 5 }, () => initialValues),
      select: (data) => data,
    });

  const handleEditModal = (type: "interests" | "service_types") => {
    modals.open({
      modalId: MODALS.FORM_DETAILS,
      title: type === "interests" ? "Interests" : "Service Requests",
      children: <CheckboxEditForm type={type} />,
    });
  };

  return (
    <Fragment>
      <Fragment>
        {serviceRequests?.length ? (
          <Checkbox.Group
            label={
              <Flex
                gap={8}
                align='center'
                className='justify-between sm:justify-start'
              >
                <span>
                  Service Requests <span className='text-red-5'>*</span>
                </span>
                <EditIcon
                  width={15}
                  height={15}
                  color='var(--blue-8)'
                  className='group-hover:inline hidden cursor-pointer'
                  onClick={() => handleEditModal("service_types")}
                />
              </Flex>
            }
            classNames={{
              label: "mb-2 w-full",
              error: "mt-3",
              root: "group",
            }}
            {...form.getInputProps("serviceRequestTypes")}
          >
            <Stack p={14} className='border border-gray-4 rounded-lg'>
              {serviceRequests?.map((request) => (
                <Checkbox
                  key={request.id}
                  variant='outline'
                  size='sm'
                  label={request.name}
                  value={request.id}
                  className={clsx({ skeleton: isServiceRequests })}
                  disabled={form.getValues().action === "view"}
                />
              ))}
            </Stack>
          </Checkbox.Group>
        ) : (
          <Stack p={14} className='border border-gray-4 rounded-lg'>
            <Button
              variant='subtle'
              onClick={() => handleEditModal("service_types")}
            >
              Add Service Requests
            </Button>
          </Stack>
        )}
      </Fragment>

      <Fragment>
        {interests?.length ? (
          <Checkbox.Group
            label={
              <Flex
                gap={8}
                align='center'
                className='justify-between sm:justify-start'
              >
                <span>
                  Interests <span className='text-red-5'>*</span>
                </span>
                <EditIcon
                  width={15}
                  height={15}
                  color='var(--blue-8)'
                  className='group-hover:inline hidden cursor-pointer'
                  onClick={() => handleEditModal("interests")}
                />
              </Flex>
            }
            classNames={{
              label: "mb-2 w-full",
              error: "mt-3",
              root: "group",
            }}
            {...form.getInputProps("serviceRequestTypes")}
          >
            <Stack p={14} className='border border-gray-4 rounded-lg'>
              {interests?.map((interest) => (
                <Checkbox
                  key={interest.id}
                  variant='outline'
                  size='sm'
                  label={interest.name}
                  value={interest.name}
                  checked={form.getValues().interests.includes(interest.name)}
                  className={clsx({ skeleton: interestsLoading })}
                  disabled={form.getValues().action === "view"}
                />
              ))}
            </Stack>
          </Checkbox.Group>
        ) : (
          <Stack p={14} className='border border-gray-4 rounded-lg'>
            <Button
              onClick={() => handleEditModal("interests")}
              variant='subtle'
            >
              Add Interests
            </Button>
          </Stack>
        )}
      </Fragment>
    </Fragment>
  );
}
