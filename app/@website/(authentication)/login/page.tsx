"use client";

import Link from "next/link";
import { getCookie } from "cookies-next";
import { boolean, object, string } from "yup";
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
import { handleError } from "@/packages/notification";
import { APP, handleLogin, PAGES, USER_TYPE } from "@/packages/libraries";
import { LoginResponseData } from "@/builders/types/login";
import { builder } from "@/builders";

const schema = object({
  username: string()
    .email("Invalid email address")
    .required("Email is required"),
  password: string().required("Password is required"),
  remember_me: boolean().notRequired(),
});

// TODO: Delete later
const userType: Record<PropertyKey, USER_TYPE> = {
  ["admin@estatevisa.com"]: USER_TYPE.ADMIN,
  ["superadmin@estatevisa.com"]: USER_TYPE.SUPER_ADMIN,
};

const access_token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
    .eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ
    .SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c;`;

export default function Page() {
  const username = getCookie(APP.EMAIL) ?? "";
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
    onSuccess: (payload) => {
      const { data, message } = payload;

      function loginCallback(data: LoginResponseData) {
        const { access_token, user_type } = data;

        if (
          user_type === USER_TYPE.ADMIN ||
          user_type === USER_TYPE.SUPER_ADMIN
        ) {
          handleLogin({
            access_token,
            user_type,
          });

          navigate(PAGES.DASHBOARD);
        } else {
          handleError({
            message,
          })();
        }
      }

      if (data) loginCallback(data);
    },
    onError: handleError(),
  });

  handleError({
    message: "Invalid email address",
  });

  function handleSubmit(values: typeof form.values) {
    // mutate(values, {});

    if (
      values.username !== "admin@estatevisa.com" &&
      values.username !== "superadmin@estatevisa.com"
    ) {
      console.log("Invalid email address");
      handleError({
        message: "Invalid email address",
      });
      return;
    }

    handleLogin({
      ...values,
      access_token,
      user_type: userType[values.username],
    });
    navigate(PAGES.DASHBOARD);
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
            {...form.getInputProps("username")}
          />
          <PasswordInput
            placeholder='**********'
            styles={{
              label: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
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
          >
            Sign in
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
}
