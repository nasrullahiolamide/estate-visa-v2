"use client";

import Link from "next/link";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { getCookie } from "cookies-next";
import { boolean, object } from "yup";
import { useMutation } from "@tanstack/react-query";
import { navigate } from "@/packages/actions";
import { handleError, handleSuccess } from "@/packages/notification";
import { APP, handleLogin, PAGES } from "@/packages/libraries";
import { builder } from "@/builders";
import { AvailableDashboards, LoginResponseData } from "@/builders/types/login";
import { requiredString } from "@/builders/types/shared";
import { Form, useForm, yupResolver } from "@mantine/form";
import {
  Button,
  Text,
  Stack,
  TextInput,
  PasswordInput,
  Box,
} from "@mantine/core";

const schema = object({
  username: requiredString.test(
    "email-or-gate-username",
    "This field must be a valid email or a gate-username.",
    (value) => {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const stringStringPattern = /^[a-zA-Z0-9_-]+-[a-zA-Z0-9 _-]+$/;

      return emailPattern.test(value) || stringStringPattern.test(value);
    }
  ),
  password: requiredString.min(6, "Password must be at least 6 characters."),

  remember_me: boolean().notRequired(),
});

export default function Page() {
  const sessionStatus = useSearchParams().get("session");
  const username = getCookie(APP.USERNAME) ?? "";

  useEffect(() => {
    if (sessionStatus === "expired") {
      handleError({
        message: "Your session has expired. Please sign in again.",
      })();
    }
  }, [sessionStatus]);

  const form = useForm({
    initialValues: {
      username,
      password: "",
    },
    validate: yupResolver(schema),
    validateInputOnBlur: true,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: builder.use().auth.login,
    onSuccess: ({ data }) => {
      function loginCallback(data: LoginResponseData) {
        const { user } = { ...data };
        const user_type = user.roles[0].name;
        const isValidAdmin = AvailableDashboards.includes(user_type);

        if (!isValidAdmin) {
          handleError({
            message:
              "There's no dashboard currently for your userType, please contact your administrator.",
          })();
          return;
        }
        handleLogin({
          user_type,
          ...data,
        });
        navigate(PAGES.DASHBOARD);
        handleSuccess({ message: `Welcome back, ${user.firstname}` });
      }

      if (data) loginCallback(data);
    },
    onError: handleError(),
  });

  function handleSubmit(values: typeof form.values) {
    const payload = {
      email: values.username,
      password: values.password,
    };

    mutate(payload);
  }

  return (
    <Stack gap={24} justify='stretch' flex={1}>
      <h2 className='font-medium text-2xl text-center'>
        Sign in to your Estate Visa account
      </h2>
      <Box component={Form} form={form} onSubmit={handleSubmit} w='100%'>
        <Stack gap={24}>
          <TextInput
            placeholder='Enter your email address or gate-username'
            label='Username'
            {...form.getInputProps("username")}
          />
          <PasswordInput
            placeholder='**********'
            styles={{
              label: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              },
            }}
            label={
              <>
                <span>Password</span>
                <Text
                  c='accent.6'
                  component={Link}
                  href={PAGES.RESET_PASSWORD}
                  fz='sm'
                >
                  Forgot password?
                </Text>
              </>
            }
            type='password'
            {...form.getInputProps("password")}
          />
          <Button
            loading={isPending}
            disabled={isPending}
            type='submit'
            mt='auto'
            className='disabled:opacity-50 disabled:cursor-not-allowed'
          >
            Sign in
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
}
