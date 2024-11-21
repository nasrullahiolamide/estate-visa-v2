"use client";

import clsx from "clsx";
import { Avatar, Button, Flex, Loader, Text } from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";

import { useFileUpload } from "@/packages/hooks/use-file-upload";
import { handleError } from "@/packages/notification";
import { concat } from "lodash";
import { UseFormReturnType } from "@mantine/form";
import {
  FormValues,
  TransformFormValues,
} from "@/components/admin/profile/form-context";
interface ProfileImageProps {
  url?: string;
  isFetching: boolean;
  form: UseFormReturnType<FormValues, TransformFormValues>;
}

export function ProfileImage({ form, isFetching }: ProfileImageProps) {
  const { picture } = form.getValues();

  const { preview, handleUpload, isPending } = useFileUpload({
    key: "profile-pictures",
    onError: () => {
      handleError({
        message: "Failed to upload thumbnail",
      })();
    },
    onSuccess: ({ data }) => {
      form.clearFieldError("picture");
      form.setFieldValue("picture", data.secure_url);
    },
  });

  return (
    <Dropzone
      accept={concat(MIME_TYPES.png, MIME_TYPES.jpeg)}
      styles={{
        inner: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        },
        root: {
          width: "fit-content",
          marginInline: "auto",
        },
      }}
      onDrop={handleUpload}
    >
      <Avatar
        size={90}
        radius={9999}
        className='bg-gray-2 cursor-pointer'
        src={
          isPending || isFetching
            ? null
            : picture || preview.url || "/vectors/image-plus.svg"
        }
        alt={preview.name ?? "thumbnail"}
        classNames={{
          image: clsx({
            "p-4": !picture,
          }),
        }}
      >
        {(isPending || isFetching) && (
          <Flex align='center' justify='center'>
            <Loader size='sm' color='gray' />
          </Flex>
        )}
      </Avatar>

      <Button variant='transparent' size='sm' fw={500} p={0} type='button'>
        Edit Profile Picture
      </Button>
      <Text c='red' fz='sm'>
        {form.getInputProps("picture").error}
      </Text>
    </Dropzone>
  );
}
