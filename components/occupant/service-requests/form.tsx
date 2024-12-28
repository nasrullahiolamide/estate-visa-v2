"use client";

import { modals } from "@mantine/modals";
import { Button, Select, Textarea } from "@mantine/core";
import { Form, useForm, yupResolver } from "@mantine/form";
import { APP, cast, MODALS } from "@/packages/libraries";
import { FlowContainer } from "@/components/layout/flow-container";

import { schema } from "./schema";
import { getCookie } from "cookies-next";
import { builder } from "@/builders";
import { handleSuccess, handleError } from "@/packages/notification";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ServiceRequestsData } from "@/builders/types/service-requests";
import { ResourceUpload } from "@/components/shared/uploads/resource";
import { IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useFileUpload } from "@/packages/hooks/use-file-upload";
import { toast } from "react-toastify";
import { concat, toString } from "lodash";

export interface ServiceRequestFormProps {
  data?: ServiceRequestsData;
  modalType: "add" | "edit" | "view";
}

export function ServiceRequestForm({
  data,
  modalType: formType,
}: ServiceRequestFormProps) {
  const requestId = data?.id;
  const occupantId = toString(getCookie(APP.OCCUPANT_ID));

  const queryClient = useQueryClient();

  const { mutate: generateRequest, isPending } = useMutation({
    mutationFn: builder.$use.service_requests.post,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: builder.service_requests.get.$get(),
      });
      handleSuccess({
        message: "Request Generated Added Successfully",
      });
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
      handleSuccess({
        message: "Request Generated Updated Successfully",
      });
      modals.close(MODALS.FORM_DETAILS);
    },
    onError: handleError(),
  });

  const form = useForm({
    initialValues: {
      serviceType: data?.serviceType ?? "",
      preferredTime: data?.preferredTime ?? "",
      urgencyLevel: data?.urgencyLevel ?? "",
      description: data?.description ?? "",
      status: data?.status ?? "",
      image: "",
      modalType: formType,
    },
    validate: yupResolver(schema),
    validateInputOnBlur: true,
  });

  const {
    preview,
    handleUpload,
    status: fileStatus,
    progress,
  } = useFileUpload({
    key: "others",
    onError: () => {
      toast.error("Failed to upload resource");
    },
    onSuccess: ({ data }) => {
      form.clearFieldError("image");
      form.setFieldValue("image", data?.secure_url);
    },
  });

  const { modalType, status, ...values } = form.getValues();

  const handleEdit = () =>
    updateRequest({ id: requestId ?? "", data: { ...values, status } });
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
        className="rounded-2xl bg-primary-background-white"
        justify="center"
        gap={20}
        type="plain"
        bg="white"
      >
        <Select
          label="Service Type"
          placeholder="Select Service Type"
          withAsterisk
          data={[
            { value: "cleaning", label: "Cleaning" },
            { value: "electrical", label: "Electrical" },
            { value: "plumbing", label: "Plumbing" },
          ]}
          {...form.getInputProps("serviceType")}
        />
        <Select
          label="Preferred Time"
          placeholder="Choose Preferred Time"
          withAsterisk
          data={[
            { value: "morning", label: "Morning" },
            { value: "afternoon", label: "Afternoon" },
            { value: "evening", label: "Evening" },
          ]}
          {...form.getInputProps("preferredTime")}
        />
        <Select
          label="Urgency Level"
          placeholder="Select Urgency Level"
          withAsterisk
          data={[
            { value: "low", label: "Low" },
            { value: "medium", label: "Medium" },
            { value: "high", label: "High" },
          ]}
          {...form.getInputProps("urgencyLevel")}
        />
        <Textarea
          label="Brief Description"
          placeholder="Type Something..."
          disabled={isViewing}
          draggable={false}
          {...form.getInputProps("description")}
        />
        <ResourceUpload
          label="Image (optional)"
          name={preview.name}
          size={preview.size}
          supports={["img(png, jpg, jpeg)"]}
          accepts={() => {
            return concat(IMAGE_MIME_TYPE);
          }}
          completed={progress?.completed}
          onDrop={handleUpload}
          status={fileStatus}
          multiple
          {...form.getInputProps("image")}
        />

        {isViewing ? (
          <Button
            mt={10}
            type="button"
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
