import { requiredString } from "@/builders/types/shared";
import { number, object, ref } from "yup";

export const profileDetailsSchema = object({
  fullname: requiredString,
  phone: requiredString,
  email: requiredString.email(
    "Invalid email. Please enter a valid email address."
  ),
  thumbnail_id: number().required("Thumbnail is required, please upload one"),
});

export const passwordSchema = object({
  curr_password: requiredString,
  new_password: requiredString.min(6, "Password must be at least 8 characters"),
  confirm_password: requiredString.oneOf(
    [ref("new_password")],
    "Your new password and confirm password do not match"
  ),
});
