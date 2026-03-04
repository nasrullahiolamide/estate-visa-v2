import { requiredString } from "@/builders/types/shared";
import { object } from "yup";

export const schema = object({
  streetName: requiredString,
  houseNumber: requiredString,
  houseTypeId: requiredString,
  status: requiredString,
  validTill: requiredString,
});
