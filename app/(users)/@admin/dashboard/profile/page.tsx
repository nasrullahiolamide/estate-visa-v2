"use client";

import clsx from "clsx";
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
import { APP, cast, pass } from "@/packages/libraries";

import { AppShellHeader } from "@/components/shared/interface/app-shell";
import { FlowContainer } from "@/components/layout/flow-container";
import { ProfileImage } from "@/components/shared/user-management/profile/image";
import {
  passwordSchema,
  profileDetailsSchema,
} from "@/components/admin/profile/schema";
import { FormProvider } from "@/components/admin/profile/form-context";
import { builder } from "@/builders";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toString } from "lodash";
import { useEffect, useMemo } from "react";
import { handleError, handleSuccess } from "@/packages/notification";

export default function Profile() {
  const queryClient = useQueryClient();
  const userId = toString(getCookie(APP.USER_ID));

  const { data: user, isLoading } = useQuery({
    queryKey: builder.account.profile.get.get(),
    queryFn: () => builder.use().account.profile.get(userId),
    select: (data) => data,
  });

  const userDetails = useMemo(() => {
    return {
      fullname: `${user?.firstname} ${user?.lastname ?? ""}`,
      estatename: user?.estate?.name,
      ...user,
    };
  }, [user]);

  const { mutate: updateProfile, isPending } = useMutation({
    mutationFn: builder.use().account.profile.update,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: builder.account.profile.get.get(),
      });
      handleSuccess({
        message: "Profile updated successfully",
        autoClose: 1500,
      });
    },
    onError: handleError(),
  });

  const { mutate: updatePassword, isPending: isPasswordUpdating } = useMutation(
    {
      mutationFn: builder.use().account.profile.change_password,
      onSuccess: () => {
        passwordForm.reset();
        handleSuccess({
          message: "Password updated successfully",
          autoClose: 1500,
        });
      },
      onError: handleError(),
    }
  );

  const profileDetailsForm = useForm({
    initialValues: {
      fullname: "",
      username: "",
      email: "",
      phone: "",
      picture: "",
    },
    validate: yupResolver(profileDetailsSchema),
    validateInputOnBlur: true,
  });

  useEffect(() => {
    if (user) {
      profileDetailsForm.setValues({
        fullname: pass.string(userDetails.fullname),
        username: pass.string(userDetails.username),
        email: pass.string(userDetails.email),
        phone: pass.string(userDetails.phone),
        picture: pass.string(userDetails.picture),
      });
    }
  }, [user]);

  const passwordForm = useForm({
    initialValues: {
      curr_password: "",
      password: "",
      confirm_password: "",
    },
    validate: yupResolver(passwordSchema),
    validateInputOnBlur: true,
    transformValues: (values) => {
      return {
        password: cast.string(values.password),
        curr_password: cast.string(values.curr_password),
        confirm_password: cast.string(values.confirm_password),
      };
    },
  });

  function handleProfileSubmit({
    fullname,
    username,
    picture,
  }: typeof profileDetailsForm.values) {
    updateProfile({
      id: userId,
      data: {
        fullname,
        username,
        picture,
      },
    });
  }

  function handlePasswordSubmit({ password }: typeof passwordForm.values) {
    updatePassword({
      id: userId,
      password,
    });
  }

  return (
    <FormProvider form={profileDetailsForm}>
      <AppShellHeader title='My Profile' />

      <FlowContainer gap={32} className='p-5 sm:p-8'>
        <FlowContainer
          gap={0}
          className='rounded-2xl bg-primary-background-white'
        >
          <Form form={profileDetailsForm} onSubmit={handleProfileSubmit}>
            <FlowContainer justify='center' gap={24} className='p-6 md:p-14'>
              <ProfileImage form={profileDetailsForm} />
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
                  classNames={{
                    input: clsx({ skeleton: isLoading }),
                  }}
                  {...profileDetailsForm.getInputProps("fullname")}
                />

                <TextInput
                  label='Username'
                  placeholder={
                    !userDetails?.username ? "Enter your username" : ""
                  }
                  classNames={{
                    input: clsx({ skeleton: isLoading }),
                  }}
                  {...profileDetailsForm.getInputProps("username")}
                />

                <TextInput
                  label='Email Address'
                  disabled
                  classNames={{
                    input: clsx({ skeleton: isLoading }),
                  }}
                  {...profileDetailsForm.getInputProps("email")}
                />
                <TextInput
                  label='Phone Number'
                  disabled
                  classNames={{
                    input: clsx({ skeleton: isLoading }),
                  }}
                  {...profileDetailsForm.getInputProps("phone")}
                />
              </SimpleGrid>

              <Button
                type='submit'
                className='sm:w-fit w-full ml-auto'
                disabled={!profileDetailsForm.isDirty() || isPending}
              >
                Save Profile
              </Button>
            </FlowContainer>
          </Form>

          <Divider />
          <Form form={passwordForm} onSubmit={handlePasswordSubmit}>
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
                <PasswordInput
                  label='New Password'
                  placeholder='**********'
                  {...passwordForm.getInputProps("password")}
                />
                <PasswordInput
                  label='Confirm Password'
                  placeholder='**********'
                  {...passwordForm.getInputProps("confirm_password")}
                />
              </SimpleGrid>
              <Button
                type='submit'
                className='sm:w-fit w-full ml-auto'
                loading={isPasswordUpdating}
                disabled={!passwordForm.isDirty() || isPasswordUpdating}
              >
                Change Password
              </Button>
            </FlowContainer>
          </Form>
        </FlowContainer>
      </FlowContainer>
    </FormProvider>
  );
}
