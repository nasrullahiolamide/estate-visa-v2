import { object, string } from "yup";

const requiredString = string().required(
  "This field is required. Please enter the necessary information."
);

export const schema = object({
  fullname: requiredString,
  email: requiredString.email(
    "Invalid email. Please enter a valid email address."
  ),
  phone: requiredString,
});
