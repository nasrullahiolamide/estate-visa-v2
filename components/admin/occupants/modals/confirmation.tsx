import { builder } from "@/builders";
import { ConfirmationModal } from "@/components/shared/interface";
import { MODALS } from "@/packages/libraries";
import { handleError, handleSuccess } from "@/packages/notification";
import { modals } from "@mantine/modals";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useFormContext } from "../context";

export function ConfirmOccupant() {
  const queryClient = useQueryClient();
  const form = useFormContext();

  const { mutate, isPending } = useMutation({
    mutationFn: builder.$use.occupants.post,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: builder.occupants.get.$get(),
      });
      modals.closeAll();
      handleSuccess("Occupant Added Successfully");
    },
    onError: (error: AxiosError) => {
      handleError()(error as AxiosError<{ message?: string }>);
      modals.close(MODALS.CONFIRMATION);
    },
  });

  return (
    <ConfirmationModal
      withTwoButtons
      title=' Is this occupant a property owner?'
      description='A property owner is the main owner of the apartment.'
      primaryBtnText='Yes, proceed'
      secondaryBtnText='No'
      primaryBtnProps={{
        loading: isPending,
        disabled: isPending,
        onClick: () => {
          mutate({
            ...form.values,
            isPropertyOwner: true,
          });
        },
      }}
      secondaryBtnProps={{
        disabled: isPending,
        onClick: () => {
          form.setFieldValue("isPropertyOwner", false);
          mutate(form.values);
        },
      }}
    />
  );
}

export function ConfirmPropertyOwner() {
  const queryClient = useQueryClient();
  const form = useFormContext();

  const { mutate, isPending } = useMutation({
    mutationFn: builder.$use.occupants.post,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: builder.occupants.get.$get(),
      });
      modals.closeAll();
      handleSuccess("Occupant Added Successfully");
    },
    onError: (error: AxiosError) => {
      handleError()(error as AxiosError<{ message?: string }>);
      modals.close(MODALS.CONFIRMATION);
    },
  });

  return (
    <ConfirmationModal
      withTwoButtons
      title=' Is this occupant a property owner?'
      description='A property owner is the main owner of the apartment.'
      primaryBtnText='Yes, proceed'
      secondaryBtnText='No'
      primaryBtnProps={{
        loading: isPending,
        disabled: isPending,
        onClick: () => {
          mutate({
            ...form.values,
            isPropertyOwner: true,
          });
        },
      }}
      secondaryBtnProps={{
        disabled: isPending,
        onClick: () => {
          form.setFieldValue("isPropertyOwner", false);
          mutate(form.values);
        },
      }}
    />
  );
}
