"use client";

import {
  Button,
  PasswordInput,
  Select,
  Stack,
  TextInput,
  Text,
} from "@mantine/core";
import { Form, useForm, yupResolver } from "@mantine/form";
import { modals } from "@mantine/modals";
import { getCookie } from "cookies-next";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { APP, decryptUri, MODALS } from "@/packages/libraries";
import { handleSuccess, handleError } from "@/packages/notification";
import { builder } from "@/builders";
import { GatesData } from "@/builders/types/gates";
import { ProfileData } from "@/builders/types/profile";
import { FlowContainer } from "@/components/layout/flow-container";

import { schema } from "./schema";

export type GatesFormProps = {
  data?: GatesData;
  modalType: "add" | "edit" | "view";
};
export function GateForm({
  data,
  modalType: formType = "view",
}: GatesFormProps) {
  const queryClient = useQueryClient();
  const {
    estate: { id: estateId, name: estateName },
  }: ProfileData = decryptUri(getCookie(APP.USER_DATA));

  // Add gate mutation
  const { mutate: addGate, isPending } = useMutation({
    mutationFn: builder.use().gates.post,
    onSuccess: ({ username }) => {
      queryClient.invalidateQueries({
        queryKey: builder.gates.get.get(),
      });
      modals.close(MODALS.FORM_DETAILS);
      handleSuccess({
        message: (
          <p>
            Gate <strong>{username}</strong> added successfully!
          </p>
        ),
      });
    },
    onError: handleError(),
  });

  // Update gate mutation
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
      password: data?.password ?? "",
      modalType: formType,
    },
    validate: yupResolver(schema),
    validateInputOnBlur: true,
  });

  const handleSubmit = () => {
    const { name, location, status, password } = form.getValues();
    const updatedData = {
      name,
      password,
      location,
      status,
      estateId,
    };
    isEditing
      ? updateGate({ id: data?.id ?? "", data: updatedData })
      : addGate(updatedData);
  };

  const { name, modalType } = form.getValues();
  const formattedName = name.replace(/\s+/g, "-");
  const formattedEstateName = estateName.replace(/\s+/g, "-");
  const gateUsername = `${formattedName}-${formattedEstateName}`.toLowerCase();

  const isEditing = modalType === "edit";
  const isViewing = modalType === "view";

  return (
    <Form form={form} onSubmit={handleSubmit}>
      <FlowContainer
        className='rounded-2xl bg-primary-background-white'
        justify='center'
        gap={18}
        type='plain'
        bg='white'
      >
        <Stack gap={0}>
          <TextInput
            label='Gate Name'
            placeholder="Enter the gate's name"
            disabled={isViewing}
            withAsterisk
            {...form.getInputProps("name")}
          />
          {name && (
            <Text fz={14} c='yellow.8' mt={5}>
              Gate username {isViewing ? "is" : "will be"}{" "}
              <strong>{gateUsername}</strong>
            </Text>
          )}
        </Stack>
        <Stack gap={0}>
          <PasswordInput
            label='Gate Password'
            placeholder='********'
            disabled={isViewing}
            withAsterisk
            {...form.getInputProps("password")}
          />
          {!form.errors.password && (
            <Text fz={14} c='yellow.8' mt={5}>
              This is the password required to approve gate requests
            </Text>
          )}
        </Stack>
        <TextInput
          label='Gate Location'
          placeholder="Enter the gate's location"
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
