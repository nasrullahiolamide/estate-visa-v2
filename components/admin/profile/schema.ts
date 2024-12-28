import { requiredString } from "@/builders/types/shared";
import { object, ref } from "yup";

export const profileDetailsSchema = object({
  // fullname: requiredString,
  // phone: requiredString,
  // email: requiredString.email(
  //   "Invalid email. Please enter a valid email address."
  // ),
});

export const passwordSchema = object({
  oldPassword: requiredString,
  password: requiredString.min(6, "Password must be at least 6 characters"),
  confirm_password: requiredString.oneOf(
    [ref("password")],
    "Passwords do not match",
  ),
});
