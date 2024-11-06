"use client";

import { Button, Select, TextInput } from "@mantine/core";
import { Form, useForm, yupResolver } from "@mantine/form";
import { modals } from "@mantine/modals";

import { getCookie } from "cookies-next";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { APP, decryptUri, MODALS } from "@/packages/libraries";
import { handleSuccess, handleError } from "@/packages/notification";
import { builder } from "@/builders";
import { ProfileData } from "@/builders/types/profile";
import { FlowContainer } from "@/components/layout/flow-container";

import { schema } from "./schema";
import { GatesData } from "@/builders/types/gates";

export type GatesFormProps = {
  data?: GatesData;
  modalType: "add" | "edit" | "view";
};
export function GateForm({ data, modalType = "view" }: GatesFormProps) {
  const userData: ProfileData = decryptUri(getCookie(APP.USER_DATA));
  const estateId = userData.estate.id;
  const queryClient = useQueryClient();

  const { mutate: addGate, isPending } = useMutation({
    mutationFn: builder.use().gates.post,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: builder.gates.get.get(),
      });
      modals.close(MODALS.FORM_DETAILS);
      handleSuccess({
        message: "Gate Added Successfully",
      });
    },
    onError: handleError(),
  });

  const { mutate: updateGate, isPending: isUpdating } = useMutation({
    mutationFn: builder.use().gates.edit,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: builder.gates.get.get(),
      });
      modals.closeAll();
      handleSuccess({
        message: "Gate Updated Successfully",
      });
    },
    onError: handleError(),
  });

  const form = useForm({
    initialValues: {
      name: data?.name ?? "",
      location: data?.location ?? "",
      status: data?.status ?? "open",
      modalType,
    },
    validate: yupResolver(schema),
    validateInputOnBlur: true,
  });

  const handleSubmit = () => {
    const { name, location, status } = form.getValues();
    const updatedData = {
      name,
      location,
      status,
      estateId,
    };

    if (isViewing) return;

    isEditing
      ? updateGate({ id: data?.id ?? "", data: updatedData })
      : addGate(updatedData);
  };

  const isEditing = form.getValues().modalType === "edit";
  const isViewing = form.getValues().modalType === "view";

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
          label='Gate Name'
          disabled={isViewing}
          withAsterisk
          {...form.getInputProps("name")}
        />
        <TextInput
          label='Gate Location'
          disabled={isViewing}
          withAsterisk
          {...form.getInputProps("location")}
        />
        <Select
          data={[
            {
              value: "open",
              label: "Open",
            },
            {
              value: "closed",
              label: "Closed",
            },
          ]}
          label='Gate Status'
          disabled={isViewing}
          withAsterisk
          {...form.getInputProps("status")}
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
            Save Changes
          </Button>
        ) : (
          <Button
            mt={10}
            type='submit'
            loading={isPending}
            disabled={isPending}
          >
            Add Gate
          </Button>
        )}
      </FlowContainer>
    </Form>
  );
}
