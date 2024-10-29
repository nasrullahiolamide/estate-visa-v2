"use client";

import Link from "next/link";
import { getCookie } from "cookies-next";
import { boolean, object } from "yup";
import { Form, useForm, yupResolver } from "@mantine/form";
import {
  Button,
  Text,
  Stack,
  TextInput,
  PasswordInput,
  Box,
} from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { navigate } from "@/packages/actions";
import { handleError, handleSuccess } from "@/packages/notification";
import { APP, handleLogin, PAGES, USER_TYPE } from "@/packages/libraries";
import { Admins, LoginResponseData } from "@/builders/types/login";
import { builder } from "@/builders";
import { requiredString } from "@/builders/types/shared";

const schema = object({
  email: requiredString.email(
    "Invalid email. Please enter a valid email address."
  ),
  password: requiredString.min(6, "Password must be at least 6 characters."),
  remember_me: boolean().notRequired(),
});

export default function Page() {
  const email = getCookie(APP.EMAIL) ?? "";
  const form = useForm({
    initialValues: {
      email,
      password: "",
    },
    validate: yupResolver(schema),
    validateInputOnBlur: true,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: builder.use().auth.login,
    onSuccess: ({ data }) => {
      function loginCallback(data: LoginResponseData) {
        const { access_token, user } = { ...data };
        const user_type = user.roles[0].name;
        const isValidAdmin = Admins.includes(user_type);

        if (!isValidAdmin) {
          handleError({
            message:
              "You are not yet authorized, please contact your administrator.",
          })();
          return;
        }

        handleLogin({
          access_token,
          user_type,
          email,
          ...user,
        });
        navigate(PAGES.DASHBOARD);
        handleSuccess({ message: `Welcome back, ${user.firstname}` });
      }

      if (data) loginCallback(data);
    },
    onError: handleError(),
  });

  function handleSubmit(values: typeof form.values) {
    mutate(values);
  }

  return (
    <Stack gap={24} justify='stretch' flex={1}>
      <h2 className='font-medium text-2xl text-center'>
        Sign in to your Estate Visa account
      </h2>
      <Box component={Form} form={form} onSubmit={handleSubmit} w='100%'>
        <Stack gap={24}>
          <TextInput
            placeholder='user@example.com'
            label='Email address'
            type='email'
            {...form.getInputProps("email")}
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
                  href='/forgot-password'
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
