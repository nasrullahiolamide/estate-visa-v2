import clsx from "clsx";
import prettyBytes from "pretty-bytes";

import { MIME, MIME_TYPE } from "@/builders/types/shared";
import { Check, FileIcon, TrashIcon } from "@/icons";
import { Status } from "@/packages/hooks/use-file-upload";
import { pass } from "@/packages/libraries";
import {
  Center,
  Flex,
  Input,
  Progress,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import { Dropzone, DropzoneProps, MIME_TYPES } from "@mantine/dropzone";
import { GetInputPropsReturnType } from "@mantine/form/lib/types";
import { Upload } from "./upload-icon";

interface ResourceProps
  extends Omit<GetInputPropsReturnType, keyof DropzoneProps>,
    DropzoneProps {
  status: Status;
  accepts: (mime: MIME) => MIME_TYPE[];
  name?: string;
  completed?: number;
  label?: string;
  size?: number;
  supports?: string[];
  withAsterisk?: boolean;
}

export function ResourceUpload({
  label,
  className,
  withAsterisk,
  accepts,
  error,
  name,
  size,
  completed,
  status,
  supports = [],
  ...props
}: ResourceProps) {
  const accept = accepts(MIME_TYPES);

  const MAX_SIZE = 4 * 1024 * 1024;

  const pending = (
    <Input.Wrapper
      label={label}
      withAsterisk={withAsterisk}
      component={Stack}
      classNames={{
        label: "prose-sm/regular text-primary-text-body",
        root: "gap-1.5",
      }}
    >
      <Dropzone accept={accept} {...props} maxSize={MAX_SIZE}>
        <Stack
          p={24}
          gap={12}
          align='center'
          className=' border-dashed border rounded-md cursor-pointer border-primary-border-light bg-primary-background-white'
          flex={1}
        >
          <Dropzone.Accept>
            <Upload color='accent' />
          </Dropzone.Accept>
          <Dropzone.Idle>
            <Upload color='gray' />
          </Dropzone.Idle>
          <Dropzone.Reject>
            <Upload color='gray' />
          </Dropzone.Reject>

          <Stack gap={10} align='center' ta='center'>
            <Text fz={14}>
              <span className='text-primary-button-normal font-medium'>
                Click here to upload
              </span>{" "}
              <span className='text-primary-text-subtle'>or drag and drop</span>
            </Text>

            <Text hidden={!supports.length} fz={12}>
              {supports.join(", ").toLocaleUpperCase()}
            </Text>

            <Text fz={12} className='text-primary-text-subtle'>
              Max file size: {prettyBytes(MAX_SIZE)}
            </Text>
          </Stack>
        </Stack>
      </Dropzone>

      <Input.Error>{error}</Input.Error>
    </Input.Wrapper>
  );

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

  const upload = (
    <Flex
      pos='relative'
      p={16}
      gap={14}
      className={clsx("border rounded-md bg-primary-background-subtle", {
        "border-red-9": status === "error",
        "border-primary-border-light": [
          "pending",
          "dropped",
          "uploading",
          "uploaded",
        ].includes(status),
      })}
    >
      <Tooltip label='Remove' position='top'>
        <Center
          bg='white'
          w={25}
          h={25}
          className={clsx(
            "absolute -top-4 -right-0 text-primary-text-subtle rounded-full",
            "cursor-pointer border border-primary-border-light"
          )}
        >
          <TrashIcon width={14} />
        </Center>
      </Tooltip>

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
            <Center p={3} c='white' bg={color} className='rounded-full size-4'>
              <Check />
            </Center>
          </Flex>
          <Text fz={14} className='text-primary-text-subtle'>
            {prettyBytes(pass.number(size))}
          </Text>
        </Stack>

        <Progress
          hidden={status !== "uploading"}
          color={color}
          value={pass.number(completed)}
          animated={status === "uploading"}
        />
      </Stack>
    </Flex>
  );

  return status === "pending" ? pending : upload;
}
