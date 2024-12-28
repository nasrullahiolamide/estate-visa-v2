import { UpdateOccupantData } from "@/builders/types/occupants";
import { createFormContext } from "@mantine/form";

interface FormValues {
  fullname: string;
  email: string;
  phone: string;
  status: string;
  isMain: boolean;
  isPropertyOwner: boolean;
  relationshipToMain: string;
  noOfSubOccupants: string;
  houseId: string;
  modalType: "add" | "edit" | "view";
}

export type TransformFormValues = (values: FormValues) => FormValues;

const [FormProvider, useFormContext, useForm] = createFormContext<FormValues>();
export { FormProvider, useForm, useFormContext };
