"use client";

import { Select, TextInput } from "@mantine/core";
import { Form, useForm, yupResolver } from "@mantine/form";
import { modals } from "@mantine/modals";
import clsx from "clsx";

import { builder } from "@/builders";
import {
  SubAdminListData,
  UpdateSubAdminData,
} from "@/builders/types/sub-admins";
import { FlowContainer } from "@/components/layout/flow-container";
import { FormButtons } from "@/components/shared/interface";
import { APP, cast, decryptUri, MODALS } from "@/packages/libraries";
import { handleError, handleSuccess } from "@/packages/notification";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ProfileData } from "@/builders/types/profile";
import { FlowPhoneInput } from "@/components/layout";
import { getCookie } from "cookies-next";
import { activateAccount, suspendAccount } from "../actions";
import { schema } from "../schema";

interface ViewSubAdminsProps extends Omit<SubAdminListData, "edit"> {
  edit: boolean;
}

export function ViewSubAdmins({ edit, ...data }: ViewSubAdminsProps) {
  const {
    estate: { id: estateId },
  }: ProfileData = decryptUri(getCookie(APP.USER_DATA));
  const isActive = data.status.toLowerCase() === "active";

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: builder.$use.sub_admins.id.put,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: builder.sub_admins.get.$get(),
      });
      modals.close(MODALS.FORM_DETAILS);
      handleSuccess({
        message: "Sub-Admin Edited Successfully",
      });
    },
    onError: handleError(),
  });

  const form = useForm<UpdateSubAdminData>({
    initialValues: {
      fullname: data.firstname,
      phone: data.phone,
      status: data.status,
      edit_details: edit,
      estateId,
    },
    validate: yupResolver(schema),
    validateInputOnBlur: true,
    transformValues: (values) => {
      const { fullname, phone, status } = values;
      return {
        fullname: cast.string(fullname),
        phone: cast.string(phone),
        status: cast.string(status),
      };
    },
  });

  function handleSubmit({
    estateId,
    fullname,
    phone,
    status,
  }: typeof form.values) {
    mutate({
      id: data.id,
      data: {
        fullname,
        phone,
        status,
        estateId,
      },
    });
  }

  const isEditing = form.getValues().edit_details;
  return (
    <Form form={form} onSubmit={handleSubmit}>
      <FlowContainer
        className="rounded-2xl bg-primary-background-white"
        justify="center"
        gap={18}
        type="plain"
        bg="white"
      >
        <TextInput
          label="Full Name"
          disabled={!form.getValues().edit_details}
          withAsterisk
          {...form.getInputProps("fullname")}
        />
        <FlowPhoneInput
          label="Phone Number"
          disabled={!form.getValues().edit_details}
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
          label="Account Status"
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
              "bg-opacity-9",
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

// <Flex pt={15}>
//   {isActive ? (
//     <Button
//       color='red'
//       variant='outline'
//       onClick={() => suspendAccount(data.id)}
//       hidden={!isEditing}
//       disabled={isPending}
//     >
//       Disable Account
//     </Button>
//   ) : (
//     <Button c='green'>Activate Account</Button>
//   )}

//   {isEditing ? <Button></Button> : <Button></Button>}
// </Flex>;
