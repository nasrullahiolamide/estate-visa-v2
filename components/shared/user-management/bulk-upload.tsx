import { Box, Button, Flex, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useQueryClient } from "@tanstack/react-query";
import { Fragment, ReactNode } from "react";

import { builder } from "@/builders";
import { MODALS } from "@/packages/libraries";
import { handleError, handleSuccess } from "@/packages/notification";
import { ResourceUpload } from "../uploads/resource";
import { FILE } from "@/packages/libraries/enum";

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
      <Fragment>
        <Text span fw={500}>
          Click here to
        </Text>{" "}
        <Text
          component='a'
          td='underline'
          href='https://res.cloudinary.com/techeducratic/raw/upload/v1721248216/uploads/2024/07/17/igv6lzhidxz3e5am8erp.csv'
          className='text-primary-button-normal'
        >
          download template
        </Text>
      </Fragment>
    ),
    uploaded: "Uploaded successfully",
    uploading: "Uploading...",
    dropped: "Awaiting upload...",
    error: "An error occurred. Please try again",
  };

  return (
    <Box component='form' onSubmit={handleSubmit(handleUpload)}>
      <ResourceUpload
        accepts={(mime) => [mime.csv]}
        onDrop={handleDrop}
        name={preview.name}
        size={preview.size}
        completed={progress?.completed}
        status={status}
      />
      <Text className='text-primary-text-subtle'>{view[status]}</Text>

      <Flex gap={12} wrap='wrap'>
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
function useFileUpload<T>(arg0: {
  key: any;
  form: StaffListUploadProps;
  onError: any;
  onSuccess(): void;
}): {
  status: any;
  preview: any;
  progress: any;
  isPending: any;
  handleUpload: any;
  handleDrop: any;
  handleSubmit: any;
} {
  throw new Error("Function not implemented.");
}
