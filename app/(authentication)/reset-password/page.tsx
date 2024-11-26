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
  email: string().email("Invalid email address"),
  // email: string()
  //   .email("Invalid email address")
  //   .when("reset_password", {
  //     is: false,
  //     then: (schema) => schema.notRequired(),
  //     otherwise: (schema) => schema.required("Email is required"),
  //   }),
  password: string().when("reset_password", {
    is: false,
    then: (schema) => schema.notRequired(),
    otherwise: (schema) =>
      schema
        .required("Password is required")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%.^&*])[A-Za-z\d!@#$%.^&*]{6,}$/,
          "Password is not strong enough, please include at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character"
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
