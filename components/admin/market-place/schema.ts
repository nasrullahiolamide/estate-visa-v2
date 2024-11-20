import { requiredString } from "@/builders/types/shared";
import { object } from "yup";

export const schema = object({
  name: requiredString,
  password: requiredString,
  location: requiredString,
  status: requiredString,
});
