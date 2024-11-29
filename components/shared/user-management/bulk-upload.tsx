"use client";

import { ReactNode } from "react";

import { Box, Button, Flex, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ResourceUpload } from "../uploads/resource";
import { DownloadIcon } from "@/icons";

import { FlowStateProvider } from "@/components/layout";
import {
  ImportCategory,
  useBulkUpload,
} from "@/packages/hooks/use-bulk-upload";
import { handleError, handleSuccess } from "@/packages/notification";
import { APP } from "@/packages/libraries/enum";
import { MODALS } from "@/packages/libraries";
import { toString } from "lodash";
import { getCookie } from "cookies-next";
import { builder } from "@/builders";
import { MIME_TYPE } from "@/builders/types/shared";
import { useFilename } from "@/packages/hooks/use-file-name";
import fileDownload from "js-file-download";
import { handleMantineError } from "@/packages/notification/handle-error";
import { AxiosError } from "axios";

type BulkUploadProps = {
  estateId?: string;
  type: ImportCategory;
};

export function BulkUpload(props: BulkUploadProps) {
  const estateId = toString(getCookie(APP.ESTATE_ID));
  const queryClient = useQueryClient();

  function handleClose() {
    modals.close(MODALS.UPLOAD_RESOURCES);
  }

  const { mutate: download, isPending: isDownloading } = useMutation({
    mutationFn: builder.use()[props.type]?.template,
    onSuccess: (data) => {
      const filename = useFilename(
        [props.type, "template"],
        data.type as MIME_TYPE
      );
      fileDownload(data, filename);
    },
    onError: handleError(),
  });

  const {
    status,
    handleDrop,
    preview,
    progress,
    isPending,
    handleUpload,
    handleSubmit,
  } = useBulkUpload<BulkUploadProps>({
    key: props.type,
    form: { ...props, estateId },
    onError() {
      handleMantineError({
        message: "An error occurred. Please try again",
      });
    },
    onSuccess() {
      handleSuccess({
        message: "CSV file uploaded successfully",
      });
      queryClient.invalidateQueries({
        queryKey: builder[props.type].get(),
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
          label:
            "flex items-center justify-between w-full text-primary-body text-sm",
        }}
        loading={isDownloading}
        disabled={isDownloading}
        onClick={() => download()}
      >
        <Text>Download file format</Text>
        <DownloadIcon color='var(--accent-7)' className='ml-auto' />
      </Button>
    ),

    dropped: "Awaiting upload...",
    uploaded: "Uploaded successfully",
    uploading: "Uploading...",
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
            fz='sm'
            color={status === "pending" ? "gray" : "red"}
            miw='fit-content'
            variant='default'
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            flex={1}
            fz='sm'
            miw='fit-content'
            type='submit'
            disabled={isPending || status === "pending"}
            loading={isPending}
          >
            Upload
          </Button>
        </Flex>
      </Box>
    </FlowStateProvider>
  );
}

// const [uploadedFile, setUploadedFile] = useState<File | null>(null);
// const [parsedData, setParsedData] = useState<any[]>([]);

// dropped: (
//   <FlowContentContainer
//     mah={500}
//     className='rounded-none lg:rounded-2xl bg-white w-full'
//   >
//     <FlowTable data={parsedData} columns={occupantsColumns} />
//   </FlowContentContainer>
// ),

// const requiredFields = ["name", "email", "age"];

// function handleDrop([file]: Files) {
//   if (!file) return;

//   Papa.parse(file, {
//     header: true,
//     complete: (result) => {
//       const missingFields = requiredFields.filter(
//         (field) => !result.meta.fields?.includes(field)
//       );

//       if (missingFields.length > 0) {
//         return handleError({
//           message: `The following fields are required: ${missingFields.join(
//             ", "
//           )}`,
//         })();
//       }

//       setUploadedFile(file);
//       setParsedData(result.data);
//       setStatus("dropped");
//     },
//   });
// }
