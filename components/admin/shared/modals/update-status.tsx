import { Fragment } from "react";

import { MODALS } from "@/packages/libraries";

import { modals } from "@mantine/modals";
import { ConfirmationModal } from "@/components/shared/interface";
import { builder } from "@/builders";
import { handleSuccess, handleError } from "@/packages/notification";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface ConfirmOccupantProps {
  id: string;
  status: "active" | "suspended";
  title: string;
}

export function UpdateStatus({ id, status, title }: ConfirmOccupantProps) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: builder.use().account.profile.change_status,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: builder.sub_admins.get.get(),
      });
      modals.close(MODALS.CONFIRMATION);
      handleSuccess({
        message: "Account activated successfully",
      });
    },
    onError: handleError(),
  });

  return (
    <Fragment>
      <ConfirmationModal
        withTwoButtons
        src='disable'
        title={title}
        primaryBtnText='Yes, proceed'
        secondaryBtnText='No'
        srcProps={{
          ml: 0,
          h: 90,
        }}
        primaryBtnProps={{
          onClick: () => mutate({ id, status }),
          loading: isPending,
          disabled: isPending,
        }}
        secondaryBtnProps={{
          onClick: () => modals.close(MODALS.CONFIRMATION),
        }}
      />
    </Fragment>
  );
}
// ;
