"use client";

import { object } from "yup";
import { concat, toString } from "lodash";
import { toast } from "react-toastify";
import { modals } from "@mantine/modals";
import { Button, Select, TextInput } from "@mantine/core";
import { Form, useForm, yupResolver } from "@mantine/form";
import { builder } from "@/builders";
import { requiredString } from "@/builders/types/shared";
import { MinutesData } from "@/builders/types/meetings";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cast } from "@/packages/libraries";
import { handleSuccess, handleError } from "@/packages/notification";
import { useFileUpload } from "@/packages/hooks/use-file-upload";
import { FlowContainer } from "@/components/layout/flow-container";
import { FlowEditor } from "@/components/layout/flow-editor";
import {
  MS_EXCEL_MIME_TYPE,
  MS_WORD_MIME_TYPE,
  PDF_MIME_TYPE,
} from "@mantine/dropzone";
import { ResourceUpload } from "@/components/shared/uploads/resource";
import { APP, FILE } from "@/packages/libraries/enum";
import { getCookie } from "cookies-next";

const schema = object({
  title_id: requiredString,
  noOfAttendees: requiredString,
});

export interface MeetingMinutesFormProps {
  formType: "add" | "edit";
  meetingId?: string;
  data?: MinutesData;
}

export function MeetingMinutesForm({
  formType,
  meetingId,
  data,
}: MeetingMinutesFormProps) {
  const queryClient = useQueryClient();
  const estateId = toString(getCookie(APP.ESTATE_ID));

  const { data: meetings, isLoading } = useQuery({
    queryKey: builder.meetings.get.all.get(),
    queryFn: () => builder.use().meetings.get.all(estateId),
    select: (data) => {
      return data
        .filter(({ id, minutes }) => {
          if (id === meetingId) return true;
          return !minutes;
        })
        .map(({ id, title }) => ({
          value: id,
          label: title,
        }));
    },
  });

  console.log(meetings);

  const { mutate, isPending } = useMutation({
    mutationFn: builder.use().meetings.minutes,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: builder.meetings.get.table.get(),
      });
      handleSuccess({
        message: isEditing
          ? "Minute Updated Successfully"
          : "Minute Added Successfully",
      });
      modals.closeAll();
    },
    onError: handleError(),
  });

  const form = useForm({
    initialValues: {
      title_id: meetingId,
      noOfAttendees: data?.noOfAttendees ?? "",
      minutes: data?.minutes ?? "",
      file: data?.file ?? "",
      formType,
    },
    validate: yupResolver(schema),
    validateInputOnBlur: true,
    transformValues: (values) => {
      const { noOfAttendees, minutes, title_id } = values;
      return {
        ...values,
        title_id: cast.string(title_id),
        noOfAttendees: cast.number(noOfAttendees),
        minutes: `${minutes}`,
      };
    },
  });

  const {
    preview,
    handleUpload,
    status,
    progress,
    isPending: isUploading,
  } = useFileUpload({
    key: FILE.MINUTES,

    onError: () => {
      toast.error("Failed to upload resource");
    },

    onSuccess: ({ data }) => {
      form.clearFieldError("file");
      form.setFieldValue("file", data?.secure_url);
    },
  });

  function handleSubmit() {
    const { title_id, formType, ...payload } = form.getTransformedValues();
    mutate({
      id: title_id,
      data: payload,
    });
  }

  const isEditing = formType === "edit";

  return (
    <Form form={form} onSubmit={handleSubmit}>
      <FlowContainer
        className='bg-primary-background-white h-[550px] sm:h-full overflow-y-scroll sm:justify-center sm:scrollbar-none'
        gap={18}
        type='plain'
        bg='white'
      >
        <Select
          label='Meeting Title'
          data={meetings}
          placeholder='Select a meeting title'
          disabled={isLoading}
          nothingFoundMessage='No meetings available, please create one first.'
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
          multiple={false}
          {...form.getInputProps("file")}
        />
      </FlowContainer>
      <Button
        mt={20}
        w='100%'
        type='submit'
        disabled={isPending || isUploading}
        loading={isPending}
      >
        {isEditing ? "Save Changes" : "Add minutes"}
      </Button>
    </Form>
  );
}
