"use client";

import clsx from "clsx";
import { Button, Select, TextInput } from "@mantine/core";
import { Form, useForm, yupResolver } from "@mantine/form";
import { modals } from "@mantine/modals";

import { getCookie } from "cookies-next";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { APP, decryptUri } from "@/packages/libraries";
import { handleSuccess, handleError } from "@/packages/notification";
import { builder } from "@/builders";
import { ProfileData } from "@/builders/types/profile";
import { PropertyOwnersData } from "@/builders/types/property-owners";
import { FormButtons } from "@/components/shared/interface";
import { FlowContainer } from "@/components/layout/flow-container";

import { schema } from "../../occupants/schema";
import { activateAccount, suspendAccount } from "../actions";
import { FlowPhoneInput } from "@/components/layout";

export type PropertyOwnerFormProps = {
  data?: PropertyOwnersData;
  modalType: "edit" | "view" | "add";
};
export function PropertyOwnerForm({
  data,
  modalType = "view",
}: PropertyOwnerFormProps) {
  const estateId = getCookie(APP.ESTATE_ID) ?? "";
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: builder.use().property_owners.post,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: builder.property_owners.get.get(),
      });
      modals.closeAll();
      handleSuccess({
        message: "Property Owner Added Successfully",
      });
    },
    onError: handleError(),
  });

  const { mutate: updateOccupant, isPending: isUpdating } = useMutation({
    mutationFn: builder.use().property_owners.id.put,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: builder.property_owners.get.get(),
      });
      modals.closeAll();
      handleSuccess({
        message: "Property Owner Updated Successfully",
      });
    },
    onError: handleError(),
  });

  const { data: houseNumbers } = useQuery({
    queryKey: builder.houses.list.all.get(estateId),
    queryFn: () => builder.use().houses.list.all(estateId),
    select: (data) => {
      return data.map((house) => ({
        value: house.id,
        label: house.houseNumber,
      }));
    },
  });

  const form = useForm({
    initialValues: {
      houseId: data?.house?.id ?? "",
      fullname: data?.user.firstname ?? "",
      email: data?.user.email ?? "",
      phone: data?.user.phone ?? "",
      status: data?.status ?? "active",
      modalType,
    },
    validate: yupResolver(schema),
    validateInputOnBlur: true,
  });

  const handleSubmit = () => {
    const { email, fullname, phone, houseId, status } = form.getValues();

    const updatedData = {
      email,
      fullname,
      phone,
      houseId,
      status,
    };

    isEditing
      ? updateOccupant({ id: data?.id ?? "", data: updatedData })
      : mutate(updatedData);
  };

  const isEditing = form.getValues().modalType === "edit";
  const isViewing = form.getValues().modalType === "view";
  const isActive = data?.status === "active";

  return (
    <Form form={form} onSubmit={handleSubmit}>
      <FlowContainer
        className='rounded-2xl bg-primary-background-white'
        justify='center'
        gap={18}
        type='plain'
        bg='white'
      >
        <Select
          data={houseNumbers}
          nothingFoundMessage='No house numbers found'
          label='House Number'
          placeholder='Select House Number'
          disabled={isViewing}
          searchable
          withAsterisk
          {...form.getInputProps("houseId")}
        />
        <TextInput
          label='Full Name'
          disabled={isViewing}
          withAsterisk
          {...form.getInputProps("fullname")}
        />
        <TextInput
          label='Email Address'
          disabled={isViewing}
          withAsterisk
          {...form.getInputProps("email")}
        />
        <FlowPhoneInput
          label='Phone Number'
          disabled={isViewing}
          withAsterisk
          {...form.getInputProps("phone")}
        />
        <Select
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
          label='Status'
          disabled={isViewing}
          {...form.getInputProps("status")}
        />
        {isEditing ? (
          <FormButtons
            containerProps={{
              pt: 15,
              pb: 0,
              px: 0,
            }}
            leftButton={{
              disabled: isUpdating,
              c: isActive ? "red" : "green",
              children: `${isActive ? "Disable" : "Activate"} Account`,
              onClick: isActive
                ? () => suspendAccount(data.id)
                : () => activateAccount(data?.id ?? ""),
              className: clsx(
                isActive
                  ? "hover:bg-red-1 border-red-4"
                  : "hover:bg-green-1 border-green-9",
                "bg-opacity-9"
              ),
            }}
            rightButton={{
              loading: isUpdating,
              disabled: isUpdating,
              type: "submit",
              children: "Save changes",
            }}
          />
        ) : isViewing ? (
          <Button
            mt={10}
            type='button'
            onClick={() => form.setValues({ modalType: "edit" })}
          >
            Edit
          </Button>
        ) : (
          <Button
            mt={10}
            type='submit'
            loading={isPending}
            disabled={isPending}
          >
            Add New Occupant
          </Button>
        )}
      </FlowContainer>
    </Form>
  );
}
