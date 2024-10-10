import { Center, Flex, Input, Progress, Stack, Text } from "@mantine/core";
import { Dropzone, DropzoneProps, MIME_TYPES } from "@mantine/dropzone";
import { GetInputPropsReturnType } from "@mantine/form/lib/types";

import { MIME, MIME_TYPE } from "@/builders/types/shared";
import { Status } from "@/hooks/use-file-upload";
import { pass } from "@/libraries/pass";
import { Check } from "@/svgs/check";
import { FileIcon } from "@/svgs/file-icon";

import { Upload } from "./upload";

import clsx from "clsx";
import prettyBytes from "pretty-bytes";

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

  const pending = (
    <Input.Wrapper
      label={label}
      withAsterisk={withAsterisk}
      component={Stack}
      classNames={{
        label: "prose-lg/medium text-primary-text-body",
        root: "gap-1.5",
      }}
    >
      <Dropzone accept={accept} {...props}>
        <Stack
          px={24}
          py={16}
          gap={12}
          align="center"
          className="border rounded-md cursor-pointer border-primary-border-light bg-primary-background-white"
          flex={1}
        >
          <Dropzone.Accept>
            <Upload color="accent" />
          </Dropzone.Accept>
          <Dropzone.Idle>
            <Upload color="gray" />
          </Dropzone.Idle>
          <Dropzone.Reject>
            <Upload color="gray" />
          </Dropzone.Reject>

          <Stack gap={4} align="center">
            <Text>
              <span className="text-primary-button-normal">
                Click to upload
              </span>{" "}
              <span className="text-primary-text-subtle">
                or drag and drop here
              </span>
            </Text>

            <Text
              hidden={!supports.length}
              className="prose-sm/regular text-primary-text-subtle"
            >
              <Text span fw={500}>
                Supported formats:
              </Text>{" "}
              {supports.join(", ").toLocaleUpperCase()}
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
      p={16}
      gap={14}
      className={clsx("border rounded-md bg-primary-background-subtle", {
        "border-red-9": status === "error",
        "border-primary-button-normal": status === "uploaded",
        "border-primary-border-light": [
          "pending",
          "dropped",
          "uploading",
        ].includes(status),
      })}
    >
      <Center
        p={6}
        bg={background}
        c={color}
        className="border-4 rounded-full border-accent-2 size-8"
      >
        <FileIcon />
      </Center>

      <Stack flex={1} gap={4}>
        <Stack gap={0}>
          <Flex gap={8} align="center" justify="space-between">
            <Text className="text-primary-text-body">{name}</Text>
            <Center p={3} c="white" bg={color} className="rounded-full size-4">
              <Check />
            </Center>
          </Flex>
          <Text className="text-primary-text-subtle">
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
