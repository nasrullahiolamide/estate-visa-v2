"use client";

import { builder } from "@/builders";
import { requiredString } from "@/builders/types/shared";
import { FlowContainer } from "@/components/layout/flow-container";
import { UploadAttachments } from "@/components/shared/chat/attachments/upload";
import { Plane, TrashIcon } from "@/icons";
import { APP, cast, MODALS } from "@/packages/libraries";
import { handleError, handleSuccess } from "@/packages/notification";
import { Button, Flex, Select, Textarea, TextInput } from "@mantine/core";
import { Form, useForm, yupResolver } from "@mantine/form";
import { modals } from "@mantine/modals";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { toString } from "lodash";
import { object } from "yup";

export const schema = object({
  recipientId: requiredString,
  title: requiredString,
  content: requiredString,
});

export function WriteModal() {
  const queryClient = useQueryClient();
  const estateId = toString(getCookie(APP.ESTATE_ID));

  const { mutate, isPending } = useMutation({
    mutationFn: builder.$use.messages.post,
    onError: handleError(),
    onSuccess: () => {
      modals.close(MODALS.WRTIE_MESSAGE);
      queryClient.invalidateQueries({
        queryKey: builder.messages.get.user.$get(),
      });
      handleSuccess("Message Sent Successfully", { autoClose: 1200 });
    },
  });

  const form = useForm({
    initialValues: {
      title: "",
      content: "",
      recipientId: "",
      attachments: [""],
    },
    validate: yupResolver(schema),
    validateInputOnBlur: true,
    transformValues: (values) => {
      const { recipientId, title, content } = values;
      return {
        recipientId: cast.string(recipientId),
        title: cast.string(title),
        content: cast.string(content),
      };
    },
  });

  function handleSubmit() {
    mutate({
      ...form.getTransformedValues(),
      estateId,
    });
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
        <Select
          label='To:'
          withAsterisk
          placeholder='Select Recipient'
          data={["Admin", "Sub Admin"]}
          {...form.getInputProps("recipientId")}
        />
        <TextInput
          label='Subject'
          withAsterisk
          {...form.getInputProps("title")}
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
            onClick={() => modals.close(MODALS.WRTIE_MESSAGE)}
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
            Send
          </Button>
        </Flex>
      </FlowContainer>
    </Form>
  );
}
