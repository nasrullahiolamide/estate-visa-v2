import { AdminUpdateData } from "@/builders/types/profile";
import { createFormContext } from "@mantine/form";

interface FormValues {
  estate_name: string;
  fullname: string;
  email: string;
  phone: string;
  password: string;
  confirm_password: string;
}

type TransformFormValues = (values: FormValues) => AdminUpdateData;

const [FormProvider, useFormContext, useForm] = createFormContext<
  FormValues,
  TransformFormValues
>();

export { FormProvider, useForm, useFormContext };
