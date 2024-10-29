import { requiredString } from "@/builders/types/shared";
import { number, object, ref } from "yup";

export const schema = object({
  full_name: requiredString,
  phone: requiredString,
  email: requiredString.email(
    "Invalid email. Please enter a valid email address."
  ),
  password: requiredString,
  confirm_password: requiredString.oneOf(
    [ref("password")],
    "Passwords must match"
  ),
  thumbnail_id: number().required("Thumbnail is required, please upload one"),
});
