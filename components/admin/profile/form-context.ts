import { createFormContext } from "@mantine/form";

export interface FormValues {
  fullname: string;
  email: string;
  username: string;
  estatename: string;
  phone: string;
  picture: string;
}

export type TransformFormValues = (values: FormValues) => FormValues;

const [FormProvider, useFormContext, useForm] = createFormContext<
  FormValues,
  TransformFormValues
>();

export { FormProvider, useForm, useFormContext };
