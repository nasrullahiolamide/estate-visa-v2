"use client";

import { array, object, string } from "yup";
import { toString } from "lodash";
import { getCookie } from "cookies-next";
import { modals } from "@mantine/modals";
import { Form, useForm, yupResolver } from "@mantine/form";
import { Button, Flex, Select, Textarea, TextInput } from "@mantine/core";
import { FlowContainer } from "@/components/layout/flow-container";
import { APP, cast, MODALS } from "@/packages/libraries";
import { handleSuccess, handleError } from "@/packages/notification";
import { builder } from "@/builders";
import { requiredString } from "@/builders/types/shared";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plane, TrashIcon } from "@/icons";
import { UploadAttachments } from "../../shared/chat/attachments/upload";
import { MESSAGE_TYPE } from "../../shared/chat/types";
import { FlowEditor } from "@/components/layout/flow-editor";

export const schema = object({
  houseIds: requiredString,
  title: requiredString,
  content: requiredString,
});

interface WriteModalProps {
  view: string;
}

export function WriteModal({ view }: WriteModalProps) {
  const queryClient = useQueryClient();
  const estateId = toString(getCookie(APP.ESTATE_ID));

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
    mutationFn: builder.use().messages.post,
    onError: handleError(),
    onSuccess: () => {
      modals.close(MODALS.WRTIE_MESSAGE);
      queryClient.invalidateQueries({
        queryKey: builder.messages.get.table.get(),
      });
      handleSuccess({
        message:
          view === MESSAGE_TYPE.OCCUPANT
            ? "Message sent to occupants"
            : "Broadcast sent to all houses",
      });
    },
  });

  const form = useForm({
    initialValues: {
      houseIds: "",
      title: "",
      content: "",
      attachments: [""],
    },
    validate: yupResolver(schema),
    validateInputOnBlur: true,
    transformValues: (values) => {
      const { houseIds, title, content } = values;
      return {
        houseIds: view === MESSAGE_TYPE.BROADCAST ? [] : [houseIds],
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
        {view === MESSAGE_TYPE.OCCUPANT ? (
          <Select
            label='To:'
            withAsterisk
            placeholder='Recipients(Houses)'
            data={houseNumbers}
            {...form.getInputProps("houseIds")}
          />
        ) : (
          <Select
            label='To:'
            withAsterisk
            placeholder='Recipients'
            data={["All Houses"]}
            {...form.getInputProps("houseIds")}
          />
        )}
        <TextInput
          label='Subject'
          withAsterisk
          {...form.getInputProps("title")}
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

        <Flex gap='md' mt={10}>
          <Button
            flex={1}
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
