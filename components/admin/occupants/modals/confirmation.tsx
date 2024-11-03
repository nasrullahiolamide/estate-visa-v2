import { ConfirmationModal } from "@/components/shared/interface";
import { FormProvider, useFormContext } from "../form-context";
import { builder } from "@/builders";
import { handleSuccess, handleError } from "@/packages/notification";
import { modals } from "@mantine/modals";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function ConfirmOccupant() {
  const queryClient = useQueryClient();
  const form = useFormContext();

  const { mutate, isPending } = useMutation({
    mutationFn: builder.use().occupants.post,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: builder.occupants.get.get(),
      });
      modals.closeAll();
      handleSuccess({
        message: "Occupant Added Successfully",
      });
    },
    onError: handleError(),
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
          form.setFieldValue("isPropertyOwner", true);
          mutate(form.values);
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
