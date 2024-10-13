"use client";

import { APP } from "@/packages/libraries";
import { Stack } from "@mantine/core";
import { yupResolver } from "@mantine/form";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { object, ref, string } from "yup";

// import { builder } from "@/builders";
import {
  FormProvider,
  useForm,
} from "@/components/admin/user-management/forgot-password/password-reset-form-context";
import { RequestOTP } from "@/components/admin/user-management/forgot-password/request-otp";
// import { ResetPassword } from "@/components/admin/forgot-password/reset-password";

const schema = object({
  email: string().email("Invalid email address").required("Email is required"),
  otp: string().when("reset_password", {
    is: false,
    then: (schema) => schema.notRequired(),
    otherwise: (schema) => schema.required("OTP is required"),
  }),
  password: string().when("reset_password", {
    is: false,
    then: (schema) => schema.notRequired(),
    otherwise: (schema) => schema.required("Password is required"),
  }),
  confirm_password: string()
    .oneOf([ref("password")], "Passwords must match")
    .when("reset_password", {
      is: false,
      then: (schema) => schema.notRequired(),
      otherwise: (schema) => schema.required("Please confirm your password"),
    }),
});

type PageProps = {
  params: {
    unique_link: string;
  };
};

export default function Page({}: PageProps) {
  const email = getCookie(APP.EMAIL) || "";

  const form = useForm({
    initialValues: {
      email,
      otp: "",
      password: "",
      confirm_password: "",
      reset_password: false,
    },
    validate: yupResolver(schema),
    validateInputOnBlur: true,
  });

  return (
    <Stack gap={56} flex={1}>
      <FormProvider form={form}>
        <RequestOTP />

        {/* {form.values.reset_password ? <ResetPassword /> : <RequestOTP />} */}
      </FormProvider>
    </Stack>
  );
}
