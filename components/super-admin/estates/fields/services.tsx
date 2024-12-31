import clsx from "clsx";

import { Fragment } from "react";
import { useQuery } from "@tanstack/react-query";
import { Checkbox, Flex, Stack, Button } from "@mantine/core";
import { useFormContext } from "../form-context";

import { builder } from "@/builders";
import { EditIcon } from "@/icons";
import { modals } from "@mantine/modals";
import { MODALS } from "@/packages/libraries";
import { CheckboxEditForm } from "../actions/types";
import { SERVICE_TYPES } from "@/packages/constants/data";

export function Services() {
  const form = useFormContext();

  const { data: serviceRequests, isLoading: isServiceRequests } = useQuery({
    queryKey: builder.estates.options.service_types.get.$get(),
    queryFn: () => builder.$use.estates.options.service_types.get(),
    select: (data) => data,
  });

  const handleEditModal = () => {
    modals.open({
      modalId: MODALS.FORM_DETAILS,
      title: "Service Requests",
      children: <CheckboxEditForm type="service_types" />,
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
                align="center"
                className="justify-between sm:justify-start"
              >
                <span>
                  Service Requests <span className="text-red-5">*</span>
                </span>
                <EditIcon
                  width={15}
                  height={15}
                  color="var(--blue-8)"
                  className="group-hover:inline hidden cursor-pointer"
                  onClick={handleEditModal}
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
            <Stack p={14} className="border border-gray-4 rounded-lg">
              {serviceRequests?.map((request) => (
                <Checkbox
                  key={request.id}
                  variant="outline"
                  size="sm"
                  label={request.name}
                  value={request.id}
                  className={clsx({ skeleton: isServiceRequests })}
                  disabled={form.getValues().action === "view"}
                />
              ))}
            </Stack>
          </Checkbox.Group>
        ) : (
          <Stack p={14} className="border border-gray-4 rounded-lg">
            <Button variant="subtle" onClick={handleEditModal}>
              Add Service Requests
            </Button>
          </Stack>
        )}
      </Fragment>

      <Fragment>
        <Checkbox.Group
          label="Interests"
          withAsterisk
          classNames={{
            label: "mb-2 w-full",
            error: "mt-3",
            root: "group",
          }}
          {...form.getInputProps("interests")}
        >
          <Stack p={14} className="border border-gray-4 rounded-lg">
            {SERVICE_TYPES?.map((interest) => (
              <Checkbox
                key={interest}
                variant="outline"
                size="sm"
                label={interest}
                value={interest}
                checked={form.getValues().interests.includes(interest)}
                disabled={
                  form.getValues().action === "view" ||
                  form.getValues().interests.includes(interest)
                }
              />
            ))}
          </Stack>
        </Checkbox.Group>
      </Fragment>
    </Fragment>
  );
}
