"use client";

import { Button, PasswordInput } from "@mantine/core";
import { Form, useForm, yupResolver } from "@mantine/form";
import { modals } from "@mantine/modals";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleSuccess, handleError } from "@/packages/notification";
import { builder } from "@/builders";
import { FlowContainer } from "@/components/layout/flow-container";
import { object, ref } from "yup";
import { requiredString } from "@/builders/types/shared";
import { MODALS } from "@/packages/libraries";

export const schema = object({
  password: requiredString,
  confirm_password: requiredString.oneOf(
    [ref("password")],
    "Passwords do not match"
  ),
});

export function ChangePassword() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: builder.use().gates.edit,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: builder.gates.get.get(),
      });
      modals.close(MODALS.CHANGE_PASSWORD);
      handleSuccess({
        message: "Gate Updated Successfully",
      });
    },
    onError: handleError(),
  });

  const form = useForm({
    initialValues: {
      password: "",
      confirm_password: "",
    },
    validate: yupResolver(schema),
    validateInputOnBlur: true,
  });

  function handleSubmit(values: typeof form.values) {
    console.log(values);
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
        <PasswordInput
          label='New Password'
          placeholder='********'
          withAsterisk
          {...form.getInputProps("password")}
        />
        <PasswordInput
          label='Confirm Password'
          placeholder='********'
          withAsterisk
          {...form.getInputProps("confirm_password")}
        />
        <Button mt={10} type='submit' loading={isPending} disabled={isPending}>
          Save Changes
        </Button>
      </FlowContainer>
    </Form>
  );
}
