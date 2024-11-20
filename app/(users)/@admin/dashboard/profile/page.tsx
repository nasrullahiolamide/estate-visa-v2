"use client";

import { getCookie } from "cookies-next";
import {
  Button,
  Divider,
  PasswordInput,
  SimpleGrid,
  TextInput,
  Title,
} from "@mantine/core";
import { Form, useForm, yupResolver } from "@mantine/form";
import { APP, cast, decryptUri } from "@/packages/libraries";

import { AppShellHeader } from "@/components/shared/interface/app-shell";
import { FlowContainer } from "@/components/layout/flow-container";
import { ProfileImage } from "@/components/shared/user-management/profile/image";
import {
  passwordSchema,
  profileDetailsSchema,
} from "@/components/admin/profile/schema";
import { FormProvider } from "@/components/admin/profile/form-context";
import { ProfileData } from "@/builders/types/profile";

export default function Profile() {
  const user: ProfileData = decryptUri(getCookie(APP.USER_DATA));

  const userDetails = {
    fullname: `${user?.firstname} ${user?.lastname ?? ""}`,
    estatename: user?.estate?.name,
    ...user,
  };

  const profileDetailsForm = useForm({
    initialValues: {
      fullname: userDetails.fullname,
      username: userDetails.username,
      estatename: userDetails.estatename,
      email: userDetails.email,
      phone: userDetails.phone,
    },
    validate: yupResolver(profileDetailsSchema),
    validateInputOnBlur: true,
    transformValues: (values) => {
      const { fullname, email, phone, username } = values;
      return {
        fullname: cast.string(fullname),
        username: cast.string(username),
        email: cast.string(email),
        phone: cast.string(phone),
      };
    },
  });

  const passwordForm = useForm({
    initialValues: {
      curr_password: "",
      new_password: "",
      confirm_password: "",
    },
    validate: yupResolver(passwordSchema),
    validateInputOnBlur: true,
    transformValues: (values) => {
      const { new_password, confirm_password } = values;
      return {
        new_password: cast.string(new_password),
        confirm_password: cast.string(confirm_password),
      };
    },
  });

  return (
    <FormProvider form={profileDetailsForm}>
      <AppShellHeader title='My Profile' />

      <FlowContainer gap={32} className='p-5 sm:p-8'>
        <FlowContainer
          gap={0}
          className='rounded-2xl bg-primary-background-white'
        >
          <Form form={profileDetailsForm} onSubmit={() => {}}>
            <FlowContainer justify='center' gap={24} className='p-6 md:p-14'>
              <ProfileImage
                url={userDetails?.picture}
                form={profileDetailsForm}
              />
              <Divider />
              <Title order={2} c='purple.9' fz={20} fw={500}>
                Profile Details
              </Title>
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
                  {...profileDetailsForm.getInputProps("fullname")}
                />

                <TextInput
                  label='Username'
                  placeholder={
                    !userDetails?.username ? "Enter your username" : ""
                  }
                  {...profileDetailsForm.getInputProps("username")}
                />

                <TextInput
                  label='Email Address'
                  disabled
                  classNames={{
                    input: "disabled:bg-gray-4",
                  }}
                  {...profileDetailsForm.getInputProps("email")}
                />
                <TextInput
                  label='Phone Number'
                  disabled
                  {...profileDetailsForm.getInputProps("phone")}
                />
              </SimpleGrid>
              <Button type='submit' className='sm:w-fit w-full ml-auto'>
                Save Profile
              </Button>
            </FlowContainer>
          </Form>

          <Divider />
          <Form form={passwordForm} onSubmit={() => {}}>
            <FlowContainer justify='center' gap={24} className='p-6 md:px-14'>
              <Title order={2} c='purple.9' fz={20} fw={500}>
                Change Password
              </Title>
              <SimpleGrid
                w='100%'
                cols={{
                  base: 1,
                  sm: 2,
                }}
                spacing={20}
              >
                <PasswordInput
                  label='Current Password'
                  placeholder='**********'
                  {...passwordForm.getInputProps("curr_password")}
                />
                <PasswordInput label='New Password' placeholder='**********' />
                <PasswordInput
                  label='Confirm Password'
                  placeholder='**********'
                  {...passwordForm.getInputProps("confirm_password")}
                />
              </SimpleGrid>
              <Button type='submit' className='sm:w-fit w-full ml-auto'>
                Change Password
              </Button>
            </FlowContainer>
          </Form>
        </FlowContainer>
      </FlowContainer>
    </FormProvider>
  );
}
