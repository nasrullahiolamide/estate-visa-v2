import { createFormContext } from "@mantine/form";

export interface FormValues {
  fullname: string;
  email: string;
  username: string;
  phone: string;
  picture: string;
  estate_name?: string;
  house_number?: string;
}

export type TransformFormValues = (values: FormValues) => FormValues;

const [FormProvider, useFormContext, useForm] = createFormContext<
  FormValues,
  TransformFormValues
>();

export { FormProvider, useForm, useFormContext };
