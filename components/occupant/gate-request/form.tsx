"use client";

import {
  Button,
  Popover,
  PopoverDropdown,
  PopoverTarget,
  Select,
  TextInput,
} from "@mantine/core";
import { Form, useForm, yupResolver } from "@mantine/form";
import { modals } from "@mantine/modals";

import { getCookie } from "cookies-next";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { builder } from "@/builders";
import {
  GateRequestData,
  UpdateGateRequestData,
} from "@/builders/types/gate-requests";
import { APP, cast, MODALS } from "@/packages/libraries";
import { handleSuccess, handleError } from "@/packages/notification";
import { FlowContainer } from "@/components/layout/flow-container";

import { schema } from "./schema";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import { CalenderIcon, ClockIcon } from "@/icons";
import { useRef, useState } from "react";

import Timekeeper from "react-timekeeper";
import { TimePickerInput } from "@/components/shared/interface";

export type GateRequestFormProps = {
  data?: GateRequestData;
  modalType: "add" | "edit" | "view";
};
export function GateRequestForm({
  data,
  modalType = "view",
}: GateRequestFormProps) {
  const occupantId = getCookie(APP.OCCUPANT_ID) ?? "";
  const requestId = data?.id;
  const queryClient = useQueryClient();

  const { mutate: addRequest, isPending } = useMutation({
    mutationFn: builder.use().gates.requests.post,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: builder.gates.requests.get.get(),
      });
      modals.close(MODALS.FORM_DETAILS);
      handleSuccess({
        message: "Gate Request Added Successfully",
      });
    },
    onError: handleError(),
  });

  const { mutate: updateRequest, isPending: isUpdating } = useMutation({
    mutationFn: builder.use().gates.requests.edit,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: builder.gates.requests.get.get(),
      });
      modals.close(MODALS.FORM_DETAILS);
      handleSuccess({
        message: "Gate Request Updated Successfully",
      });
    },
    onError: handleError(),
  });

  console.log(data);
  const form = useForm({
    initialValues: {
      guestName: data?.guestName ?? "",
      guestType: data?.guestType ?? "Friend",
      phoneNo: data?.phoneNo ?? "",
      visitDate: data?.visitDate ?? new Date(),
      visitTime: data?.visitTime ?? "",
      modalType,
      occupantId,
    },
    validate: yupResolver(schema),
    validateInputOnBlur: true,
    transformValues: (values) => {
      return {
        ...values,
        visitDate: cast.string(values.visitDate),
        visitTime: cast.string(values.visitTime),
      };
    },
  });

  const isEditing = form.getValues().modalType === "edit";
  const isViewing = form.getValues().modalType === "view";

  const handleSubmit = (values: Omit<UpdateGateRequestData, "modalType">) => {
    if (isViewing) return;

    isEditing
      ? updateRequest({ id: requestId ?? "", data: values })
      : addRequest(values);
  };

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
          label='Guest Name'
          placeholder="Enter guest's name"
          disabled={isViewing}
          withAsterisk
          {...form.getInputProps("guestName")}
        />
        <Select
          data={["Friend", "Family", "Worker"]}
          label='Guest Type'
          disabled={isViewing}
          withAsterisk
          {...form.getInputProps("guestType")}
        />
        <TextInput
          label='Phone Number'
          placeholder="Enter guest's phone number"
          disabled={isViewing}
          withAsterisk
          {...form.getInputProps("phoneNo")}
        />

        <DatePickerInput
          label='Date of Visit'
          minDate={new Date()}
          disabled={isViewing}
          valueFormat='DD/MM/YYYY'
          withAsterisk
          {...form.getInputProps("visitDate")}
        />
        <TimePickerInput
          label='Time of Visit'
          withAsterisk
          {...form.getInputProps("visitTime")}
        />
        {isViewing ? (
          <Button
            mt={10}
            type='button'
            onClick={() => form.setValues({ modalType: "edit" })}
          >
            Edit
          </Button>
        ) : isEditing ? (
          <Button
            mt={10}
            type='submit'
            loading={isUpdating}
            disabled={isUpdating}
          >
            Update Request
          </Button>
        ) : (
          <Button
            mt={10}
            type='submit'
            loading={isPending}
            disabled={isPending}
          >
            Generate Request
          </Button>
        )}
      </FlowContainer>
    </Form>
  );
}
