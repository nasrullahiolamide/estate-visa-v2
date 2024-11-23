"use client";

import { useState } from "react";
import { object } from "yup";
import { modals } from "@mantine/modals";
import { Form, useForm, yupResolver } from "@mantine/form";
import {
  Button,
  FileButton,
  Flex,
  MultiSelect,
  TextInput,
} from "@mantine/core";
import { FlowContainer } from "@/components/layout/flow-container";
import { FlowEditor } from "@/components/layout/flow-editor";
import { cast, MODALS } from "@/packages/libraries";
import { requiredString } from "@/builders/types/shared";
import { AttachFile, Plane, TrashIcon } from "@/icons";

export const schema = object({
  to: requiredString,
  subject: requiredString,
  message: requiredString,
});

export function OccupantWriteModal() {
  const [files, setFiles] = useState<File[]>([]);

  const form = useForm({
    initialValues: {
      to: [],
      subject: "",
      message: "",
    },
    validate: yupResolver(schema),
    validateInputOnBlur: true,
    transformValues: (values) => {
      const { to, subject, message } = values;
      return {
        to: cast.string(to),
        subject: cast.string(subject),
        message: cast.string(message),
      };
    },
  });

  const handleSubmit = () => {};

  return (
    <Form form={form} onSubmit={handleSubmit}>
      <FlowContainer
        className='rounded-2xl bg-primary-background-white'
        justify='center'
        gap={18}
        type='plain'
        bg='white'
      >
        <MultiSelect
          label='To:'
          withAsterisk
          placeholder='Select recipient'
          data={["Admin", "Sub Admin"]}
          {...form.getInputProps("to")}
        />

        <TextInput
          label='Subject'
          withAsterisk
          {...form.getInputProps("subject")}
        />
        <FlowEditor
          label={
            <Flex align='center' justify='space-between'>
              <span>
                Message <span className='text-red-5'>*</span>
              </span>
              <span className='cursor-pointer'>
                <FileButton onChange={setFiles} multiple>
                  {(props) => <AttachFile width={24} {...props} />}
                </FileButton>
              </span>
            </Flex>
          }
          placeholder='Type something here...'
          rightSection={<Plane />}
          {...form.getInputProps("message")}
        />

        <Flex justify='space-between' mt={10}>
          <Button
            type='button'
            color='red'
            variant='outline'
            leftSection={<TrashIcon />}
            onClick={() => modals.close(MODALS.WRTIE_MESSAGE)}
          >
            Discard
          </Button>
          <Button type='submit' rightSection={<Plane />}>
            Send
          </Button>
        </Flex>
      </FlowContainer>
    </Form>
  );
}
