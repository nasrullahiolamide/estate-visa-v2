"use client";

import { useEffect } from "react";
import { getCookie } from "cookies-next";
import {
  Button,
  Divider,
  PasswordInput,
  SimpleGrid,
  TextInput,
} from "@mantine/core";
import { Form, useForm, yupResolver } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { APP, cast, pass } from "@/packages/libraries";
import { builder } from "@/builders";

import { AppShellHeader } from "@/components/admin/shared/app-shell";
import { FlowContainer } from "@/components/layout/flow-container";
import { ProfileImage } from "@/components/shared/user-management/profile/image";
import { schema } from "@/components/super-admin/profile/schema";
import { FormProvider } from "@/components/super-admin/profile/edit-profile-form-context";

export default function Profile() {
  const userId = getCookie(APP.USER_ID) as string;

  const { data, isLoading } = useQuery({
    queryKey: builder.account.profile.get.get(userId),
    queryFn: () => builder.use().account.profile.get(userId),
    select: (data) => data,
  });

  const form = useForm({
    initialValues: {
      fullname: "",
      username: "",
      estatename: "",
      email: "",
      phone: "",
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

  useEffect(() => {
    const { firstname, lastname, username, email, phone, estate } = {
      ...data,
    };
    form.initialize({
      fullname: `${pass.string(firstname)} ${pass.string(lastname)}`,
      username: pass.string(username),
      email: pass.string(email),
      phone: pass.string(phone),
      estatename: pass.string(estate?.name),
      password: "",
      confirm_password: "",
    });
  }, [isLoading]);

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
              <ProfileImage url={data?.picture} form={form} />
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
                  placeholder={!data?.username ? "Enter your username" : ""}
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
