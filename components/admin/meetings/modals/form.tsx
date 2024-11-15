"use client";

import { Button, Select, TextInput } from "@mantine/core";
import { Form, useForm, yupResolver } from "@mantine/form";
import { FlowContainer } from "@/components/layout/flow-container";
import { cast, MODALS } from "@/packages/libraries";
import { object } from "yup";
import { FlowEditor } from "@/components/layout/flow-editor";
import { ResourceUpload } from "../../shared/resource-upload";
import { useFileUpload } from "@/packages/hooks/use-file-upload";
import { toast } from "react-toastify";
import { concat } from "lodash";
import {
  MS_EXCEL_MIME_TYPE,
  MS_WORD_MIME_TYPE,
  PDF_MIME_TYPE,
} from "@mantine/dropzone";
import { builder } from "@/builders";
import { useQuery } from "@tanstack/react-query";
import { requiredString } from "@/builders/types/shared";

const schema = object({
  title: requiredString,
  noOfAttendees: requiredString,
});

export interface MeetingMinutesFormProps {
  formType: "add" | "edit";
  meetingId?: string;
}

export function MeetingMinutesForm({
  formType,
  meetingId,
}: MeetingMinutesFormProps) {
  const { data: meetings } = useQuery({
    queryKey: builder.meetings.get.all.get(),
    queryFn: () => builder.use().meetings.get.all(),
    select: (data) => {
      return data.map((meeting) => ({
        value: meeting.id ?? "",
        label: meeting.title,
      }));
    },
  });

  const form = useForm({
    initialValues: {
      title_id: meetingId,
      noOfAttendees: "",
      minutes: "",
      formType,
    },
    validate: yupResolver(schema),
    validateInputOnBlur: true,
    transformValues: (values) => {
      const { noOfAttendees, minutes } = values;
      return {
        noOfAttendees: cast.string(noOfAttendees),
        minutes: cast.string(minutes),
      };
    },
  });

  const handleSubmit = () => {};

  const { preview, handleUpload, status, progress } = useFileUpload({
    key: MODALS.FORM_DETAILS,
    onError: () => {
      toast.error("Failed to upload resource");
    },
    onSuccess: ({ data }) => {
      form.clearFieldError("thumbnail_id");
      form.setFieldValue("file", data?.id);
    },
  });

  return (
    <Form form={form} onSubmit={() => {}}>
      <FlowContainer
        className='bg-primary-background-white h-[550px] sm:h-full overflow-scroll sm:justify-center'
        gap={18}
        type='plain'
        bg='white'
      >
        <Select
          label='Meeting Title'
          data={meetings}
          placeholder='Select a meeting title'
          withAsterisk
          {...form.getInputProps("title_id")}
        />
        <TextInput
          type='number'
          label='Number of Attendees'
          placeholder='Enter the number of attendees'
          withAsterisk
          {...form.getInputProps("noOfAttendees")}
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
      </FlowContainer>
      <Button mt={10} type='submit' onClick={handleSubmit} w='100%'>
        Add Minutes
      </Button>
    </Form>
  );
}
