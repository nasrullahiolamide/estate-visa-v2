import { number, object, string } from "yup";

const requiredString = string().required(
  "This field is required. Please enter the necessary information."
);

export const schema = object({
  streetName: requiredString,
  houseNumber: requiredString,
  houseTypeId: requiredString,
  status: requiredString,
  duration: number().when("durationType", {
    is: "months",
    then: (schema) =>
      schema
        .required("This field is required. Please enter the duration.")
        .min(2, "Duration must be at least 2 months")
        .max(120, "Duration cannot exceed 120 months"),
    otherwise: (schema) =>
      schema
        .required("This field is required. Please enter the duration.")
        .min(1, "Duration must be at least 1 year")
        .max(10, "Duration cannot exceed 10 years"),
  }),
});
