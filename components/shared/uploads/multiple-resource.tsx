import clsx from "clsx";
import prettyBytes from "pretty-bytes";

import { Center, Flex, Input, Progress, Stack, Text } from "@mantine/core";
import { Dropzone, DropzoneProps, MIME_TYPES } from "@mantine/dropzone";
import { GetInputPropsReturnType } from "@mantine/form/lib/types";
import { MIME, MIME_TYPE } from "@/builders/types/shared";
import { Status } from "@/packages/hooks/use-file-upload";
import { pass } from "@/packages/libraries";
import { Check, FileIcon } from "@/icons";
import { Upload } from "./upload-icon";
import { useState } from "react";

interface ResourceProps
  extends Omit<GetInputPropsReturnType, keyof DropzoneProps>,
    DropzoneProps {
  accepts: (mime: MIME) => MIME_TYPE[];
  label?: string;
  withAsterisk?: boolean;
  supports?: string[];
  previews: FilePreview[];
}

type FilePreview = {
  name: string;
  size: number;
  type: string;
  url: string;
  status: Status;
  progress: number;
};

export function MultipleResourceUpload({
  previews: uploadedFiles,
  label,
  withAsterisk,
  accepts,
  error,
  supports = [],
  ...props
}: ResourceProps) {
  const accept = accepts(MIME_TYPES);

  const renderFile = (
    { name, size, status, progress }: FilePreview,
    index: number
  ) => {
    const color =
      status === "error"
        ? "red.9"
        : status === "uploaded"
        ? "accent.9"
        : "gray.4";

    const background =
      status === "error"
        ? "red.4"
        : status === "uploaded"
        ? "accent.4"
        : "gray.2";

    return (
      <Flex
        key={index}
        p={16}
        gap={14}
        className={clsx("border rounded-md bg-primary-background-subtle", {
          "border-red-9": status === "error",
          "border-primary-border-light": ["uploading", "uploaded"].includes(
            status
          ),
        })}
      >
        <Center
          p={6}
          bg={background}
          c={color}
          className='border-4 rounded-full border-accent-2 size-8'
        >
          <FileIcon />
        </Center>

        <Stack flex={1} gap={4}>
          <Stack gap={3}>
            <Flex gap={30} align='center' justify='space-between'>
              <Text fz={14} className='text-primary-text-body'>
                {name}
              </Text>
              {status === "uploaded" && (
                <Center
                  p={3}
                  c='white'
                  bg='green.9'
                  className='rounded-full size-4'
                >
                  <Check />
                </Center>
              )}
            </Flex>
            <Text fz={14} className='text-primary-text-subtle'>
              {prettyBytes(size)}
            </Text>
          </Stack>

          <Progress
            hidden={status !== "uploading"}
            color={color}
            value={progress}
            animated={status === "uploading"}
          />
        </Stack>
      </Flex>
    );
  };

  return (
    <Input.Wrapper
      label={label}
      withAsterisk={withAsterisk}
      component={Stack}
      classNames={{
        label: "prose-base/regular text-primary-text-body",
        root: "gap-1.5",
      }}
    >
      <Dropzone accept={accept} multiple {...props}>
        <Stack
          p={24}
          gap={12}
          align='center'
          className='border-dashed border rounded-md cursor-pointer border-primary-border-light bg-primary-background-white'
          flex={1}
        >
          <Dropzone.Accept>
            <Upload color='accent' />
          </Dropzone.Accept>
          <Dropzone.Idle>
            <Upload color='gray' />
          </Dropzone.Idle>
          <Dropzone.Reject>
            <Upload color='red' />
          </Dropzone.Reject>

          <Stack gap={10} align='center' ta='center'>
            <Text>
              <span className='text-primary-button-normal font-medium'>
                Click here to upload
              </span>{" "}
              <span className='text-primary-text-subtle'>or drag and drop</span>
            </Text>
            <Text hidden={!supports.length} fz={12}>
              {supports.join(", ").toLocaleUpperCase()}
            </Text>
          </Stack>
        </Stack>
      </Dropzone>

      {uploadedFiles.map(renderFile)}

      <Input.Error>{error}</Input.Error>
    </Input.Wrapper>
  );
}
