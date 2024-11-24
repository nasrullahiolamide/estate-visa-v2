"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { array, object, string } from "yup";
import { toString } from "lodash";
import { getCookie } from "cookies-next";
import { modals } from "@mantine/modals";
import { Form, useForm, yupResolver } from "@mantine/form";
import {
  Button,
  FileButton,
  Flex,
  MultiSelect,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { FlowContainer } from "@/components/layout/flow-container";
import { APP, cast, MODALS } from "@/packages/libraries";
import { useFileUpload } from "@/packages/hooks/use-file-upload";
import { handleSuccess, handleError } from "@/packages/notification";
import { builder } from "@/builders";
import { requiredString } from "@/builders/types/shared";
import { MessagesData } from "@/builders/types/messages";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AttachFile, ClockIcon, Plane, TrashIcon } from "@/icons";
import { FlowEditor } from "@/components/layout/flow-editor";

export enum MESSAGE_TYPE {
  OCCUPANT = "occupant",
  BROADCAST = "broadcast",
}

export const schema = object({
  subject: requiredString,
  content: requiredString,
});

interface EditModalProps {
  view: string;
  content: MessagesData & { houseIds?: string[] };
}

export function EditModal({ view, content }: EditModalProps) {
  const queryClient = useQueryClient();
  const estateId = toString(getCookie(APP.ESTATE_ID));

  const [files, setFiles] = useState<File[]>([]);

  const { preview, handleUpload, status, progress } = useFileUpload({
    key: "messages",
    onError: () => {
      toast.error("Failed to upload resource");
    },
    onSuccess: ({ data }) => {
      form.setFieldValue("attachments", [
        ...form.values.attachments,
        data.secure_url,
      ]);
    },
  });

  const { data: houseNumbers } = useQuery({
    queryKey: builder.houses.list.all.get(),
    queryFn: () => builder.use().houses.list.all(estateId),
    select: (houses) => {
      return houses
        .filter(({ noOfOccupants }) => noOfOccupants > 0)
        .map(({ id, houseNumber }) => ({
          value: id,
          label: houseNumber,
        }));
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: builder.use().messages.edit,
    onSuccess: () => {
      modals.close(MODALS.EDIT_MESSAGE);
      queryClient.invalidateQueries({
        queryKey: builder.messages.get.id.get(content.id),
      });
      handleSuccess({
        message: "Message updated successfully",
      });
    },
    onError: handleError(),
  });

  const form = useForm({
    initialValues: {
      houseIds: [] as string[],
      subject: content.subject,
      content: content.content,
      attachments: content.attachments,
    },
    validate: yupResolver(schema),
    validateInputOnBlur: true,
    transformValues: (values) => {
      const { houseIds, subject, content } = values;
      return {
        houseIds: view === MESSAGE_TYPE.BROADCAST ? [] : houseIds,
        subject,
        content,
      };
    },
  });

  function handleSubmit() {
    const payload = {
      ...form.getTransformedValues(),
      estateId,
    };

    mutate({ id: content.id, data: payload });
  }

  return (
    <Form form={form} onSubmit={handleSubmit}>
      <FlowContainer
        className='rounded-2xl bg-primary-background-white'
        justify='center'
        gap={18}
        type='plain'
        bg='white'
      >
        {view === MESSAGE_TYPE.OCCUPANT ? (
          <MultiSelect
            label='To:'
            data={houseNumbers}
            disabled
            {...form.getInputProps("houseIds")}
          />
        ) : (
          <div className='space-y-2'>
            <Title order={2} fz={16}>
              To: All Houses
            </Title>
            <Flex align='center' gap={4}>
              <ClockIcon width={14} height={14} />
              <Text className='text-gray-300 space-x-1' fz={12}>
                <span>{content?.localDate}</span>
                <span>at</span>
                <span className='uppercase'>{content?.localTime}</span>
              </Text>
            </Flex>
          </div>
        )}
        <TextInput
          label='Subject'
          withAsterisk
          {...form.getInputProps("subject")}
        />
        <Textarea
          label={
            <Flex align='center' justify='space-between'>
              <span>
                Message <span className='text-red-5'>*</span>
              </span>
              <span className='cursor-pointer'>
                <FileButton onChange={() => {}} multiple>
                  {(props) => <AttachFile width={24} {...props} />}
                </FileButton>
              </span>
            </Flex>
          }
          placeholder='Type something here...'
          rightSection={<Plane />}
          {...form.getInputProps("content")}
        />

        <Flex justify='space-between' mt={10}>
          <Button
            type='button'
            color='red'
            variant='outline'
            leftSection={<TrashIcon />}
            onClick={() => modals.close(MODALS.EDIT_MESSAGE)}
            disabled={isPending}
          >
            Discard
          </Button>
          <Button
            type='submit'
            rightSection={<Plane />}
            disabled={isPending}
            loading={isPending}
          >
            Save
          </Button>
        </Flex>
      </FlowContainer>
    </Form>
  );
}
