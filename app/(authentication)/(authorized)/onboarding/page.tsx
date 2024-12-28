"use client";

import { builder } from "@/builders";
import { navigate } from "@/packages/actions";
import { PAGES } from "@/packages/libraries";
import { handleError, handleSuccess } from "@/packages/notification";
import { Box, Button, Flex, PasswordInput, Stack, Text } from "@mantine/core";
import { Form, useForm, yupResolver } from "@mantine/form";

import { useMutation } from "@tanstack/react-query";
import Link from "next/link";

import { object, ref, string } from "yup";

const schema = object({
  password: string()
    .required("Password is required")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /[!@#$%.^&*]/,
      "Password must contain at least one special character",
    )
    .min(6, "Password must be at least 6 characters long"),

  confirm_password: string()
    .oneOf([ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

export default function Onboarding() {
  const form = useForm({
    initialValues: {
      password: "",
      confirm_password: "",
    },
    validate: yupResolver(schema),
    validateInputOnBlur: true,
  });

  const { isPending } = useMutation({
    mutationFn: builder.$use.account.profile.change_password,
    onError: handleError(),
    onSuccess: () => {
      handleSuccess({
        message: "",
      });
      navigate(PAGES.DASHBOARD);
    },
  });

  function handleSubmit({ password }: typeof form.values) {
    const payload = {
      password,
      oldPassword: "",
    };
  }

  return (
    <Stack gap={40}>
      <Stack gap={8} justify="center" align="center">
        <h2 className="text-2xl font-medium text-center text-primary-text-body">
          Let&apos;s get you onboarded
        </h2>
        <Text className="text-sm text-center text-primary-text-body">
          Please change your password to continue.
        </Text>
      </Stack>

      <Box component={Form} form={form} onSubmit={handleSubmit} w="100%">
        <Stack gap={8}>
          <Stack gap={25}>
            <PasswordInput
              id="password"
              label="New Password"
              type="password"
              placeholder="Enter your new password"
              {...form.getInputProps("password")}
            />
            <PasswordInput
              id="confirm_password"
              label="Confirm Password"
              type="password"
              placeholder="Re-enter your new password"
              {...form.getInputProps("confirm_password")}
            />
            <Flex gap={15} mt={20}>
              <Button
                variant="outline"
                flex={1}
                component={Link}
                href={PAGES.DASHBOARD}
              >
                Skip for now
              </Button>
              <Button
                type="submit"
                loading={isPending}
                disabled={isPending}
                className="text-primary-button-surface"
                flex={1}
              >
                Save new password
              </Button>
            </Flex>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
}
