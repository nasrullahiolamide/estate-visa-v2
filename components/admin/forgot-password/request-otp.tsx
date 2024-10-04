"use client";

import Link from "next/link";

import { Form } from "@mantine/form";
import { useFormContext } from "./password-reset-form-context";

// import { builder } from "@/packages";
import { PAGES } from "@/packages/libraries";
import { Box, Button, Stack, TextInput } from "@mantine/core";

export function RequestOTP() {
  const form = useFormContext();

  // const { mutate, isPending } = useMutation({
  //   mutationFn: builder.use().auth.password.forgot,
  //   onError: handleError(),
  //   onSuccess: ({ data }) => {
  //     AlertSuccess({
  //       text: "A password reset link has been sent to your email address.",
  //     });
  //     form.reset();
  //   },
  // });

  function handleSubmit({ email }: typeof form.values) {
    console.log({ email });
  }

  return (
    <Stack data-aos='fade-left'>
      <Stack gap={8} className='text-primary-text-body text-center'>
        <h2 className='font-medium text-2xl'>Forget Password?</h2>
        <p className='text-sm'>
          Enter your email address and we'll send you a link to reset your
          password.
        </p>
      </Stack>

      <Box
        component={Form}
        form={form}
        onSubmit={handleSubmit}
        w='100%'
        mt={15}
      >
        <Stack gap={32}>
          <TextInput
            label='Email address'
            type='email'
            placeholder='user@example.com'
            {...form.getInputProps("email")}
          />
          <Button
            type='submit'
            // loading={isPending}
            // disabled={isPending}
            className='text-primary-button-surface'
          >
            Email password reset link
          </Button>
        </Stack>
      </Box>

      <Stack gap={8} className='text-primary-text-body text-center'>
        <p className='text-base'>
          Remember your password?{" "}
          <Link href={PAGES.LOGIN} className='text-accent-10'>
            Sign in
          </Link>
        </p>
      </Stack>
    </Stack>
  );
}
