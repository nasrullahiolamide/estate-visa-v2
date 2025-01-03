"use client";

import { builder } from "@/builders";
import { MessagesData } from "@/builders/types/messages";
import { requiredString } from "@/builders/types/shared";
import { FlowContainer } from "@/components/layout/flow-container";
import { UploadAttachments } from "@/components/shared/chat/attachments/upload";
import { MESSAGE_TYPE } from "@/components/shared/chat/types";
import { ClockIcon, Plane, TrashIcon } from "@/icons";
import { APP, MODALS } from "@/packages/libraries";
import { handleError, handleSuccess } from "@/packages/notification";
import { Button, Flex, Text, Textarea, TextInput, Title } from "@mantine/core";
import { Form, useForm, yupResolver } from "@mantine/form";
import { modals } from "@mantine/modals";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { toString } from "lodash";
import { object } from "yup";

export const schema = object({
  subject: requiredString,
  content: requiredString,
});

interface EditModalProps {
  view: string;
  content: MessagesData;
}

export function EditModal({ view, content }: EditModalProps) {
  const queryClient = useQueryClient();
  const estateId = toString(getCookie(APP.ESTATE_ID));

  const { mutate, isPending } = useMutation({
    mutationFn: builder.$use.messages.edit,
    onError: handleError(),
    onSuccess: () => {
      modals.close(MODALS.EDIT_MESSAGE);
      queryClient.invalidateQueries({
        queryKey: builder.messages.get.id.$get(),
      });
      handleSuccess(
        `Message ${
          view === MESSAGE_TYPE.OCCUPANT ? "Sent" : "Updated"
        } Successfully`,
        { autoClose: 1200 }
      );
    },
  });

  const form = useForm({
    initialValues: {
      subject: content.subject,
      content: content.content,
      attachments: content.attachments,
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
        <div className='space-y-2'>
          {view === MESSAGE_TYPE.OCCUPANT ? (
            <Title order={2} fz={16}>
              To: {content.house.houseNumber}
            </Title>
          ) : (
            <Title order={2} fz={16}>
              To: All Houses
            </Title>
          )}
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
          withAsterisk
          {...form.getInputProps("subject")}
        />
        <Textarea
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
