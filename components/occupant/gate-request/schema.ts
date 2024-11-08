import { object, string } from "yup";

const requiredString = string().required("This is a required field");

export const schema = object({
  guestName: requiredString,
  guestType: requiredString,
  phoneNo: requiredString,
  visitDate: requiredString,
  visitTime: requiredString,
});
