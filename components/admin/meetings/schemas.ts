import { object, string } from "yup";

const requiredString = string().required(
  "This field is required. Please enter the necessary information."
);

export const addSchema = object({
  title: requiredString,
  no_of_attendees: requiredString,
});
