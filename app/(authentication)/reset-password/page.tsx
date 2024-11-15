"use client";

import { APP } from "@/packages/libraries";
import { Stack } from "@mantine/core";
import { yupResolver } from "@mantine/form";
import { getCookie } from "cookies-next";
import { object, ref, string } from "yup";
import {
  FormProvider,
  useForm,
} from "@/components/shared/user-management/forgot-password/form-context";
import { RequestTOKEN } from "@/components/shared/user-management/forgot-password/request-token";
import { ResetPassword } from "@/components/shared/user-management/forgot-password/reset-password";
import { useSearchParams } from "next/navigation";
import { requiredString } from "@/builders/types/shared";

const schema = object({
  email: requiredString.email("Invalid email address"),
  // otp: string().when("reset_password", {
  //   is: false,
  //   then: (schema) => schema.notRequired(),
  //   otherwise: (schema) => schema.required("OTP is required"),
  // }),
  password: string().when("reset_password", {
    is: false,
    then: (schema) => schema.notRequired(),
    otherwise: (schema) =>
      schema
        .required("Password is required")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%.^&*])[A-Za-z\d!@#$%.^&*]{6,}$/,
          "Password must contain at least 6 characters, one uppercase, one lowercase, one number, and one special character (!@#$%.^&*)"
        ),
  }),
  confirm_password: string()
    .oneOf([ref("password")], "Passwords must match")
    .when("reset_password", {
      is: false,
      then: (schema) => schema.notRequired(),
      otherwise: (schema) => schema.required("Please confirm your password"),
    }),
});

export default function Page() {
  const email = getCookie(APP.USERNAME) || "";
  const params = useSearchParams();

  const token = params.get("token") ?? "";
  const userId = params.get("userId") ?? "";

  const form = useForm({
    initialValues: {
      email,
      token,
      password: "",
      confirm_password: "",
      reset_password: token ? true : false,
    },
    validate: yupResolver(schema),
    validateInputOnBlur: true,
  });

  return (
    <Stack gap={56} flex={1}>
      <FormProvider form={form}>
        {form.values.reset_password ? <ResetPassword /> : <RequestTOKEN />}
      </FormProvider>
    </Stack>
  );
}
