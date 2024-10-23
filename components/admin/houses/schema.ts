import { object, string } from "yup";

const requiredString = string().required(
  "This field is required. Please enter the necessary information."
);

export const schema = object({
  street_name: requiredString,
  house_no: requiredString,
  house_type: requiredString,
  status: requiredString,
  validity_period: requiredString,
});
