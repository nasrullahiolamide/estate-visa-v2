"use client";

import { Box, Button, Flex, Stack, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useQueryClient } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

import { MODALS } from "@/packages/libraries";
import { handleError, handleSuccess } from "@/packages/notification";
import { ResourceUpload } from "../uploads/resource";
import { FILE } from "@/packages/libraries/enum";
import Link from "next/link";
import { DownloadIcon } from "@/icons";
import { Files, useFileUpload } from "@/packages/hooks/use-file-upload";

import Papa from "papaparse";
import { occupants } from "@/builders/http/occupants";
import { occupantsColumns } from "@/columns/for_admins/occupants";
import {
  FlowContentContainer,
  FlowPaper,
  FlowStateProvider,
  FlowTable,
} from "@/components/layout";

type StaffListUploadProps = {
  organization_id: number;
  upload_type: "Staff Records";
};

export function BulkUpload(props: StaffListUploadProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<any[]>([]);

  const queryClient = useQueryClient();

  function handleClose() {
    modals.close(MODALS.UPLOAD_RESOURCES);
  }

  const requiredFields = ["name", "email", "age"];

  function handleDrop([file]: Files) {
    if (!file) return;

    Papa.parse(file, {
      header: true,
      complete: (result) => {
        const missingFields = requiredFields.filter(
          (field) => !result.meta.fields?.includes(field)
        );

        if (missingFields.length > 0) {
          return handleError({
            message: `The following fields are required: ${missingFields.join(
              ", "
            )}`,
          })();
        }

        setUploadedFile(file);
        setParsedData(result.data);
        setStatus("dropped");
      },
    });
  }

  const {
    status,
    setStatus,
    preview,
    progress,
    isPending,
    handleUpload,
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
        my={15}
        className='w-full'
        classNames={{
          label: "flex items-center justify-between w-full text-primary-body",
        }}
        component={Link}
        href='https://res.cloudinary.com/techeducratic/raw/upload/v1721248216/uploads/2024/07/17/igv6lzhidxz3e5am8erp.csv'
      >
        <Text>Download file format</Text>
        <DownloadIcon color='var(--accent-7)' className='ml-auto' />
      </Button>
    ),
    dropped: (
      <FlowContentContainer
        mah={500}
        className='rounded-none lg:rounded-2xl bg-white w-full'
      >
        <FlowTable data={parsedData} columns={occupantsColumns} />
      </FlowContentContainer>
    ),
    uploaded: "Uploaded successfully",
    uploading: "Uploading...",
    await: "Awaiting upload...",
    error: "An error occurred. Please try again",
  };

  return (
    <FlowStateProvider>
      <Box component='form' onSubmit={handleSubmit(handleUpload)}>
        <Text className='text-primary-text-subtle' mb={15}>
          {view[status]}
        </Text>
        <ResourceUpload
          accepts={(mime) => [mime.csv, mime.xlsx, mime.xls]}
          onDrop={handleDrop}
          name={preview.name}
          size={preview.size}
          completed={progress?.completed}
          status={status}
          supports={["csv", "xlsx"]}
          multiple={false}
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
            disabled={isPending || status === "pending"}
            loading={isPending}
          >
            Confirm
          </Button>
        </Flex>
      </Box>
    </FlowStateProvider>
  );
}
