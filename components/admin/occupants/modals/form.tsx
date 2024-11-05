"use client";

import clsx from "clsx";
import { ReactNode } from "react";
import { Button, Select, TextInput } from "@mantine/core";
import { Form, useForm, yupResolver } from "@mantine/form";
import { modals } from "@mantine/modals";

import { getCookie } from "cookies-next";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { APP, decryptUri, MODALS, pass } from "@/packages/libraries";
import { handleSuccess, handleError } from "@/packages/notification";
import { builder } from "@/builders";
import { ProfileData } from "@/builders/types/profile";
import { OccupantsData } from "@/builders/types/occupants";
import { FormButtons } from "@/components/shared/interface";
import { FlowContainer } from "@/components/layout/flow-container";

import { schema } from "../schema";
import { FormProvider } from "../context";
import { ConfirmOccupant, ConfirmPropertyOwner } from "./confirmation";
import { activateAccount, suspendAccount } from "../actions";

type ViewId = "occupants" | "property-owners";

export type OccupantsFormProps = {
  viewId?: ViewId;
  data?: OccupantsData;
  modalType: "add" | "edit" | "view";
} & (
  | { viewId: "property-owners"; children?: ReactNode }
  | {
      viewId?: Exclude<ViewId, "property-owners">;
      children?: never;
    }
);

export function OccupantsForm({
  data,
  children,
  modalType = "add",
  viewId = "occupants",
}: OccupantsFormProps) {
  const userData: ProfileData = decryptUri(getCookie(APP.USER_DATA));
  const estateId = userData.estate.id;
  const queryClient = useQueryClient();

  const { mutate: updateOccupant, isPending: isUpdating } = useMutation({
    mutationFn: builder.use().occupants.id.edit,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: builder.occupants.get.get(),
      });
      modals.closeAll();
      handleSuccess({
        message: "Occupant Updated Successfully",
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
      noOfSubOccupants: pass.string(data?.noOfSubOccupants) ?? "",
      relationshipToMain: data?.relationshipToMain ?? "",
      isMain: data?.isMain ?? true,
      isPropertyOwner: data?.isPropertyOwner ?? false,
      modalType,
    },
    validate: yupResolver(schema),
    validateInputOnBlur: true,
  });

  const handleSubmit = () => {
    const {
      email,
      fullname,
      phone,
      houseId,
      status,
      isMain,
      isPropertyOwner,
      relationshipToMain,
    } = form.getValues();

    const updatedData = {
      email,
      fullname,
      phone,
      houseId,
      status,
      isMain,
      isPropertyOwner,
      relationshipToMain,
    };

    isEditing
      ? updateOccupant({ id: data?.id ?? "", data: updatedData })
      : modals.open({
          modalId: MODALS.CONFIRMATION,
          children:
            viewId === "property-owners" ? (
              <FormProvider form={form}>
                <ConfirmPropertyOwner />
              </FormProvider>
            ) : (
              <FormProvider form={form}>
                <ConfirmOccupant />
              </FormProvider>
            ),
        });
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
          disabled={isEditing || isViewing}
          withAsterisk
          {...form.getInputProps("email")}
        />
        <TextInput
          label='Phone Number'
          disabled={isViewing}
          withAsterisk
          {...form.getInputProps("phone")}
        />
        {children}
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
          <Button mt={10} type='submit' onSubmit={handleSubmit}>
            Add New Occupant
          </Button>
        )}
      </FlowContainer>
    </Form>
  );
}
