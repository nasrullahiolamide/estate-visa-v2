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

const schema = object({
  email: string().email("Invalid email address"),
  password: string().when("reset_password", {
    is: false,
    then: (schema) => schema.notRequired(),
    otherwise: (schema) =>
      schema
        .required("Password is required")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/\d/, "Password must contain at least one number")
        .matches(
          /[!@#$%.^&*]/,
          "Password must contain at least one special character"
        )
        .min(6, "Password must be at least 6 characters long"),
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
