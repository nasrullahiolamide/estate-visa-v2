import { array, object, string } from "yup";

const requiredString = string().required("This is a required field");

export const schema = object({
  fullname: requiredString,
  phone: requiredString,
  email: requiredString.email(
    "Invalid email. Please enter a valid email address."
  ),
});
