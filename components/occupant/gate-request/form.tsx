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
  const requestId = data?.id;
  const queryClient = useQueryClient();

  const { mutate: addRequest, isPending } = useMutation({
    mutationFn: builder.$use.gates.requests.post,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: builder.gates.requests.get.$get(),
      });
      handleSuccess({
        message: "Gate Request Added Successfully",
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
      handleSuccess({
        message: "Gate Request Updated Successfully",
      });
    },
    onError: handleError(),
  });

  const form = useForm({
    initialValues: {
      guestName: data?.guestName ?? "",
      guestType: data?.guestType ?? "Friend",
      phoneNo: data?.phoneNo ?? "",
      visitDate:
        dayjs(data?.visitDate, DATE_FORMAT).toDate() ?? new Date().toString(),
      visitTime:
        data?.visitTime ?? formatDate(new Date().getTime(), TIME_FORMAT),
      modalType,
      occupantId,
    },
    validate: yupResolver(schema),
    validateInputOnBlur: true,
    transformValues: ({ visitDate, visitTime, ...values }) => {
      return {
        ...values,
        visitDate: dayjs(visitDate, DATE_FORMAT).toDate(),
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
          minDate={new Date()}
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
              updateRequest({ id: requestId ?? "", data: form.values })
            }
          >
            Update Request
          </Button>
        ) : (
          <Button
            mt={10}
            loading={isPending}
            disabled={isPending}
            onClick={() => addRequest(form.values)}
          >
            Generate Request
          </Button>
        )}
      </FlowContainer>
    </Form>
  );
}
