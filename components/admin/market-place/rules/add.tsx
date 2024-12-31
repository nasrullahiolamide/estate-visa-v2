"use client";

import { builder } from "@/builders";
import {
  MarketRulesData,
  UpdateMarketRulesData,
} from "@/builders/types/market-rules";
import { requiredString } from "@/builders/types/shared";
import { FlowContainer } from "@/components/layout/flow-container";
import { FlowEditor } from "@/components/layout/flow-editor";
import { ResourceUpload } from "@/components/shared/uploads/resource";
import { CalenderIcon } from "@/icons";
import { useFileUpload } from "@/packages/hooks/use-file-upload";
import { APP, MODALS } from "@/packages/libraries";
import { handleError, handleSuccess } from "@/packages/notification";
import { Button, Select, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import {
  MS_EXCEL_MIME_TYPE,
  MS_WORD_MIME_TYPE,
  PDF_MIME_TYPE,
} from "@mantine/dropzone";
import { Form, useForm, yupResolver } from "@mantine/form";
import { modals } from "@mantine/modals";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { concat, toString } from "lodash";
import { toast } from "react-toastify";
import { object } from "yup";

export interface MarketRuleFormProps extends Partial<MarketRulesData> {
  viewId: "edit" | "view" | "add";
}

const schema = object({
  title: requiredString,
  content: requiredString,
  date: requiredString,
  appliesTo: requiredString,
  status: requiredString,
});

export function MarketRuleForm({ viewId, ...data }: MarketRuleFormProps) {
  const estateId = toString(getCookie(APP.ESTATE_ID));
  const queryClient = useQueryClient();

  const {
    title = "",
    content = "",
    date = Date.now().toString(),
    appliesTo = "",
    status = "",
    image = "",
  } = data;

  const { mutate, isPending } = useMutation({
    mutationFn: builder.$use.market_rules.post,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: builder.market_rules.get.$get(),
      });
      handleSuccess({
        message: "Market Rule Added Successfully",
      });
      modals.close(MODALS.FORM_DETAILS);
    },
    onError: handleError(),
  });

  const form = useForm<UpdateMarketRulesData>({
    initialValues: {
      title,
      content,
      date,
      appliesTo,
      status,
      image,
      estateId,
    },
    validate: yupResolver(schema),
    validateInputOnBlur: true,
  });

  const { previews, handleUpload, onDelete } = useFileUpload({
    key: "minutes",
    onError: () => {
      toast.error("Failed to upload resource");
    },
    onSuccess: ({ data }) => {
      form.clearFieldError("image");
      form.setFieldValue("image", data?.secure_url);
    },
  });

  function handleSubmit(values: typeof form.values) {
    mutate(values);
  }

  const isViewing = form.values.status === "inactive";

  return (
    <Form form={form} onSubmit={handleSubmit}>
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
          {...form.getInputProps("title")}
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
          {...form.getInputProps("date")}
        />

        <ResourceUpload
          multiple
          label='Upload File'
          supports={["pdf", "ppt", "doc"]}
          accepts={() => {
            return concat(PDF_MIME_TYPE, MS_EXCEL_MIME_TYPE, MS_WORD_MIME_TYPE);
          }}
          previews={previews}
          onDelete={onDelete}
          onDrop={handleUpload}
          {...form.getInputProps("image")}
        />

        <Select
          label='Applies To:'
          disabled={isViewing}
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
              value: "all",
            },
          ]}
          {...form.getInputProps("appliesTo")}
        />
        <Select
          label='Status'
          disabled={isViewing}
          data={[
            {
              value: "active",
              label: "Active",
            },
            {
              value: "inactive",
              label: "In Active",
            },
          ]}
          {...form.getInputProps("status")}
        />
      </FlowContainer>
      <Button
        mt={25}
        type='submit'
        loading={isPending}
        disabled={isPending}
        w='100%'
      >
        Save Rule
      </Button>
    </Form>
  );
}
