import { requiredString } from "@/builders/types/shared";
import { number, object } from "yup";

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
        .min(1, "Duration must be at least 2 months")
        .max(24, "Duration cannot exceed 120 months"),
    otherwise: (schema) =>
      schema
        .required("This field is required. Please enter the duration.")
        .min(1, "Duration must be at least 1 year")
        .max(2, "Duration cannot exceed 10 years"),
  }),
});
