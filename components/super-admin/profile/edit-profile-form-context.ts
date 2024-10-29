import { SuperAdminUpdateData } from "@/builders/types/super-admin";
import { createFormContext } from "@mantine/form";

interface FormValues {
  fullname: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  confirm_password: string;
}

type TransformFormValues = (values: FormValues) => SuperAdminUpdateData;

const [FormProvider, useFormContext, useForm] = createFormContext<
  FormValues,
  TransformFormValues
>();

export { FormProvider, useForm, useFormContext };
