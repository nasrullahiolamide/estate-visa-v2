"use client";

import Link from "next/link";

import { Form } from "@mantine/form";
import { useFormContext } from "./form-context";

import { PAGES } from "@/packages/libraries";
import { Box, Button, Stack, TextInput } from "@mantine/core";
import { builder } from "@/builders";
import { handleError, handleSuccess } from "@/packages/notification";
import { useMutation } from "@tanstack/react-query";

export function RequestTOKEN() {
  const form = useFormContext();

  const { mutate, isPending } = useMutation({
    mutationFn: builder.$use.auth.password.forgot,
    onError: handleError(),
    onSuccess: ({ data }) => {
      handleSuccess({
        message: "A password reset link has been sent to your email address.",
      });
      form.reset();
    },
  });

  function handleSubmit({ email }: typeof form.values) {
    mutate({ email });
  }

  return (
    <Stack data-aos="fade-left" gap={8}>
      <Stack gap={8} className="text-primary-text-body text-center">
        <h2 className="font-medium text-2xl">Forgot Password?</h2>
        <p className="text-sm sm:text-base">
          Enter your email address and we'll send you a link to reset your
          password.
        </p>
      </Stack>
      <Box
        component={Form}
        form={form}
        onSubmit={handleSubmit}
        w="100%"
        mt={15}
      >
        <Stack gap={25}>
          <TextInput
            label="Email address"
            type="email"
            placeholder="user@example.com"
            {...form.getInputProps("email")}
          />
          <Button
            mt={20}
            type="submit"
            loading={isPending}
            disabled={isPending}
            className="text-primary-button-surface"
          >
            Email password reset link
          </Button>
        </Stack>
      </Box>

      <Stack gap={8} className="text-primary-text-body text-center">
        <p className="text-sm sm:text-base">
          Remember your password?{" "}
          <Link href={PAGES.LOGIN} className="text-accent-10">
            Sign in
          </Link>
        </p>
      </Stack>
    </Stack>
  );
}
