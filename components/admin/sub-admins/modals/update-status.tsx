import { Fragment } from "react";

import { MODALS } from "@/packages/libraries";

import { builder } from "@/builders";
import { ConfirmationModal } from "@/components/shared/interface";
import { handleError, handleSuccess } from "@/packages/notification";
import { modals } from "@mantine/modals";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface ConfirmOccupantProps {
  id: string;
  status: "active" | "suspended";
  title: string;
}

export function UpdateStatus({ id, status, title }: ConfirmOccupantProps) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: builder.$use.account.profile.change_status,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: builder.sub_admins.get.$get(),
      });
      modals.close(MODALS.CONFIRMATION);
      handleSuccess("Account Updated Successfully", { autoClose: 1200 });
    },
    onError: handleError(),
  });

  return (
    <Fragment>
      <ConfirmationModal
        withTwoButtons
        src={status === "active" ? "success" : "disable"}
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
          disabled: isPending,
          onClick: () => modals.close(MODALS.CONFIRMATION),
        }}
      />
    </Fragment>
  );
}
// ;
