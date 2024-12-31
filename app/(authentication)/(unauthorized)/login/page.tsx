"use client";

import { builder } from "@/builders";
import { AvailableDashboards, LoginResponseData } from "@/builders/types/login";
import { requiredString } from "@/builders/types/shared";
import { navigate } from "@/packages/actions";
import { APP, handleLogin, PAGES } from "@/packages/libraries";
import { handleError, handleSuccess } from "@/packages/notification";
import {
  Box,
  Button,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { Form, useForm, yupResolver } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { toString } from "lodash";
import { useSearchParams } from "next/navigation";
import { Fragment, useEffect } from "react";
import { boolean, object } from "yup";

import Link from "next/link";

const schema = object({
  username: requiredString,
  password: requiredString,
  remember_me: boolean().notRequired(),
});

export default function Page() {
  const sessionStatus = useSearchParams().get("session");
  const username = toString(getCookie(APP.USERNAME));

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
    transformValues: (values) => ({
      ...values,
      username: values.username.toLowerCase(),
    }),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: builder.$use.auth.login,
    onSuccess: ({ data }) => {
      function loginCallback(data: LoginResponseData) {
        const { user } = { ...data };
        const user_type = user.roles[0].name;
        const isDashboardAvailable = AvailableDashboards.includes(user_type);

        if (!isDashboardAvailable) {
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
        navigate(user.isOnboarded ? PAGES.DASHBOARD : PAGES.ONBOARDING);
        handleSuccess({ message: "You have successfully logged in." });
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
    <Stack gap={24} justify="stretch" flex={1}>
      <h2 className="font-medium text-2xl text-center">
        Sign in to your Estate Visa account
      </h2>
      <Box component={Form} form={form} onSubmit={handleSubmit} w="100%">
        <Stack gap={24}>
          <TextInput
            placeholder="Email Address or Gate Username"
            label="Username"
            {...form.getInputProps("username")}
          />
          <PasswordInput
            placeholder="**********"
            styles={{
              label: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              },
            }}
            label={
              <Fragment>
                <span>Password</span>
                <Text
                  c="accent.6"
                  component={Link}
                  href={PAGES.RESET_PASSWORD}
                  fz="sm"
                >
                  Forgot password?
                </Text>
              </Fragment>
            }
            type="password"
            {...form.getInputProps("password")}
          />
          <Button
            loading={isPending}
            disabled={isPending}
            type="submit"
            mt="auto"
            className="disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sign in
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
}
