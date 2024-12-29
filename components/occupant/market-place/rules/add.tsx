"use client";

import { FlowContainer } from "@/components/layout/flow-container";
import { FlowEditor } from "@/components/layout/flow-editor";
import { ResourceUpload } from "@/components/shared/uploads/resource";
import { CalenderIcon } from "@/icons";
import { useMultipleFileUpload } from "@/packages/hooks/use-multiple-file-upload";
import { cast } from "@/packages/libraries";
import { Button, Select, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import {
  MS_EXCEL_MIME_TYPE,
  MS_WORD_MIME_TYPE,
  PDF_MIME_TYPE,
} from "@mantine/dropzone";
import { Form, useForm, yupResolver } from "@mantine/form";
import { concat } from "lodash";
import { toast } from "react-toastify";
import { object, string } from "yup";

const requiredString = string().required("This is a required field.");

const schema = object({
  ruleTitle: requiredString,
  content: requiredString,
  date: requiredString,
  applies_to: requiredString,
  status: requiredString,
});

export function MarketRuleForm() {
  const form = useForm({
    initialValues: {
      ruleTitle: "",
      content: "",
      date: "",
      applies_to: "",
      status: "",
    },
    validate: yupResolver(schema),
    validateInputOnBlur: true,
    transformValues: (values) => {
      const { ruleTitle, content, date, applies_to, status } = values;
      return {
        ruleTitle: cast.string(ruleTitle),
        content: cast.string(content),
        date: cast.string(date),
        applies_to: cast.string(applies_to),
        status: cast.string(status),
      };
    },
  });

  const handleSubmit = () => {};

  const { previews, handleUpload, onDelete } = useMultipleFileUpload({
    key: "others",
    onError: () => {
      toast.error("Failed to upload resource");
    },
    onSuccess: ({ data }) => {
      form.clearFieldError("thumbnail_id");
      form.setFieldValue("upload_id", data?.secure_url);
    },
  });

  return (
    <Form form={form} onSubmit={() => {}}>
      <FlowContainer
        p={0}
        className='bg-primary-background-white h-[600px] overflow-scroll'
        gap={18}
        type='plain'
      >
        <TextInput
          label='Rule Title'
          placeholder='Enter the title of the rule'
          withAsterisk
          {...form.getInputProps("ruleTitle")}
        />
        <FlowEditor
          label='Content'
          placeholder='Type something here...'
          withAsterisk
          {...form.getInputProps("content")}
        />

        <DatePickerInput
          label='Date'
          rightSection={<CalenderIcon />}
          withAsterisk
          //   {...form.getInputProps("date")}
        />
        <ResourceUpload
          label='Upload File'
          supports={["pdf", "ppt", "doc"]}
          accepts={() => {
            return concat(PDF_MIME_TYPE, MS_EXCEL_MIME_TYPE, MS_WORD_MIME_TYPE);
          }}
          previews={previews}
          onDelete={onDelete}
          onDrop={handleUpload}
          multiple
          {...form.getInputProps("upload_id")}
        />

        <Select
          label='Applies To:'
          //   disabled={isViewing}
          data={[
            {
              label: "Occupants",
              value: "occupants",
            },
            {
              label: "Sub Occupants",
              value: "sub-occupants",
            },
            {
              label: "All Users",
              value: "all-users",
            },
          ]}
          {...form.getInputProps("applies_to")}
        />
        <Select
          label='Status'
          //   disabled={isViewing}
          data={[
            {
              value: "active",
              label: "Active",
            },
            {
              value: "suspended",
              label: "Suspended",
            },
          ]}
          {...form.getInputProps("status")}
        />
      </FlowContainer>
      <Button mt={25} type='submit' onClick={handleSubmit} w='100%'>
        Save
      </Button>
    </Form>
  );
}
