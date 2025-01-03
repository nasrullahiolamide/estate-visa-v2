"use client";

import { builder } from "@/builders";
import { requiredString } from "@/builders/types/shared";
import { FlowContainer } from "@/components/layout/flow-container";
import { MODALS } from "@/packages/libraries";
import { handleError, handleSuccess } from "@/packages/notification";
import { Button, PasswordInput } from "@mantine/core";
import { Form, useForm, yupResolver } from "@mantine/form";
import { modals } from "@mantine/modals";
import { useMutation } from "@tanstack/react-query";
import { object, ref } from "yup";

export const schema = object({
  password: requiredString,
  confirm_password: requiredString.oneOf(
    [ref("password")],
    "Passwords do not match"
  ),
});

export function ChangePassword({ userId }: { userId: string }) {
  const { mutate, isPending } = useMutation({
    mutationFn: builder.$use.account.profile.change_password,
    onSuccess: () => {
      modals.close(MODALS.CHANGE_PASSWORD);
      handleSuccess("Password updated successfully", { autoClose: 1500 });
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

  function handleSubmit({ password }: typeof form.values) {
    mutate({
      id: userId,
      data: {
        password,
      },
    });
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
