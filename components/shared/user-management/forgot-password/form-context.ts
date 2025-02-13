import { createFormContext } from "@mantine/form";

interface FormValues {
  email: string;
  token: string;
  password: string;
  confirm_password: string;
  reset_password: boolean;
}

const [FormProvider, useFormContext, useForm] = createFormContext<FormValues>();
export { FormProvider, useForm, useFormContext };
