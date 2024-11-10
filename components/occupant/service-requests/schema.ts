import { array, object, string } from "yup";

const requiredString = string().required("This is a required field");

export const schema = object({});
