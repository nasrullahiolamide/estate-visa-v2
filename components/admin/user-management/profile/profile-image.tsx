"use client";

import { Button, Image, Stack } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useFileUpload } from "@/packages/hooks/use-file-upload";

export function ProfileImage() {
  const { preview, handleUpload } = useFileUpload({
    key: "profile-image",
    // onError: () => {
    //   handleError({
    //     message: "Failed to upload thumbnail",
    //   });
    // },
    // onSuccess: ({ data }) => {
    //   form.clearFieldError("thumbnail_id");
    //   form.setFieldValue("thumbnail_id", data.id);
    // },
  });

  return (
    <Dropzone
      accept={IMAGE_MIME_TYPE}
      onDrop={handleUpload}
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
    >
      <Stack
        pos='relative'
        justify='center'
        w={155}
        className='cursor-pointer aspect-square'
      >
        <Image
          fit='cover'
          src={preview.url}
          alt={preview.name}
          pos='absolute'
          inset={0}
          h='100%'
          radius={9999}
        />
      </Stack>
      <Button variant='transparent' fw={500} p={0}>
        Edit Profile Picture
      </Button>
    </Dropzone>
  );
}
