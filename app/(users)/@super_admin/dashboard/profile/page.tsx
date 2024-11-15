"use client";

import { getCookie } from "cookies-next";
import {
  Button,
  Divider,
  PasswordInput,
  SimpleGrid,
  TextInput,
} from "@mantine/core";
import { Form, useForm, yupResolver } from "@mantine/form";
import { APP, cast, decryptUri } from "@/packages/libraries";

import { AppShellHeader } from "@/components/admin/shared/app-shell";
import { FlowContainer } from "@/components/layout/flow-container";
import { ProfileImage } from "@/components/shared/user-management/profile/image";
import { schema } from "@/components/super-admin/profile/schema";
import { FormProvider } from "@/components/super-admin/profile/form-context";
import { ProfileData } from "@/builders/types/profile";

export default function Profile() {
  const user: ProfileData = decryptUri(getCookie(APP.USER_DATA));

  const userDetails = {
    fullname: `${user?.firstname} ${user?.lastname}`,
    estatename: user?.estate?.name,
    ...user,
  };

  const form = useForm({
    initialValues: {
      fullname: userDetails.fullname,
      username: userDetails.username,
      estatename: userDetails.estatename,
      email: userDetails.email,
      phone: userDetails.phone,
      password: "",
      confirm_password: "",
    },
    validate: yupResolver(schema),
    validateInputOnBlur: true,
    transformValues: (values) => {
      const { fullname, email, phone, username, password } = values;
      return {
        fullname: cast.string(fullname),
        username: cast.string(username),
        email: cast.string(email),
        phone: cast.string(phone),
        password: cast.string(password),
      };
    },
  });

  return (
    <FormProvider form={form}>
      <AppShellHeader title='My Profile' />

      <FlowContainer gap={32} className='p-5 sm:p-8'>
        <Form form={form} onSubmit={() => {}}>
          <FlowContainer
            gap={0}
            className='rounded-2xl bg-primary-background-white'
          >
            <FlowContainer justify='center' gap={24} className='p-6 md:p-14'>
              <ProfileImage url={userDetails?.picture} form={form} />
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
                  label='Full Name'
                  {...form.getInputProps("fullname")}
                />

                <TextInput
                  label='Username'
                  placeholder={
                    !userDetails?.username ? "Enter your username" : ""
                  }
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
                  {...form.getInputProps("phone")}
                />
                <PasswordInput
                  label='Password'
                  placeholder='**********'
                  {...form.getInputProps("password")}
                />
                <PasswordInput
                  label='Confirm Password'
                  placeholder='**********'
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
    </FormProvider>
  );
}
