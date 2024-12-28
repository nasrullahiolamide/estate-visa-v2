import { createFormContext } from "@mantine/form";

interface FormValues {
  fullname: string;
  email: string;
  username: string;
  estatename: string;
  phone: string;
  password: string;
  confirm_password: string;
}

type TransformFormValues = (values: FormValues) => FormValues;

const [FormProvider, useFormContext, useForm] = createFormContext<
  FormValues,
  TransformFormValues
>();

export { FormProvider, useForm, useFormContext };
