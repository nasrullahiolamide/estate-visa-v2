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
import { HouseData } from "@/builders/types/houses";
import { APP, cast } from "@/packages/libraries";
import { handleSuccess, handleError } from "@/packages/notification";
import { FlowContainer } from "@/components/layout/flow-container";

import { schema } from "../schema";

export interface HouseFormProps {
  modalType: "add" | "edit" | "view";
  data?: HouseData;
}

export function HouseForm({ modalType = "add", data }: HouseFormProps) {
  const estateId = getCookie(APP.ESTATE_ID) ?? "";
  const queryClient = useQueryClient();

  const { mutate: addHouse, isPending: isAdding } = useMutation({
    mutationFn: builder.use().houses.post,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: builder.houses.list.table.get(),
      });
      modals.closeAll();
      handleSuccess({
        message: "House Added Successfully",
      });
    },
    onError: handleError(),
  });

  const { mutate: updateHouse, isPending: isUpdating } = useMutation({
    mutationFn: builder.use().houses.id.edit,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: builder.houses.list.table.get(),
      });
      modals.closeAll();
      handleSuccess({
        message: "House Updated Successfully",
      });
    },
    onError: handleError(),
  });

  const { data: houseTypes } = useQuery({
    queryKey: builder.estates.house_types.get.get(),
    queryFn: () => builder.use().estates.house_types.get(),
    select: (data) => {
      return data.map((type) => ({
        value: type.id,
        label: type.name,
      }));
    },
  });

  const form = useForm({
    initialValues: {
      houseNumber: data?.houseNumber ?? "",
      houseTypeId: data?.houseTypeId ?? "",
      streetName: data?.streetName ?? "",
      status: data?.status ?? "",
      duration: data?.validityPeriod ?? "",
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
  console.log(data);
  const eligibilityPeriod = dayjs()
    .add(
      form.getTransformedValues().duration,
      form.getValues().durationType as ManipulateType
    )
    .format("MMMM D, YYYY");

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
      ? updateHouse({ id: data?.id ?? "", data: houseData })
      : addHouse(payload);
  }

  return (
    <Form form={form} onSubmit={handleSubmit}>
      <FlowContainer
        className='rounded-2xl bg-primary-background-white'
        justify='center'
        gap={18}
        type='plain'
        bg='white'
      >
        <TextInput
          label='Street Name'
          disabled={isViewing}
          withAsterisk
          {...form.getInputProps("streetName")}
        />
        <TextInput
          label='House Number'
          disabled={isViewing}
          withAsterisk
          {...form.getInputProps("houseNumber")}
        />
        <Select
          data={houseTypes}
          label='House Type'
          nothingFoundMessage='No house types found'
          disabled={isViewing}
          withAsterisk
          {...form.getInputProps("houseTypeId")}
        />
        <Select
          label='Status'
          disabled={isViewing}
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
            name='duration'
            label='House Validity Period'
            description='Select the validity period for the house'
            withAsterisk
            {...form.getInputProps("durationType")}
          >
            <Group mt='xs'>
              <Radio
                value='months'
                label='Month'
                variant='outline'
                disabled={isViewing}
              />
              <Radio
                value='years'
                label='Year'
                variant='outline'
                disabled={isViewing}
              />
            </Group>
          </Radio.Group>
          <TextInput
            type='number'
            disabled={isViewing}
            withAsterisk
            placeholder={`Enter the validity period in ${
              form.getValues().durationType
            }`}
            {...form.getInputProps("duration")}
          />

          {form.getValues().duration && !form.errors.duration && (
            <Text
              fz={14}
              c='yellow.8'
              children={`Eligibility ends on ${eligibilityPeriod}`}
            />
          )}
        </Stack>

        {isViewing ? (
          <Button
            mt={10}
            type='button'
            onClick={() => form.setValues({ modalType: "edit" })}
          >
            Edit
          </Button>
        ) : (
          <Button
            mt={10}
            type='submit'
            loading={isAdding}
            disabled={isAdding}
            onSubmit={handleSubmit}
          >
            {isEditing ? "Save Changes" : "Add New House"}
          </Button>
        )}
      </FlowContainer>
    </Form>
  );
}
