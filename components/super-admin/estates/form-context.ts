import { createFormContext } from "@mantine/form";

export type FormValues = {
  name: string;
  location: string;
  numberOfHouses: string;
  owner: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  houseTypes: string[];
  serviceRequestTypes: string[];
  interests: string[];
  loading?: boolean;
  action?: string;
};

export type TransformFormValues = (data: FormValues) => FormValues;
const [FormProvider, useFormContext, useForm] = createFormContext<FormValues>();
export { FormProvider, useForm, useFormContext };
