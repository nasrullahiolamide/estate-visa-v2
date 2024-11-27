"use client";

import { object } from "yup";
import { toString } from "lodash";
import { getCookie } from "cookies-next";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { modals } from "@mantine/modals";
import { Form, useForm, yupResolver } from "@mantine/form";
import { Button, Flex, Text, Textarea, TextInput, Title } from "@mantine/core";

import { handleSuccess, handleError } from "@/packages/notification";
import { requiredString } from "@/builders/types/shared";
import { MessagesData } from "@/builders/types/messages";
import { APP, MODALS } from "@/packages/libraries";
import { builder } from "@/builders";

import { UploadAttachments } from "@/components/shared/chat/attachments/upload";
import { FlowContainer } from "@/components/layout/flow-container";
import { ClockIcon, Plane, TrashIcon } from "@/icons";
import { FlowEditor } from "@/components/layout/flow-editor";

export const schema = object({
  subject: requiredString,
  content: requiredString,
});

interface ReplyModalProps {
  content: MessagesData;
}

export function ReplyModal({ content }: ReplyModalProps) {
  const queryClient = useQueryClient();
  const senderId = toString(getCookie(APP.USER_ID));

  const { mutate, isPending } = useMutation({
    mutationFn: builder.use().messages.reply,
    onError: handleError(),
    onSuccess: () => {
      modals.close(MODALS.REPLY_MESSAGE);
      queryClient.invalidateQueries({
        queryKey: builder.messages.get.id.get(),
      });
      handleSuccess({
        autoClose: 1000,
        message: "Message sent successfully",
      });
    },
  });

  const form = useForm({
    initialValues: {
      subject: content.subject,
      content: "",
      attachments: null,
    },
    validate: yupResolver(schema),
    validateInputOnBlur: true,
    transformValues: (values) => {
      const { subject, content } = values;
      return {
        subject,
        content,
      };
    },
  });

  function handleSubmit() {
    const payload = {
      ...form.getTransformedValues(),
      senderId,
    };
    mutate({ id: content.id, data: payload });
  }

  console.log(content);

  return (
    <Form form={form} onSubmit={handleSubmit}>
      <FlowContainer
        className='rounded-2xl bg-primary-background-white'
        justify='center'
        gap={18}
        type='plain'
        bg='white'
      >
        <div className='space-y-2'>
          <Title order={2} fz={16}>
            To:{" "}
            {content.house?.houseNumber || content.parent?.house.houseNumber}
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
        <TextInput
          label='Subject'
          disabled
          withAsterisk
          {...form.getInputProps("subject")}
        />
        <FlowEditor
          label={
            <Flex align='center' justify='space-between'>
              <span>
                Message <span className='text-red-5'>*</span>
              </span>
              <UploadAttachments />
            </Flex>
          }
          placeholder='Type something here...'
          rightSection={<Plane />}
          {...form.getInputProps("content")}
        />

        <Flex mt={10} gap='md'>
          <Button
            flex={1}
            type='button'
            color='red'
            variant='outline'
            leftSection={<TrashIcon />}
            onClick={() => modals.close(MODALS.REPLY_MESSAGE)}
            disabled={isPending}
          >
            Discard
          </Button>
          <Button
            flex={1}
            type='submit'
            rightSection={<Plane />}
            disabled={isPending}
            loading={isPending}
          >
            Send
          </Button>
        </Flex>
      </FlowContainer>
    </Form>
  );
}
