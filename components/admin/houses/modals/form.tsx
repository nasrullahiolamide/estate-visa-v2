"use client";

import {
  Button,
  Select,
  TextInput,
  Text,
  Stack,
  Radio,
  Group,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { Form, useForm, yupResolver } from "@mantine/form";
import { getCookie } from "cookies-next";
import dayjs, { ManipulateType } from "dayjs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { builder } from "@/builders";
import { APP, cast, pass } from "@/packages/libraries";
import { handleSuccess, handleError } from "@/packages/notification";
import { DATE_FORMAT } from "@/packages/constants/time";
import { FlowContainer } from "@/components/layout/flow-container";
import { schema } from "../schema";
import { useEffect } from "react";
import { toString } from "lodash";
import clsx from "clsx";

export interface HouseFormProps {
  modalType: "add" | "edit" | "view";
  id?: string;
}

export function HouseForm({ modalType = "add", id = "" }: HouseFormProps) {
  const estateId = toString(getCookie(APP.ESTATE_ID));
  const queryClient = useQueryClient();

  // Fetch house data
  const { data, isLoading } = useQuery({
    queryKey: builder.houses.id.get.$get(id),
    queryFn: () => builder.$use.houses.id.get(id),
    select: (data) => data,
  });

  // Add  house
  const { mutate: addHouse, isPending: isAdding } = useMutation({
    mutationFn: builder.$use.houses.post,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: builder.houses.list.table.$get(),
      });
      modals.closeAll();
      handleSuccess({
        message: "House Added Successfully",
      });
    },
    onError: handleError(),
  });

  // Update house
  const { mutate: updateHouse, isPending: isUpdating } = useMutation({
    mutationFn: builder.$use.houses.id.edit,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: builder.houses.list.table.$get(),
      });
      modals.closeAll();
      handleSuccess({
        message: "House Updated Successfully",
      });
    },
    onError: handleError(),
  });

  // Fetch house types
  const { data: houseTypes } = useQuery({
    queryKey: builder.estates.options.house_types.get.$get(),
    queryFn: () => builder.$use.estates.options.house_types.get(),
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
      houseTypeId: "",
      streetName: "",
      status: "active",
      duration: "",
      durationType: "months",
      modalType,
    },
    validate: yupResolver(schema),
    validateInputOnBlur: true,
    transformValues: (values) => {
      const {
        streetName,
        houseNumber,
        houseTypeId,
        status,
        durationType,
        duration,
      } = values;
      return {
        houseNumber: cast.string(houseNumber),
        streetName: cast.string(streetName),
        houseTypeId: cast.string(houseTypeId),
        duration: cast.number(duration),
        durationType: cast.string(durationType),
        status: cast.string(status),
      };
    },
  });

  const isEditing = form.getValues().modalType === "edit";
  const isViewing = form.getValues().modalType === "view";
  const eligibilityPeriod = dayjs()
    .add(
      form.getTransformedValues().duration,
      form.getValues().durationType as ManipulateType,
    )
    .format(DATE_FORMAT);

  function handleSubmit() {
    const {
      streetName,
      houseNumber,
      houseTypeId,
      status,
      durationType,
      duration,
    } = form.getValues();

    const houseData = {
      streetName,
      houseNumber,
      houseTypeId,
      validityPeriod: `${duration} ${durationType}`,
      status,
    };

    const payload = {
      houses: [houseData],
      estateId,
    };

    isEditing
      ? updateHouse({ id: toString(data?.id), data: houseData })
      : addHouse(payload);
  }

  useEffect(() => {
    if (!data) return;
    const { houseNumber, houseType, streetName, status, validityPeriod } = data;

    form.initialize({
      houseNumber: pass.string(houseNumber),
      houseTypeId: pass.string(houseType?.id),
      streetName: pass.string(streetName),
      status: pass.string(status),
      duration: pass.string(validityPeriod.split(" ")[0]),
      durationType: "months",
      modalType,
    });
  }, [data]);

  return (
    <Form form={form}>
      <FlowContainer
        className="rounded-2xl bg-primary-background-white"
        justify="center"
        gap={18}
        type="plain"
        bg="white"
      >
        <TextInput
          label="Street Name"
          disabled={isViewing}
          withAsterisk
          classNames={{
            input: clsx({ skeleton: modalType !== "add" && isLoading }),
          }}
          {...form.getInputProps("streetName")}
        />
        <TextInput
          label="House Number"
          disabled={isViewing}
          withAsterisk
          classNames={{
            input: clsx({ skeleton: modalType !== "add" && isLoading }),
          }}
          {...form.getInputProps("houseNumber")}
        />
        <Select
          data={houseTypes}
          label="House Type"
          nothingFoundMessage="No house types found"
          disabled={isViewing || (modalType !== "add" && isLoading)}
          searchable
          withAsterisk
          {...form.getInputProps("houseTypeId")}
        />
        <Select
          label="Status"
          fz={14}
          disabled={isViewing || (modalType !== "add" && isLoading)}
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
          {...form.getInputProps("status")}
        />

        <Stack gap={12}>
          <Radio.Group
            name="duration"
            label="House Validity Period"
            description="Select the validity period for the house"
            withAsterisk
            {...form.getInputProps("durationType")}
          >
            <Group mt="xs">
              <Radio
                value="months"
                label="Month"
                variant="outline"
                disabled={isViewing}
              />
              <Radio
                value="years"
                label="Year"
                variant="outline"
                disabled={isViewing}
              />
            </Group>
          </Radio.Group>
          <TextInput
            type="number"
            disabled={isViewing}
            withAsterisk
            min={1}
            placeholder={`Enter the validity period in ${
              form.getValues().durationType
            }`}
            classNames={{
              input: clsx({ skeleton: modalType !== "add" && isLoading }),
            }}
            {...form.getInputProps("duration")}
          />

          {form.getValues().duration && !form.errors.duration && (
            <Text
              fz={14}
              c="yellow.8"
              children={`Eligibility ends on ${eligibilityPeriod}`}
            />
          )}
        </Stack>

        {isViewing ? (
          <Button
            mt={10}
            type="button"
            onClick={() => form.setValues({ modalType: "edit" })}
          >
            Edit
          </Button>
        ) : (
          <Button
            mt={10}
            type="button"
            loading={isAdding || isUpdating}
            disabled={isAdding || isUpdating}
            onClick={handleSubmit}
          >
            {isEditing ? "Save Changes" : "Add New House"}
          </Button>
        )}
      </FlowContainer>
    </Form>
  );
}
