"use client";

import { Form, useForm, yupResolver } from "@mantine/form";
import { cast, PAGES } from "@/packages/libraries";
import { AppShellHeader } from "@/components/admin/shared/app-shell/header";
import { FlowContainer, FlowContentContainer } from "@/components/layout";
import { schema } from "@/components/super-admin/estates/add-new-estate/schema";
import {
  DesktopView,
  MobileView,
} from "@/components/super-admin/estates/add-new-estate/views";
import {
  FormProvider,
  FormValues,
  TransformFormValues,
} from "@/components/super-admin/estates/add-new-estate/form-context";

export default function AddNewEstates() {
  const form = useForm<FormValues, TransformFormValues>({
    initialValues: {
      estate_name: "",
      estate_location: "",
      estate_email_address: "",
      estate_owner: "",
      estate_password: "",
      estate_phone_number: "",
      estate_username: "",
      no_of_houses: "",
      house_types: [],
      service_requests: [],
      service_types: [],
    },
    validate: yupResolver(schema),
    validateInputOnBlur: true,
  });

  const handleSubmit = () => {
    console.log("submitted");
  };

  return (
    <FormProvider form={form}>
      <AppShellHeader title='Add New Estate' backHref={PAGES.ESTATES} />
      <FlowContainer type='plain' className='lg:~p-1/8'>
        <FlowContentContainer
          classNames={{
            root: "rounded-xl bg-white lg:p-12 m-4 p-6 ",
          }}
        >
          <Form form={form} className='h-full flex'>
            <DesktopView onSubmit={handleSubmit} />
            <MobileView onSubmit={handleSubmit} />
          </Form>
        </FlowContentContainer>
      </FlowContainer>
    </FormProvider>
  );
}
