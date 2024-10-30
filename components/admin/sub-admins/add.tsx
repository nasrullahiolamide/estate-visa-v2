"use client";

import { Button, PasswordInput, Select, TextInput } from "@mantine/core";
import { Form, useForm, yupResolver } from "@mantine/form";

import { FlowContainer } from "@/components/layout/flow-container";
import { APP, cast, decryptUri, pass } from "@/packages/libraries";
import { ArrowDown01Icon } from "hugeicons-react";
import { schema } from "./schema";
import { getCookie } from "cookies-next";
import { ProfileData } from "@/builders/types/profile";

export function AddSubAdmins() {
  const userData: ProfileData = decryptUri(getCookie(APP.USER_DATA));

  const form = useForm({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
      phone: "",
      estateId: pass.string(userData.estate.id),
      status: "Active",
    },
    validate: yupResolver(schema),
    validateInputOnBlur: true,
    transformValues: (values) => {
      const { fullname, email, phone, status, password, estateId } = values;
      return {
        fullname: cast.string(fullname),
        email: cast.string(email),
        password: cast.string(password),
        phone: cast.string(phone),
        estateId: cast.string(estateId),
        status: cast.string(status),
      };
    },
  });

  return (
    <Form form={form} onSubmit={() => {}}>
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
        <PasswordInput
          label='Password'
          withAsterisk
          {...form.getInputProps("password")}
        />
        <TextInput
          label='Phone Number'
          withAsterisk
          {...form.getInputProps("phone")}
        />

        <Select
          data={["Active", "Suspended"]}
          label='Account Status'
          rightSection={<ArrowDown01Icon />}
          {...form.getInputProps("status")}
        />

        <Button type='submit' mt={10}>
          Add Sub Admin
        </Button>
      </FlowContainer>
    </Form>
  );
}
