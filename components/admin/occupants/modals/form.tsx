"use client";

import clsx from "clsx";
import { ReactNode } from "react";
import { Button, Select, TextInput } from "@mantine/core";
import { Form, useForm, yupResolver } from "@mantine/form";
import { modals } from "@mantine/modals";

import { getCookie } from "cookies-next";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { APP, MODALS, pass } from "@/packages/libraries";
import { handleSuccess, handleError } from "@/packages/notification";
import { builder } from "@/builders";
import { OccupantsData } from "@/builders/types/occupants";
import { FormButtons } from "@/components/shared/interface";
import { FlowContainer } from "@/components/layout/flow-container";

import { schema } from "../schema";
import { FormProvider } from "../context";
import { ConfirmOccupant, ConfirmPropertyOwner } from "./confirmation";
import { activateAccount, suspendAccount } from "../actions";
import { toString } from "lodash";
import { FlowPhoneInput } from "@/components/layout";

type ViewId = "occupants" | "property-owners";

export type OccupantsFormProps = {
  viewId?: ViewId;
  data?: OccupantsData;
  modalType: "add" | "edit" | "view";
};

export function OccupantsForm({ ...props }: OccupantsFormProps) {
  const { data, modalType = "add", viewId = "occupants" } = props;
  const estateId = toString(getCookie(APP.ESTATE_ID));
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
    select: (house) => {
      return house
        .filter(({ noOfOccupants, id }) => {
          if (modalType === "add") {
            return noOfOccupants! <= 1;
          } else {
            return noOfOccupants !== 1 || id === data?.house.id;
          }
        })
        .map(({ id, houseNumber }) => {
          return {
            value: id,
            label: houseNumber,
          };
        });
    },
  });

  const form = useForm({
    initialValues: {
      houseId: data?.house?.id ?? "",
      fullname: data?.user.firstname ?? "",
      email: data?.user.email ?? "",
      phone: data?.user.phone ?? "",
      status: data?.status ?? "active",
      noOfSubOccupants: pass.string(data?.noOfSubOccupants),
      relationshipToMain: data?.relationshipToMain ?? "",
      isMain: data?.isMain ?? true,
      isPropertyOwner: data?.isPropertyOwner ?? false,
      modalType,
    },
    validate: yupResolver(schema),
    validateInputOnBlur: true,
  });

  const handleSubmit = () => {
    const { fullname, phone, houseId, status } = form.getValues();

    const updatedData = {
      fullname,
      phone,
      houseId,
      status,
    };

    console.log(updatedData);

    isEditing
      ? updateOccupant({ id: toString(data?.id), data: updatedData })
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
          nothingFoundMessage='No available house numbers'
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
          <Button mt={10} type='submit'>
            Add New Occupant
          </Button>
        )}
      </FlowContainer>
    </Form>
  );
}
