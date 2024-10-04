"use client";

import Link from "next/link";
import { getCookie, setCookie } from "cookies-next";
import { boolean, object, string } from "yup";
import { Form, useForm, yupResolver } from "@mantine/form";

import {
  Button,
  Text,
  Stack,
  TextInput,
  PasswordInput,
  Checkbox,
  Box,
} from "@mantine/core";
import { APP } from "@/packages/libraries";
import { useMutation } from "@tanstack/react-query";

const schema = object({
  username: string()
    .email("Invalid email address")
    .required("Email is required"),
  password: string().required("Password is required"),
  remember_me: boolean().notRequired(),
});

export default function Page() {
  const username = getCookie(APP.EMAIL) ?? "";
  const form = useForm({
    initialValues: {
      username,
      password: "",
      remember_me: false,
    },
    validate: yupResolver(schema),
    validateInputOnBlur: true,
  });

  const { mutate, isPending } = useMutation({});

  function handleSubmit({ remember_me, ...values }: typeof form.values) {
    // mutate(values, {
    //   onSettled: () => {
    //     if (remember_me) {
    //       setCookie("eMail", values.username, {
    //         maxAge: 60 * 60 * 24 * 365,
    //       });
    //     }
    //   },
    // });

    console.log({ remember_me, ...values });
  }

  return (
    <Stack gap={30} justify='stretch' flex={1}>
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
          <Button mt='auto'>Sign in</Button>
        </Stack>
      </Box>
    </Stack>
  );
}
