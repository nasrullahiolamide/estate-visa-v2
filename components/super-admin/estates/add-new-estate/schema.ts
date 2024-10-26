import { array, object, string } from "yup";

export const schema = object({
  estate_name: string().required(),
});
