import { requiredString } from "@/builders/types/shared";
import { object, string } from "yup";

export const schema = object({
  houseId: requiredString,
  fullname: requiredString,
  email: requiredString.email(
    "Invalid email. Please enter a valid email address.",
  ),
  phone: requiredString,
  status: string().required("Please select the status of the occupant."),
});
