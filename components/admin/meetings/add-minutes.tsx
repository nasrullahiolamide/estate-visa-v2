"use client";

import { Button, TextInput } from "@mantine/core";
import { Form, useForm, yupResolver } from "@mantine/form";
import { FlowContainer } from "@/components/layout/flow-container";
import { cast, MODALS } from "@/packages/libraries";
import { object, string } from "yup";
import { FlowEditor } from "@/components/layout/flow-editor";
import { ResourceUpload } from "../shared/resource-upload";
import { useFileUpload } from "@/packages/hooks/use-file-upload";
import { toast } from "react-toastify";
import { concat } from "lodash";
import {
  MS_EXCEL_MIME_TYPE,
  MS_WORD_MIME_TYPE,
  PDF_MIME_TYPE,
} from "@mantine/dropzone";

const requiredString = string().required(
  "This field is required. Please enter the necessary information."
);

const schema = object({
  title: requiredString,
  no_of_attendees: requiredString,
});

export function AddNewMinutes() {
  const form = useForm({
    initialValues: {
      title: "",
      no_of_attendees: "",
      minutes: "",
    },
    validate: yupResolver(schema),
    validateInputOnBlur: true,
    transformValues: (values) => {
      const { title, no_of_attendees, minutes } = values;
      return {
        title: cast.string(title),
        no_of_attendees: cast.string(no_of_attendees),
        minutes: cast.string(minutes),
      };
    },
  });

  const handleSubmit = () => {};

  const { preview, handleUpload, status, progress } = useFileUpload({
    key: MODALS.ADD_MEETINGS_MINUTES,
    onError: () => {
      toast.error("Failed to upload resource");
    },
    onSuccess: ({ data }) => {
      form.clearFieldError("thumbnail_id");
      form.setFieldValue("upload_id", data?.id);
    },
  });

  return (
    <Form form={form} onSubmit={() => {}}>
      <FlowContainer
        className='rounded-2xl bg-primary-background-white'
        justify='center'
        gap={18}
        type='plain'
        bg='white'
      >
        <TextInput
          label='Meeting Title'
          placeholder='Board Meeting, Team Meeting, etc.'
          withAsterisk
          {...form.getInputProps("title")}
        />
        <TextInput
          type='number'
          label='Number of Attendees'
          placeholder='Enter the number of attendees'
          withAsterisk
          {...form.getInputProps("no_of_attendees")}
        />
        <FlowEditor
          label='Write Meeting Minutes'
          placeholder='Type something here...'
          {...form.getInputProps("minutes")}
        />

        <ResourceUpload
          label='Upload File'
          name={preview.name}
          size={preview.size}
          supports={["pdf", "ppt", "doc"]}
          accepts={() => {
            return concat(PDF_MIME_TYPE, MS_EXCEL_MIME_TYPE, MS_WORD_MIME_TYPE);
          }}
          completed={progress?.completed}
          onDrop={handleUpload}
          status={status}
          multiple
          {...form.getInputProps("upload_id")}
        />

        <Button mt={10} type='submit' onClick={handleSubmit}>
          Add Minutes
        </Button>
      </FlowContainer>
    </Form>
  );
}
