"use client";

import clsx from "clsx";
import { Avatar, Button, Text } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE, MIME_TYPES } from "@mantine/dropzone";

import { useFileUpload } from "@/packages/hooks/use-file-upload";
import { handleError } from "@/packages/notification";
import { concat } from "lodash";
interface ProfileImageProps {
  url?: string;
  form: any;
}

export function ProfileImage({ url, form }: ProfileImageProps) {
  const { preview, handleUpload } = useFileUpload({
    key: "profile-pictures",
    onError: () => {
      handleError({
        message: "Failed to upload thumbnail",
      })();
    },
    onSuccess: ({ data }) => {
      console.log(data);
      form.clearFieldError("thumbnail_id");
      form.setFieldValue("thumbnail_id", data.secure_url);
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
        src={preview.url ?? "/vectors/image-plus.svg"}
        alt={preview.name ?? "thumbnail"}
        classNames={{
          image: clsx({
            "p-4": !preview.url,
          }),
        }}
      />

      <Button variant='transparent' size='sm' fw={500} p={0} type='button'>
        Edit Profile Picture
      </Button>
      <Text c='red' fz='sm'>
        {form.getInputProps("thumbnail_id").error}
      </Text>
    </Dropzone>
  );
}
