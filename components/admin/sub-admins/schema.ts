import { object, string } from "yup";

const requiredString = string().required(
  "This field is required. Please enter the necessary information."
);

export const schema = object({
  full_name: requiredString,
  email_address: requiredString.email(
    "Invalid email. Please enter a valid email address."
  ),
  phone_number: requiredString,
});
