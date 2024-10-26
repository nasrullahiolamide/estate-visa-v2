import { addNewEstateData } from "@/builders/types/estates";
import { createFormContext } from "@mantine/form";

export type FormValues = {
  estate_name: string;
  estate_location: string;
  estate_owner: string;
  estate_phone_number: string;
  estate_email_address: string;
  estate_username: string;
  estate_password: string;
  no_of_houses: string;
  house_types: string[];
  service_requests: string[];
  service_types: string[];
};

export type TransformFormValues = (data: FormValues) => addNewEstateData;

const [FormProvider, useFormContext, useForm] = createFormContext<FormValues>();
export { FormProvider, useForm, useFormContext };
