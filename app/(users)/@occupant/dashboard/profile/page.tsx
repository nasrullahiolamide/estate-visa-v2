"use client";

import { builder } from "@/builders";
import { APP, cast, pass } from "@/packages/libraries";
import { handleError, handleSuccess } from "@/packages/notification";
import {
  Button,
  Divider,
  PasswordInput,
  SimpleGrid,
  TextInput,
  Title,
} from "@mantine/core";
import { Form, useForm, yupResolver } from "@mantine/form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { getCookie } from "cookies-next";
import { toString } from "lodash";
import { useEffect } from "react";

import {
  FormProvider,
  FormValues,
} from "@/components/admin/profile/form-context";
import {
  passwordSchema,
  profileDetailsSchema,
} from "@/components/admin/profile/schema";
import { FlowPhoneInput } from "@/components/layout";
import { FlowContainer } from "@/components/layout/flow-container";
import { AppShellHeader } from "@/components/shared/interface/app-shell";
import { ProfileImage } from "@/components/shared/user-management/profile/image";

export default function Profile() {
  const queryClient = useQueryClient();
  const userId = toString(getCookie(APP.USER_ID));
  const occupantId = toString(getCookie(APP.OCCUPANT_ID));

  const { data: houseNumber } = useQuery({
    queryKey: builder.occupants.id.get.$get(occupantId),
    queryFn: () => builder.$use.occupants.id.get(occupantId),
    select: ({ data }) => data.house.houseNumber,
  });

  const { data: user, isLoading } = useQuery({
    queryKey: builder.account.profile.get.$get(),
    queryFn: () => builder.$use.account.profile.get(userId),
    select: (data) => data,
  });

  const { mutate: updateProfile, isPending } = useMutation({
    mutationFn: builder.$use.account.profile.update,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: builder.account.profile.get.$get(),
      });
      profileDetailsForm.resetDirty();
      handleSuccess("Profile updated successfully", { autoClose: 1500 });
    },
    onError: handleError(),
  });

  const { mutate: updatePassword, isPending: isPasswordUpdating } = useMutation(
    {
      mutationFn: builder.$use.account.profile.change_password,
      onSuccess: () => {
        passwordForm.reset();
        handleSuccess("Password updated successfully", { autoClose: 1500 });
      },
      onError: handleError(),
    }
  );

  const profileDetailsForm = useForm<FormValues>({
    initialValues: {
      fullname: "",
      username: "",
      email: "",
      phone: "",
      picture: "",
      house_number: "",
    },
    validate: yupResolver(profileDetailsSchema),
    validateInputOnBlur: true,
  });

  useEffect(() => {
    if (!user) return;

    profileDetailsForm.initialize({
      fullname: pass.string(user.firstname),
      username: pass.string(user.username),
      email: pass.string(user.email),
      phone: pass.string(user.phone),
      picture: pass.string(user.picture),
      house_number: pass.string(houseNumber),
    });
  }, [user, houseNumber]);

  const passwordForm = useForm({
    initialValues: {
      oldPassword: "",
      password: "",
      confirm_password: "",
    },
    validate: yupResolver(passwordSchema),
    validateInputOnBlur: true,
    transformValues: (values) => {
      return {
        password: cast.string(values.password),
        oldPassword: cast.string(values.oldPassword),
        confirm_password: cast.string(values.confirm_password),
      };
    },
  });

  function handleProfileSubmit({
    picture,
    phone,
    fullname,
  }: typeof profileDetailsForm.values) {
    updateProfile({
      id: userId,
      data: {
        phone,
        fullname,
        picture,
      },
    });
  }

  function handlePasswordSubmit({
    password,
    oldPassword,
  }: typeof passwordForm.values) {
    updatePassword({
      id: userId,
      data: { oldPassword, password },
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
              <ProfileImage form={profileDetailsForm} isFetching={isLoading} />
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
                  label='House Number'
                  disabled
                  classNames={{
                    input: clsx("disabled:!bg-gray-2", { skeleton: isLoading }),
                  }}
                  {...profileDetailsForm.getInputProps("house_number")}
                />
                <TextInput
                  label='Full Name'
                  classNames={{
                    input: clsx({ skeleton: isLoading }),
                  }}
                  {...profileDetailsForm.getInputProps("fullname")}
                />

                <TextInput
                  label='Email Address'
                  disabled
                  classNames={{
                    input: clsx("disabled:!bg-gray-2", { skeleton: isLoading }),
                  }}
                  {...profileDetailsForm.getInputProps("email")}
                />
                <FlowPhoneInput
                  label='Phone Number'
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
                loading={isPending}
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
                  {...passwordForm.getInputProps("oldPassword")}
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
