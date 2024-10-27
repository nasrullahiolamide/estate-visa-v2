import { requiredString } from "@/builders/types/shared";
import { object, string } from "yup";

export const addSchema = object({
  title: requiredString,
  no_of_attendees: requiredString,
});
