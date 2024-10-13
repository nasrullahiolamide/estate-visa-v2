"use client";

import {
  Button,
  Divider,
  PasswordInput,
  SimpleGrid,
  TextInput,
} from "@mantine/core";
import { Form, useForm, yupResolver } from "@mantine/form";
import { Fragment } from "react";
import { object, string } from "yup";

import { AppShellHeader } from "@/components/admin/shared/app-shell-header";
import { ProfileImage } from "@/components/admin/shared/profile/profile-image";
import { FlowContainer } from "@/components/layout/flow-container";
import { cast } from "@/packages/libraries";

const schema = object({
  full: string().required("Firstname is required"),
  last_name: string().required("Lastname is required"),
  phone_number: string().required("Phone number is required"),
  email: string().email("Invalid email").required("Email is required"),
  password: string().required("Password is required"),
});

export default function Profile() {
  const form = useForm({
    initialValues: {
      full_name: "Madamidola Abdulrasheed",
      username: "Brainiac",
      email: "superadmin@gmail.com",
      phone_number: "09038450563",
      password: "superadmin",
      confirm_password: "superadmin",
    },
    validate: yupResolver(schema),
    validateInputOnBlur: true,
    transformValues: (values) => {
      const {
        full_name,
        username,
        email,
        phone_number,
        password,
        confirm_password,
      } = values;

      return {
        full_name: cast.string(full_name),
        username: cast.string(username),
        email: cast.string(email),
        phone_number: cast.string(phone_number),
        password: cast.string(password),
        confirm_password: cast.string(confirm_password),
      };
    },
  });

  return (
    <Fragment>
      <AppShellHeader title='My Profile' />

      <FlowContainer gap={32} className='p-5 sm:p-8'>
        <Form form={form} onSubmit={() => {}}>
          <FlowContainer
            gap={0}
            className='rounded-2xl bg-primary-background-white'
          >
            <FlowContainer justify='center' gap={24} className='p-6 md:p-14'>
              <ProfileImage />
              <Divider />
              <SimpleGrid
                w='100%'
                cols={{
                  base: 1,
                  sm: 2,
                }}
                spacing={20}
              >
                <TextInput
                  label='Fullname'
                  {...form.getInputProps("full_name")}
                />

                <TextInput
                  label='Username'
                  {...form.getInputProps("username")}
                />

                <TextInput
                  label='Email Address'
                  disabled
                  {...form.getInputProps("email")}
                />
                <TextInput
                  label='Phone Number'
                  disabled
                  {...form.getInputProps("phone_number")}
                />
                <PasswordInput
                  label='Password'
                  {...form.getInputProps("password")}
                />
                <PasswordInput
                  label='Confirm Password'
                  {...form.getInputProps("confirm_password")}
                />
              </SimpleGrid>

              <Button type='submit' className='sm:w-fit w-full ml-auto'>
                Save Profile
              </Button>
            </FlowContainer>
          </FlowContainer>
        </Form>
      </FlowContainer>
    </Fragment>
  );
}
