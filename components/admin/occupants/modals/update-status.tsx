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
}

export function UpdateStatus({ id, status }: ConfirmOccupantProps) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: builder.use().occupants.id.change_status,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: builder.occupants.get.get(),
      });
      modals.close(MODALS.CONFIRMATION);
      handleSuccess({
        autoClose: 1200,
        message:
          status === "active"
            ? "Account activated successfully"
            : "Account disabled successfully",
      });
    },
    onError: handleError(),
  });

  return (
    <Fragment>
      <ConfirmationModal
        withTwoButtons
        src={status === "active" ? "success" : "disable"}
        title={`Are you sure you want to ${
          status === "active" ? "activate" : "disable"
        } this account?`}
        primaryBtnText='Yes, proceed'
        secondaryBtnText='No'
        srcProps={{
          ml: 0,
          h: 90,
        }}
        primaryBtnProps={{
          onClick: () => mutate({ id, data: { status } }),
          loading: isPending,
          disabled: isPending,
        }}
        secondaryBtnProps={{
          disabled: isPending,
          onClick: () => modals.close(MODALS.CONFIRMATION),
        }}
      />
    </Fragment>
  );
}
// ;
