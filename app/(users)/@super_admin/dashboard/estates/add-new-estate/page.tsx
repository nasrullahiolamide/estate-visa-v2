"use client";

import clsx from "clsx";

import { Fragment } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { builder } from "@/builders";
import { navigate } from "@/packages/actions";
import { cast, makePath, PAGES } from "@/packages/libraries";
import { AppShellHeader } from "@/components/admin/shared";
import { FlowContainer, FlowContentContainer } from "@/components/layout";
import { Form, useForm, yupResolver } from "@mantine/form";
import { schema } from "@/components/super-admin/estates/schema";
import { DesktopView } from "@/components/super-admin/estates/views/desktop";
import { MobileView } from "@/components/super-admin/estates/views/mobile";
import { handleError, handleSuccess } from "@/packages/notification";
import {
  FormProvider,
  FormValues,
  TransformFormValues,
} from "@/components/super-admin/estates/form-context";

export default function Page() {
  const { mutate: addNewEstate, isPending } = useMutation({
    mutationFn: builder.use().estates.post,
    onSuccess: () => {
      navigate(makePath(PAGES.DASHBOARD, PAGES.ESTATES));
      handleSuccess({
        message: "New Estate Added Successfully",
      });
    },
    onError: handleError(),
  });

  const form = useForm<FormValues, TransformFormValues>({
    initialValues: {
      name: "",
      location: "",
      numberOfHouses: "",
      owner: "",
      email: "",
      phone: "",
      serviceRequestTypes: [],
      houseTypes: [],
      interests: ["Residence Management", "Access Request"],
    },
    validate: yupResolver(schema),
    validateInputOnBlur: true,
  });

  function handleSubmit() {
    const { owner, email, phone, numberOfHouses, ...values } = form.getValues();

    const payload = {
      ...values,
      numberOfHouses: cast.number(numberOfHouses),
      managerDetails: {
        owner,
        email,
        phone,
      },
    };

    addNewEstate(payload);
  }

  return (
    <Fragment>
      <AppShellHeader
        title='Estate Details'
        backHref={makePath(PAGES.DASHBOARD, PAGES.ESTATES)}
      />
      <FlowContainer type='plain' className='lg:~p-1/8'>
        <FormProvider form={form}>
          <FlowContentContainer
            classNames={{
              root: clsx("rounded-xl bg-white lg:p-12 m-4 p-6 ", {}),
            }}
          >
            <Form form={form} className='h-full flex'>
              <DesktopView
                onSubmit={handleSubmit}
                isSubmitting={isPending}
                btnText='Add Estate'
              />
              <MobileView
                onSubmit={handleSubmit}
                isSubmitting={isPending}
                btnText='Add Estate'
              />
            </Form>
          </FlowContentContainer>
        </FormProvider>
      </FlowContainer>
    </Fragment>
  );
}
