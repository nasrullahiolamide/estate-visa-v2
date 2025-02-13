"use client";

import { builder } from "@/builders";
import { navigate } from "@/packages/actions/navigate";
import { makePath, PAGES } from "@/packages/libraries";
import { handleError, handleSuccess } from "@/packages/notification";
import { Box, Button, PasswordInput, Stack } from "@mantine/core";
import { Form } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import { useFormContext } from "./form-context";

export function ResetPassword() {
  const form = useFormContext();

  const { mutate, isPending } = useMutation({
    mutationFn: builder.$use.auth.password.change,
    onError: handleError(),
    onSuccess: () => {
      handleSuccess("Your password has been reset successfully.");
      navigate(makePath(PAGES.LOGIN));
    },
  });

  function handleSubmit({ password, token }: typeof form.values) {
    const payload = {
      newPassword: password,
      token,
    };

    mutate(payload);
  }

  return (
    <Stack data-aos='fade-left' gap={8}>
      <Stack gap={8} className='text-primary-text-body text-center'>
        <h2 className='font-medium text-2xl'>Reset Password</h2>
        <p className='text-sm sm:text-base'>
          Enter your new password to reset your account.
        </p>
      </Stack>
      <Box
        component={Form}
        form={form}
        onSubmit={handleSubmit}
        w='100%'
        mt={15}
      >
        <Stack gap={25}>
          <PasswordInput
            id='password'
            label='New Password'
            type='password'
            placeholder='Enter your new password'
            {...form.getInputProps("password")}
          />
          <PasswordInput
            id='confirm_password'
            label='Confirm Password'
            type='password'
            placeholder='Re-enter your new password'
            {...form.getInputProps("confirm_password")}
          />
          <Button
            mt={10}
            type='submit'
            loading={isPending}
            disabled={isPending}
            className='text-primary-button-surface'
          >
            Save new password
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
}
