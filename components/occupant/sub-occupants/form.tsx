"use client";

import { SubOccupantsData } from "@/builders/types/sub-occupants";
import { FlowContainer } from "@/components/layout/flow-container";
import { APP, cast, MODALS } from "@/packages/libraries";
import { Button, Select, TextInput } from "@mantine/core";
import { Form, useForm, yupResolver } from "@mantine/form";
import { modals } from "@mantine/modals";

import { builder } from "@/builders";
import { FlowPhoneInput } from "@/components/layout";
import { RELATIONSHIP_OPTIONS } from "@/packages/constants/data";
import { handleError, handleSuccess } from "@/packages/notification";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { toString } from "lodash";
import { schema } from "./schema";

export interface SubOccupantsFormProps {
  data?: SubOccupantsData;
  modalType: "add" | "edit" | "view";
}

export function SubOccupantsForm({ data, modalType }: SubOccupantsFormProps) {
  const subOccupantId = data?.id ?? "";
  const houseId = toString(getCookie(APP.HOUSE_ID));
  const queryClient = useQueryClient();

  const { mutate: addSubOccupant, isPending } = useMutation({
    mutationFn: builder.$use.occupants.post,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: builder.sub_occupants.get.$get(),
      });
      modals.close(MODALS.FORM_DETAILS);
      handleSuccess("Sub-Occupant Added Successfully");
    },
    onError: handleError(),
  });

  const { mutate: updateSubOccupant, isPending: isUpdating } = useMutation({
    mutationFn: builder.$use.sub_occupants.edit,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: builder.sub_occupants.get.$get(),
      });
      modals.close(MODALS.FORM_DETAILS);
      handleSuccess("Sub-Occupant Updated Successfully");
    },
    onError: handleError(),
  });

  const form = useForm({
    initialValues: {
      email: data?.user.email ?? "",
      fullname: data?.user.firstname ?? "",
      phone: data?.user.phone ?? "",
      relationshipToMain: data?.relationshipToMain ?? "",
      isMain: false,
      isPropertyOwner: false,
      houseId,
      modalType,
    },
    validate: yupResolver(schema),
    validateInputOnBlur: true,
    transformValues: (values) => {
      const {
        email,
        fullname,
        phone,
        relationshipToMain,
        houseId,
        isMain,
        isPropertyOwner,
      } = values;

      return {
        isMain,
        isPropertyOwner,
        email: cast.string(email),
        fullname: cast.string(fullname),
        phone: cast.string(phone),
        relationshipToMain: cast.string(relationshipToMain),
        houseId: cast.string(houseId),
      };
    },
  });

  const isEditing = form.getValues().modalType === "edit";
  const isViewing = form.getValues().modalType === "view";

  // const handleSubmit = (values: Omit<typeof form.values, "modalType">) => {
  //   isEditing
  //     ? updateSubOccupant({ id: subOccupantId ?? "", data: values })
  //     : addSubOccupant(values);
  // };

  return (
    <Form form={form}>
      <FlowContainer
        className='rounded-2xl bg-primary-background-white'
        justify='center'
        gap={15}
        type='plain'
        bg='white'
      >
        <TextInput
          label='Full Name'
          disabled={isViewing}
          {...form.getInputProps("fullname")}
        />
        <TextInput
          label='Email Address'
          disabled={isViewing}
          {...form.getInputProps("email")}
        />
        <FlowPhoneInput
          label='Phone Number'
          disabled={isViewing}
          {...form.getInputProps("phone")}
        />

        <Select
          data={RELATIONSHIP_OPTIONS}
          label='Relationship'
          disabled={isViewing}
          withAsterisk
          {...form.getInputProps("relationshipToMain")}
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
            onClick={() =>
              updateSubOccupant({ id: subOccupantId, data: form.values })
            }
          >
            Save Changes
          </Button>
        ) : (
          <Button
            mt={10}
            onClick={() => addSubOccupant(form.values)}
            loading={isPending}
            disabled={isPending}
          >
            Add Sub-Occupant
          </Button>
        )}
      </FlowContainer>
    </Form>
  );
}
