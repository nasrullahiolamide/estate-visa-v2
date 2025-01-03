"use client";

import { builder } from "@/builders";
import { GateRequestData } from "@/builders/types/gate-requests";
import { FlowPhoneInput } from "@/components/layout";
import { FlowContainer } from "@/components/layout/flow-container";
import { TimePickerInput } from "@/components/shared/interface";
import { RELATIONSHIP_OPTIONS } from "@/packages/constants/data";
import { DATE_FORMAT, TIME_FORMAT } from "@/packages/constants/time";
import { APP, cast, formatDate, MODALS } from "@/packages/libraries";
import { handleError, handleSuccess } from "@/packages/notification";
import { Button, Select, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { Form, useForm, yupResolver } from "@mantine/form";
import { modals } from "@mantine/modals";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { handleShare } from "./actions";
import { schema } from "./schema";

import dayjs from "dayjs";

export type GateRequestFormProps = {
  data?: GateRequestData;
  modalType: "add" | "edit" | "view";
};

export function GateRequestForm({
  data,
  modalType = "view",
}: GateRequestFormProps) {
  const occupantId = getCookie(APP.OCCUPANT_ID) ?? "";
  const queryClient = useQueryClient();

  const {
    id = "",
    guestName = "",
    guestType = "Friend",
    phoneNo = "",
    visitDate = dayjs().toDate(),
    visitTime = formatDate(dayjs().toDate().getTime(), TIME_FORMAT),
  } = { ...data };

  const { mutate: addRequest, isPending } = useMutation({
    mutationFn: builder.$use.gates.requests.post,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: builder.gates.requests.get.$get(),
      });
      modals.close(MODALS.FORM_DETAILS);
      handleShare(data);
    },
    onError: handleError(),
  });

  const { mutate: updateRequest, isPending: isUpdating } = useMutation({
    mutationFn: builder.$use.gates.requests.edit,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: builder.gates.requests.get.$get(),
      });
      modals.close(MODALS.FORM_DETAILS);
      handleSuccess("Gate Request Updated Successfully");
    },
    onError: handleError(),
  });

  const form = useForm({
    initialValues: {
      guestName,
      guestType,
      phoneNo,
      visitDate: dayjs(visitDate, DATE_FORMAT).toDate(),
      visitTime,
      modalType,
      occupantId,
    },
    validate: yupResolver(schema),
    validateInputOnBlur: true,
    transformValues: ({ visitTime, ...values }) => {
      return {
        ...values,
        visitTime: cast.string(visitTime),
      };
    },
  });

  const isEditing = form.getValues().modalType === "edit";
  const isViewing = form.getValues().modalType === "view";

  return (
    <Form form={form}>
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
          data={RELATIONSHIP_OPTIONS}
          label='Guest Type'
          disabled={isViewing}
          withAsterisk
          {...form.getInputProps("guestType")}
        />
        <FlowPhoneInput
          label='Phone Number'
          disabled={isViewing}
          withAsterisk
          {...form.getInputProps("phoneNo")}
        />

        <DatePickerInput
          label='Date of Visit'
          minDate={dayjs().toDate()}
          disabled={isViewing}
          valueFormat={DATE_FORMAT}
          withAsterisk
          {...form.getInputProps("visitDate")}
        />
        <TimePickerInput
          label='Time of Visit'
          withAsterisk
          disabled={isViewing}
          {...form.getInputProps("visitTime")}
        />
        {isViewing ? (
          <Button mt={10} onClick={() => form.setValues({ modalType: "edit" })}>
            Edit
          </Button>
        ) : isEditing ? (
          <Button
            mt={10}
            loading={isUpdating}
            disabled={isUpdating}
            onClick={() =>
              updateRequest({ id, data: form.getTransformedValues() })
            }
          >
            Update Request
          </Button>
        ) : (
          <Button
            mt={10}
            loading={isPending}
            disabled={isPending}
            onClick={() => addRequest(form.getTransformedValues())}
          >
            Generate Request
          </Button>
        )}
      </FlowContainer>
    </Form>
  );
}
