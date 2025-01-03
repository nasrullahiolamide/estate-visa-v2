import { Fragment } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { builder } from "@/builders";
import { ConfirmationModal } from "@/components/shared/interface";
import { MODALS } from "@/packages/libraries";
import { handleError, handleSuccess } from "@/packages/notification";
import { modals } from "@mantine/modals";

interface UpdateStatusProps {
  id: string;
  status: "active" | "suspended";
}

export function UpdateStatus({ id, status }: UpdateStatusProps) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: builder.$use.houses.id.change_status,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: builder.houses.list.table.$get(),
      });
      modals.closeAll();
      handleSuccess("House Status Updated Successfully");
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
