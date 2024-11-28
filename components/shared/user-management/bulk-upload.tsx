"use client";

import { Box, Button, Flex, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useQueryClient } from "@tanstack/react-query";
import { Fragment, ReactNode } from "react";

import { builder } from "@/builders";
import { MODALS } from "@/packages/libraries";
import { handleError, handleSuccess } from "@/packages/notification";
import { ResourceUpload } from "../uploads/resource";
import { FILE } from "@/packages/libraries/enum";
import Link from "next/link";
import { DownloadIcon } from "@/icons";
import { useFileUpload } from "@/packages/hooks/use-file-upload";

type StaffListUploadProps = {
  organization_id: number;
  upload_type: "Staff Records";
};

export function BulkUpload(props: StaffListUploadProps) {
  const queryClient = useQueryClient();

  function handleClose() {
    modals.close(MODALS.UPLOAD_RESOURCES);
  }

  const {
    status,
    preview,
    progress,
    isPending,
    handleUpload,
    handleDrop,
    handleSubmit,
  } = useFileUpload<StaffListUploadProps>({
    key: FILE.OTHERS,
    form: props,
    onError: handleError(),
    onSuccess() {
      handleSuccess({
        message: "CSV file uploaded successfully",
      });

      handleClose();
    },
  });

  const view: Record<PropertyKey, ReactNode> = {
    pending: (
      <Button
        variant='outline'
        color='gray'
        w='100%'
        my={15}
        className='flex items-center justify-between'
      >
        <Text
          component={Link}
          href='https://res.cloudinary.com/techeducratic/raw/upload/v1721248216/uploads/2024/07/17/igv6lzhidxz3e5am8erp.csv'
        >
          Download file format
        </Text>

        <DownloadIcon />
      </Button>
    ),
    uploaded: "Uploaded successfully",
    uploading: "Uploading...",
    dropped: "Awaiting upload...",
    error: "An error occurred. Please try again",
  };

  return (
    <Box component='form' onSubmit={handleSubmit(handleUpload)}>
      <Text className='text-primary-text-subtle'>{view[status]}</Text>
      <ResourceUpload
        accepts={(mime) => [mime.csv]}
        onDrop={handleDrop}
        name={preview.name}
        size={preview.size}
        completed={progress?.completed}
        status={status}
        supports={["csv", "xls"]}
      />

      <Flex gap={12} wrap='wrap' mt={30}>
        <Button
          flex={1}
          miw='fit-content'
          variant='default'
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          flex={1}
          miw='fit-content'
          type='submit'
          disabled={isPending}
          loading={isPending}
        >
          Confirm
        </Button>
      </Flex>
    </Box>
  );
}
