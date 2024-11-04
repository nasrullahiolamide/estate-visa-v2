import { object, string } from "yup";

const requiredString = string().required(
  "This field is required. Please enter the necessary information."
);

export const schema = object({
  streetName: requiredString,
  houseNumber: requiredString,
  houseTypeId: requiredString,
  status: requiredString,
  validityPeriod: requiredString,
});
