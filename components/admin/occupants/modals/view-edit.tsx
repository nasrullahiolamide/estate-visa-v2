"use client";

import clsx from "clsx";
import { getCookie } from "cookies-next";
import { Select, TextInput } from "@mantine/core";
import { Form, useForm, yupResolver } from "@mantine/form";
import { modals } from "@mantine/modals";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { APP, cast, decryptUri } from "@/packages/libraries";
import { handleSuccess, handleError } from "@/packages/notification";
import { FlowContainer } from "@/components/layout/flow-container";
import { FormButtons } from "@/components/shared/interface";
import { builder } from "@/builders";
import { ProfileData } from "@/builders/types/profile";
import { OccupantsData } from "@/builders/types/occupants";

import { schema } from "../schema";
import { suspendAccount, activateAccount } from "../actions";

interface ViewEditOccupantsProps extends Omit<OccupantsData, "edit"> {
  edit: boolean;
}

export function ViewEditOccupants({ edit, ...data }: ViewEditOccupantsProps) {
  const queryClient = useQueryClient();
  const userData: ProfileData = decryptUri(getCookie(APP.USER_DATA));
  const isActive = data.status === "active";

  const { data: houseNumbers } = useQuery({
    queryKey: builder.houses.list.all.get(userData.estate.id),
    queryFn: () => builder.use().houses.list.all(userData.estate.id),
    select: (data) => {
      return data.map((house) => ({
        value: house.id,
        label: house.houseNumber,
      }));
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: builder.use().occupants.post,
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

  const form = useForm({
    initialValues: {
      houseNumber: data.house.houseNumber,
      fullname: data.user.firstname,
      email: data.user.email,
      phone: data.user.phone,
      noOfSubOccupants: data.noOfSubOccupants,
      status: data.status,
      edit_details: edit,
    },
    validate: yupResolver(schema),
    validateInputOnBlur: true,
    transformValues: (values) => {
      const { fullname, houseNumber, email, phone, noOfSubOccupants, status } =
        values;
      return {
        houseNumber: cast.string(houseNumber),
        fullname: cast.string(fullname),
        email: cast.string(email),
        phone: cast.string(phone),
        noOfSubOccupants: cast.number(noOfSubOccupants),
        status: cast.string(status),
      };
    },
  });

  function handleSubmit({ fullname, phone, status }: typeof form.values) {
    // mutate({
    //   fullname,
    //   phone,
    //   status,
    // });
  }

  const isEditing = form.getValues().edit_details;
  return (
    <Form form={form}>
      <FlowContainer
        className='rounded-2xl bg-primary-background-white'
        justify='center'
        gap={18}
        type='plain'
        bg='white'
      >
        <Select
          data={houseNumbers}
          disabled={!isEditing}
          label='House Number'
          withAsterisk
          {...form.getInputProps("houseId")}
        />
        <TextInput
          label='Full Name'
          disabled={!isEditing}
          withAsterisk
          {...form.getInputProps("fullname")}
        />
        <TextInput
          label='Email Address'
          disabled={!isEditing}
          withAsterisk
          {...form.getInputProps("email")}
        />
        <TextInput
          label='Phone Number'
          disabled={!isEditing}
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
          disabled={!isEditing}
          label='Status'
          {...form.getInputProps("status")}
        />

        <FormButtons
          containerProps={{
            pt: 15,
            pb: 0,
            px: 0,
          }}
          leftButton={{
            hidden: !isEditing,
            disabled: isPending,
            c: isActive ? "red" : "green",
            children: `${isActive ? "Disable" : "Activate"} Account`,
            onClick: isActive
              ? () => suspendAccount(data.id)
              : () => activateAccount(data.id),

            className: clsx(
              isActive
                ? "hover:bg-red-1 border-red-4"
                : "hover:bg-green-1 border-green-9",
              "bg-opacity-9"
            ),
          }}
          rightButton={{
            loading: isPending,
            disabled: isPending,
            type: isEditing ? "submit" : "button",
            children: isEditing ? "Save changes" : "Edit",
            onClick: !isEditing
              ? () => form.setValues({ edit_details: true })
              : () => handleSubmit(form.getValues()),
          }}
        />
      </FlowContainer>
    </Form>
  );
}
