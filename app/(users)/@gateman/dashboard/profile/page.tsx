"use client";

import clsx from "clsx";
import { toString } from "lodash";
import { useEffect } from "react";
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
import { APP, pass } from "@/packages/libraries";
import { builder } from "@/builders";
import { handleError, handleSuccess } from "@/packages/notification";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { AppShellHeader } from "@/components/shared/interface/app-shell";
import { FormProvider } from "@/components/admin/profile/form-context";
import { FlowContainer } from "@/components/layout/flow-container";
import { ProfileImage } from "@/components/shared/user-management/profile/image";
import { profileDetailsSchema } from "@/components/admin/profile/schema";

export default function Profile() {
  const queryClient = useQueryClient();
  const userId = toString(getCookie(APP.USER_ID));

  const { data: user, isLoading } = useQuery({
    queryKey: builder.account.profile.get.get(),
    queryFn: () => builder.use().account.profile.get(userId),
    select: (data) => data,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: builder.use().account.profile.update,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: builder.account.profile.get.get(),
      });
      profileDetailsForm.resetDirty();
      handleSuccess({
        message: "Profile updated successfully",
        autoClose: 1500,
      });
    },
    onError: handleError(),
  });

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
    if (!user) return;

    profileDetailsForm.initialize({
      fullname: pass.string(user.firstname),
      username: pass.string(user.username),
      email: pass.string(user.email),
      phone: pass.string(user.phone),
      picture: pass.string(user.picture),
    });
  }, [user]);

  function handleProfileSubmit({ picture }: typeof profileDetailsForm.values) {
    mutate({
      id: userId,
      data: {
        picture,
      },
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
                  label='Gate Name'
                  disabled
                  classNames={{
                    input: clsx({ skeleton: isLoading }),
                  }}
                  {...profileDetailsForm.getInputProps("fullname")}
                />

                <TextInput
                  label='Gate Username'
                  disabled
                  classNames={{
                    input: clsx({ skeleton: isLoading }),
                  }}
                  {...profileDetailsForm.getInputProps("email")}
                />
              </SimpleGrid>

              <Button
                mt='auto'
                type='submit'
                className='sm:w-fit w-full ml-auto'
                disabled={!profileDetailsForm.isDirty() || isPending}
                loading={isPending}
              >
                Save Profile
              </Button>
            </FlowContainer>
          </Form>
        </FlowContainer>
      </FlowContainer>
    </FormProvider>
  );
}
