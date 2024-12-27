"use client";

import { useState } from "react";
import { Copy } from "iconsax-react";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { getCookie } from "cookies-next";
import { Button, TextInput } from "@mantine/core";
import { Form, useForm, yupResolver } from "@mantine/form";
import { modals } from "@mantine/modals";

import { builder } from "@/builders";
import { APP, cast, MODALS } from "@/packages/libraries";
import { handleSuccess, handleError } from "@/packages/notification";

import { schema } from "../schema";
import { FlowContainer, FlowPhoneInput } from "@/components/layout";

export function AddSubAdmins() {
  const estateId = getCookie(APP.ESTATE_ID) ?? "";
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: builder.$use.sub_admins.post,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: builder.sub_admins.get.$get(),
      });

      modals.close(MODALS.ADD_SUB_ADMIN);
      handleSuccess({
        message: "Sub-Admin Added Successfully",
        autoClose: 500,
      });
    },
    onError: handleError(),
  });

  const form = useForm({
    initialValues: {
      fullname: "",
      email: "",
      phone: "",
      estateId,
    },
    validate: yupResolver(schema),
    validateInputOnBlur: true,
    transformValues: (values) => {
      const { fullname, email, phone, estateId } = values;
      return {
        fullname: cast.string(fullname),
        email: cast.string(email),
        phone: cast.string(phone),
        estateId: cast.string(estateId),
      };
    },
  });

  function handleSubmit(values: typeof form.values) {
    mutate(values);
  }

  return (
    <Form form={form} onSubmit={handleSubmit}>
      <FlowContainer
        className='rounded-2xl bg-primary-background-white'
        justify='center'
        gap={18}
        type='plain'
        bg='white'
      >
        <TextInput
          label='Full Name'
          withAsterisk
          {...form.getInputProps("fullname")}
        />
        <TextInput
          label='Email Address'
          withAsterisk
          {...form.getInputProps("email")}
        />
        <FlowPhoneInput
          label='Phone Number'
          withAsterisk
          {...form.getInputProps("phone")}
        />

        <Button type='submit' mt={10} loading={isPending} disabled={isPending}>
          Add Sub Admin
        </Button>
      </FlowContainer>
    </Form>
  );
}
