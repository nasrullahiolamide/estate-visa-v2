"use client";

import { FlowContainer } from "@/components/layout/flow-container";
import { APP, MODALS } from "@/packages/libraries";
import { Button, Select, Textarea } from "@mantine/core";
import { Form, useForm, yupResolver } from "@mantine/form";
import { modals } from "@mantine/modals";

import { builder } from "@/builders";
import { ServiceRequestsData } from "@/builders/types/service-requests";
import { ResourceUpload } from "@/components/shared/uploads/resource";
import { useFileUpload } from "@/packages/hooks/use-file-upload";
import { handleError, handleSuccess } from "@/packages/notification";
import { IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { concat, toString } from "lodash";
import { toast } from "react-toastify";
import { schema } from "./schema";

export interface ServiceRequestFormProps {
  data?: ServiceRequestsData;
  modalType: "add" | "edit" | "view";
}

export function ServiceRequestForm({
  data,
  modalType: formType,
}: ServiceRequestFormProps) {
  const occupantId = toString(getCookie(APP.OCCUPANT_ID));
  const queryClient = useQueryClient();
  const {
    id = "",
    serviceType = "",
    preferredTime = "",
    urgencyLevel = "",
    description = "",
    status = "",
  } = { ...data };

  const { mutate: generateRequest, isPending } = useMutation({
    mutationFn: builder.$use.service_requests.post,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: builder.service_requests.get.$get(),
      });
      handleSuccess("Service Request Generated Successfully");
      modals.close(MODALS.FORM_DETAILS);
    },
    onError: handleError(),
  });

  const { mutate: updateRequest, isPending: isUpdating } = useMutation({
    mutationFn: builder.$use.service_requests.id.edit,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: builder.service_requests.get.$get(),
      });
      handleSuccess("Service Request Updated Successfully");
      modals.close(MODALS.FORM_DETAILS);
    },
    onError: handleError(),
  });

  const form = useForm({
    initialValues: {
      serviceType,
      preferredTime,
      urgencyLevel,
      description,
      status,
      image: "",
      modalType: formType,
    },
    validate: yupResolver(schema),
    validateInputOnBlur: true,
  });

  const { previews, handleUpload, onDelete } = useFileUpload({
    key: "others",
    onError: () => {
      toast.error("Failed to upload resource");
    },
    onSuccess: ({ data }) => {
      form.clearFieldError("image");
      form.setFieldValue("image", data?.secure_url);
    },
  });

  const { modalType, ...values } = form.getValues();

  const handleEdit = () => updateRequest({ id, data: { ...values } });
  const handleSubmit = () => {
    generateRequest({
      ...values,
      occupantId,
    });
  };

  const isEditing = form.getValues().modalType === "edit";
  const isViewing = form.getValues().modalType === "view";

  return (
    <Form form={form}>
      <FlowContainer
        className='rounded-2xl bg-primary-background-white'
        justify='center'
        gap={20}
        type='plain'
        bg='white'
      >
        <Select
          label='Service Type'
          placeholder='Select Service Type'
          withAsterisk
          data={[
            { value: "cleaning", label: "Cleaning" },
            { value: "electrical", label: "Electrical" },
            { value: "plumbing", label: "Plumbing" },
          ]}
          {...form.getInputProps("serviceType")}
        />
        <Select
          label='Preferred Time'
          placeholder='Choose Preferred Time'
          withAsterisk
          data={[
            { value: "morning", label: "Morning" },
            { value: "afternoon", label: "Afternoon" },
            { value: "evening", label: "Evening" },
          ]}
          {...form.getInputProps("preferredTime")}
        />
        <Select
          label='Urgency Level'
          placeholder='Select Urgency Level'
          withAsterisk
          data={[
            { value: "low", label: "Low" },
            { value: "medium", label: "Medium" },
            { value: "high", label: "High" },
          ]}
          {...form.getInputProps("urgencyLevel")}
        />
        <Textarea
          label='Brief Description'
          placeholder='Type Something...'
          disabled={isViewing}
          draggable={false}
          {...form.getInputProps("description")}
        />
        <ResourceUpload
          label='Image (optional)'
          supports={["img(png, jpg, jpeg)"]}
          accepts={() => {
            return concat(IMAGE_MIME_TYPE);
          }}
          previews={previews}
          onDrop={handleUpload}
          onDelete={onDelete}
          {...form.getInputProps("image")}
        />

        {isViewing ? (
          <Button
            mt={10}
            type='button'
            onClick={() => form.setValues({ modalType: "edit" })}
          >
            Edit
          </Button>
        ) : isEditing ? (
          <Button
            mt={10}
            loading={isUpdating}
            disabled={isUpdating}
            onClick={handleEdit}
          >
            Save Changes
          </Button>
        ) : (
          <Button
            mt={10}
            loading={isPending}
            disabled={isPending}
            onClick={handleSubmit}
          >
            Generate Request
          </Button>
        )}
      </FlowContainer>
    </Form>
  );
}
