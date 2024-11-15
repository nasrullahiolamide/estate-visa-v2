import { requiredString } from "@/builders/types/shared";
import { array, object, string } from "yup";

export const schema = object({
  name: requiredString,
  location: requiredString,
  numberOfHouses: requiredString,
  owner: requiredString,
  username: requiredString,
  email: requiredString.email(
    "Invalid email. Please enter a valid email address."
  ),
  phone: requiredString,
  password: string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters."),
  houseTypes: array()
    .of(string())
    .min(1, "At least one house type is required."),
  serviceRequestTypes: array()
    .of(string())
    .min(1, "At least one service request is required."),
  interests: array()
    .of(string())
    .min(1, "At least one service type is required."),
});
