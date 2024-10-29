"use client";

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
import clsx from "clsx";

export default function Page() {
  const queryClient = useQueryClient();

  const { mutate: addNewEstate, isPending } = useMutation({
    mutationFn: builder.use().estates.post,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: builder.estates.get.get(),
      });
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
      username: "",
      email: "",
      phone: "",
      password: "",
      serviceRequestTypes: [],
      houseTypes: [],
      interests: [],
      loading: true,
    },
    validate: yupResolver(schema),
    validateInputOnBlur: true,
  });

  function handleSubmit({
    owner,
    username,
    email,
    phone,
    password,
    numberOfHouses,
    ...values
  }: typeof form.values) {
    const data = {
      ...values,
      numberOfHouses: cast.number(numberOfHouses),
      managerDetails: {
        owner,
        username,
        email,
        phone,
        password,
      },
    };

    addNewEstate(data);
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
            <Form form={form} className='h-full flex' onSubmit={handleSubmit}>
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
