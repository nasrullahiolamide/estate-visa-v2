"use client";

import { Button, Flex, Select, TextInput } from "@mantine/core";
import { Form, useForm, yupResolver } from "@mantine/form";
import { FlowContainer } from "@/components/layout/flow-container";
import { cast, MODALS } from "@/packages/libraries";

import { Plane, TrashIcon } from "@/icons";
import { modals } from "@mantine/modals";
import { FlowEditor } from "@/components/layout/flow-editor";

export function BroadcastModal() {
  const form = useForm({
    initialValues: {
      to: "All houses",
      subject: "",
      message: "",
    },
    // validate: yupResolver(schema),
    validateInputOnBlur: true,
    transformValues: (values) => {
      const { to, subject, message } = values;
      return {
        to: cast.string(name),
        subject: cast.string(location),
        message: cast.string(status),
      };
    },
  });

  const handleSubmit = () => {};

  return (
    <Form form={form} onSubmit={() => {}}>
      <FlowContainer
        className='rounded-2xl bg-primary-background-white'
        justify='center'
        gap={18}
        type='plain'
        bg='white'
      >
        <Select
          label='To'
          withAsterisk
          data={[
            "All houses",
            "All active houses",
            "All Sub Admins",
            "All active Sub Admins",
          ]}
          {...form.getInputProps("to")}
        />
        <TextInput
          label='Subject'
          withAsterisk
          {...form.getInputProps("subject")}
        />
        <FlowEditor
          label='Message'
          withAsterisk
          placeholder='Type something here...'
          {...form.getInputProps("message")}
        />

        <Flex justify='space-between' mt={10}>
          <Button
            type='button'
            color='red'
            variant='outline'
            leftSection={<TrashIcon />}
            onClick={() => modals.close(MODALS.BROADCAST_MESSAGE)}
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
