"use client";

import { builder } from "@/builders";
import { MinutesData } from "@/builders/types/meetings";
import { requiredString } from "@/builders/types/shared";
import { FlowContainer } from "@/components/layout/flow-container";
import { FlowEditor } from "@/components/layout/flow-editor";
import { ResourceUpload } from "@/components/shared/uploads/resource";
import { useMultipleFileUpload } from "@/packages/hooks/use-multiple-file-upload";
import { cast } from "@/packages/libraries";
import { APP, FILE } from "@/packages/libraries/enum";
import { handleError, handleSuccess } from "@/packages/notification";
import { Button, Select, TextInput } from "@mantine/core";
import { MS_WORD_MIME_TYPE, PDF_MIME_TYPE } from "@mantine/dropzone";
import { Form, useForm, yupResolver } from "@mantine/form";
import { modals } from "@mantine/modals";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { concat, toString } from "lodash";
import { toast } from "react-toastify";
import { object } from "yup";

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
    queryKey: builder.meetings.get.all.$get(),
    queryFn: () => builder.$use.meetings.get.all(estateId),
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

  const { mutate, isPending } = useMutation({
    mutationFn: builder.$use.meetings.minutes,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: builder.meetings.get.table.$get(),
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
    previews,
    onDelete,
    handleUpload,
    isPending: isUploading,
  } = useMultipleFileUpload({
    key: FILE.MINUTES,
    onError: () => {
      toast.error("Some files failed to upload, please try again.");
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
          supports={["pdf", "doc"]}
          previews={previews}
          onDrop={handleUpload}
          onDelete={onDelete}
          multiple={false}
          accepts={() => {
            return concat(PDF_MIME_TYPE, MS_WORD_MIME_TYPE);
          }}
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
