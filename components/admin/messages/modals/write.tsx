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
  Textarea,
  TextInput,
} from "@mantine/core";
import { FlowContainer } from "@/components/layout/flow-container";
import { APP, cast, MODALS } from "@/packages/libraries";
import { useFileUpload } from "@/packages/hooks/use-file-upload";
import { handleSuccess, handleError } from "@/packages/notification";
import { builder } from "@/builders";
import { requiredString } from "@/builders/types/shared";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AttachFile, Plane, TrashIcon } from "@/icons";

export enum MESSAGE_TYPE {
  OCCUPANT = "occupant",
  BROADCAST = "broadcast",
}

enum RECIPIENTS {
  ALL_HOUSES = "All Houses",
  ALL_ACTIVE_HOUSES = "All Active Houses",
  ALL_ADMINS = "All Admins",
}

export const schema = object({
  houseIds: array()
    .of(string().required("Recipient is required"))
    .min(1, "Recipient is required"),
  title: requiredString,
  content: requiredString,
});

interface WriteModalProps {
  view: string;
}

export function WriteModal({ view }: WriteModalProps) {
  const queryClient = useQueryClient();
  const estateId = toString(getCookie(APP.ESTATE_ID));

  const [files, setFiles] = useState<File[]>([]);

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
    onSuccess: () => {
      modals.close(MODALS.WRITE_BROADCAST_MESSAGE);
      queryClient.invalidateQueries({
        queryKey: builder.messages.get.table.get(view),
      });
      handleSuccess({
        message:
          view === MESSAGE_TYPE.OCCUPANT
            ? "Message sent to occupants"
            : "Broadcast sent to all houses",
      });
    },
    onError: handleError(),
  });

  const form = useForm({
    initialValues: {
      houseIds: [
        view === MESSAGE_TYPE.OCCUPANT
          ? houseNumbers?.[0]?.value ?? ""
          : RECIPIENTS.ALL_HOUSES,
      ],
      title: "",
      content: "",
      attachments: [""],
    },
    validate: yupResolver(schema),
    validateInputOnBlur: true,
    transformValues: (values) => {
      const { houseIds, title, content } = values;
      console.log(houseIds);
      return {
        houseIds: houseIds.includes(RECIPIENTS.ALL_HOUSES) ? [] : houseIds,
        title: cast.string(title),
        content: cast.string(content),
      };
    },
  });

  function handleSubmit() {
    const payload = {
      ...form.getTransformedValues(),
      estateId,
    };
    console.log(payload);
    mutate(payload);
  }

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
            withAsterisk
            placeholder='Recipients(Houses)'
            data={houseNumbers}
            {...form.getInputProps("houseIds")}
          />
        ) : (
          <MultiSelect
            label='To:'
            withAsterisk
            placeholder='Recipients'
            data={[RECIPIENTS.ALL_HOUSES]}
            {...form.getInputProps("houseIds")}
          />
        )}
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
            onClick={() => modals.close(MODALS.WRITE_BROADCAST_MESSAGE)}
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
