import { Avatar, Flex, Input, Stack, Text } from "@mantine/core";
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { GetInputPropsReturnType } from "@mantine/form/lib/types";

import clsx from "clsx";

interface ThumbnailUploadProps
  extends DropzoneProps,
    Omit<GetInputPropsReturnType, keyof DropzoneProps> {
  withAsterisk?: boolean;
  label: string;
  name?: string;
  url?: string;
}

export function ThumbnailUpload({
  url,
  name,
  withAsterisk,
  className,
  label,
  accept = IMAGE_MIME_TYPE,
  error,
  ...props
}: ThumbnailUploadProps) {
  return (
    <Input.Wrapper
      withAsterisk={withAsterisk}
      label={label}
      component={Stack}
      classNames={{
        label: "prose-lg/medium text-primary-text-body",
        root: "gap-1.5",
      }}
    >
      <Flex
        gap={20}
        align="center"
        className="rounded-xl bg-primary-background-white"
        flex={1}
        justify="space-between"
      >
        <Avatar
          size={64}
          radius={9999}
          className="bg-primary-text-normal"
          src={url ?? "/vectors/image-plus.svg"}
          alt={name ?? "thumbnail"}
          classNames={{
            image: clsx({
              "p-4": !url,
            }),
          }}
        />
        <Dropzone accept={accept} flex={1} {...props}>
          <Stack
            gap={4}
            align="center"
            className={clsx(
              "border border-primary-border-light bg-primary-background-white",
              "prose-sm/regular text-primary-text-subtle",
              "rounded-xl cursor-pointer"
            )}
            px={10}
            py={8}
          >
            <Text>
              <Text span className="prose-sm/medium text-primary-button-normal">
                Click to upload
              </Text>{" "}
              <Text span className="prose-sm/regular">
                or drag and drop here
              </Text>
            </Text>

            <Text className="prose-xs/regular">
              SVG, PNG, JPG or GIF (max. 800x400px)
            </Text>
          </Stack>
        </Dropzone>
      </Flex>
      <Input.Error>{error}</Input.Error>
    </Input.Wrapper>
  );
}
