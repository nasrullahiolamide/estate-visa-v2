"use client";

import { builder } from "@/builders";
import { OccupantsData } from "@/builders/types/occupants";
import { FlowGroupButtons, FlowPhoneInput } from "@/components/layout";
import { FlowContainer } from "@/components/layout/flow-container";
import { APP, MODALS, pass } from "@/packages/libraries";
import { handleError, handleSuccess } from "@/packages/notification";
import { Box, Button, Select, TextInput } from "@mantine/core";
import { Form, useForm, yupResolver } from "@mantine/form";
import { modals } from "@mantine/modals";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { toString } from "lodash";
import { activateAccount, suspendAccount } from "../actions";
import { FormProvider } from "../context";
import { schema } from "../schema";
import { ConfirmOccupant, ConfirmPropertyOwner } from "./confirmation";

import { ConfirmationModal } from "@/components/shared/interface";
import { ActivateIcon, DeactivateIcon, EditIcon, TrashIcon } from "@/icons";

type ViewId = "occupants" | "property-owners";

export type OccupantsFormProps = {
  viewId?: ViewId;
  data?: OccupantsData;
  modalType: "add" | "edit" | "view";
};

export function OccupantsForm({ ...props }: OccupantsFormProps) {
  const estateId = toString(getCookie(APP.ESTATE_ID));
  const queryClient = useQueryClient();

  const { data, modalType = "add", viewId = "occupants" } = props;
  const {
    id = "",
    houseId = "",
    fullname = "",
    email = "",
    phone = "",
    status = "active",
    noOfSubOccupants = "",
    relationshipToMain = "",
    isMain = true,
    isPropertyOwner = false,
  } = { ...data };

  const form = useForm({
    initialValues: {
      houseId,
      fullname,
      email,
      phone,
      status,
      noOfSubOccupants: pass.string(noOfSubOccupants),
      relationshipToMain,
      isMain,
      isPropertyOwner,
      modalType,
    },
    validate: yupResolver(schema),
    validateInputOnBlur: true,
  });

  const { data: houseNumbers } = useQuery({
    queryKey: builder.houses.list.all.$get(estateId),
    queryFn: () => builder.$use.houses.list.all(estateId),
    select: (house) => {
      return house
        .filter(({ noOfOccupants, id }) => {
          if (modalType === "add") {
            return noOfOccupants < 1;
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

  const { mutate: updateOccupant, isPending: isUpdating } = useMutation({
    mutationFn: builder.$use.occupants.id.edit,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: builder.occupants.get.$get(),
      });
      modals.closeAll();
      handleSuccess("Occupant Updated Successfully");
    },
    onError: handleError(),
  });

  const { mutate: deleteOccupant, isPending: isDeleting } = useMutation({
    mutationFn: builder.$use.occupants.id.remove,
    onError: () => {
      handleError("An error occurred, please try again later")();
      modals.closeAll();
    },
    onSuccess: () => {
      handleSuccess("Occupant deleted successfully");
      queryClient.invalidateQueries({
        queryKey: builder.occupants.get.$get(),
      });
      modals.closeAll();
    },
  });

  const handleDelete = () => {
    modals.open({
      withCloseButton: false,
      modalId: MODALS.CONFIRMATION,
      children: (
        <ConfirmationModal
          withTwoButtons
          title='Are you sure you want to delete this occupant?'
          src='delete'
          primaryBtnText='Yes, delete'
          secondaryBtnText='No'
          srcProps={{
            ml: 0,
          }}
          secondaryBtnProps={{
            disabled: isDeleting,
          }}
          primaryBtnProps={{
            color: "red",
            loading: isDeleting,
            disabled: isDeleting,
            onClick: () => deleteOccupant(id),
          }}
        />
      ),
    });
  };

  const handleSubmit = () => {
    const { fullname, phone, houseId, status } = form.getValues();
    const updatedData = {
      fullname,
      phone,
      houseId,
      status,
    };

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
  const defaultBtnConfigs = [
    isActive
      ? {
          icon: DeactivateIcon,
          label: "Disable Account",
          onClick: () => suspendAccount(id),
          color: "#969921",
        }
      : {
          icon: ActivateIcon,
          label: "Activate Account",
          onClick: () => activateAccount(id),
          color: "green",
        },

    {
      icon: TrashIcon,
      label: "Delete Occupant",
      onClick: handleDelete,
      color: "red",
    },
  ];

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
          <Box mt={10}>
            <FlowGroupButtons
              isLoading={isUpdating}
              buttons={[
                {
                  label: "Save Changes",
                  onClick: handleSubmit,
                  default: true,
                  icon: EditIcon,
                },
                ...defaultBtnConfigs,
              ]}
            />
          </Box>
        ) : isViewing ? (
          <Box mt={10}>
            <FlowGroupButtons
              isLoading={isUpdating}
              buttons={[
                {
                  label: "Edit Occupant",
                  onClick: () => form.setValues({ modalType: "edit" }),
                  default: true,
                  icon: EditIcon,
                },
                ...defaultBtnConfigs,
              ]}
            />
          </Box>
        ) : (
          <Button mt={10} type='submit'>
            Add New Occupant
          </Button>
        )}
      </FlowContainer>
    </Form>
  );
}
