import clsx from "clsx";

import { Fragment } from "react";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Menu } from "@mantine/core";
import { modals } from "@mantine/modals";

import { builder } from "@/builders";
import { MODALS } from "@/packages/libraries";
import { handleError, handleSuccess } from "@/packages/notification";
import { ConfirmationModal } from "@/components/shared/interface";
import {
  FlowMenu,
  FlowMenuTarget,
  FlowMenuDropdown,
} from "@/components/layout";
import { ActivateIcon, DeactivateIcon, EyeIcon } from "@/icons";
import { UpdateStatus } from "../modals/update-status";
import { HouseData } from "@/builders/types/houses";

interface HousesActionsProps {
  data: HouseData;
  handlers: {
    onAdd: () => void;
    onView: () => void;
  };
}

export function activateAccount(id: string) {
  modals.open({
    modalId: MODALS.CONFIRMATION,
    withCloseButton: false,
    children: <UpdateStatus id={id} status='active' />,
  });
}

export function suspendAccount(id: string) {
  modals.open({
    modalId: MODALS.CONFIRMATION,
    withCloseButton: false,
    children: <UpdateStatus id={id} status='suspended' />,
  });
}

export function HousesActions({ handlers, data }: HousesActionsProps) {
  const queryClient = useQueryClient();
  const isActive = data.status === "active";
  const { id } = { ...data };

  const { mutate, isPending } = useMutation({
    mutationFn: builder.use().houses.id.remove,
    onError: (error: AxiosError) => {
      handleError(error)();
      modals.close(MODALS.CONFIRMATION);
    },
    onSuccess: () => {
      handleSuccess({
        message: "House deleted successfully",
        autoClose: 1200,
      });
      queryClient.invalidateQueries({
        queryKey: builder.houses.list.table.get(),
      });
      modals.close(MODALS.CONFIRMATION);
    },
  });

  return (
    <Fragment>
      <FlowMenu
        wrapperProps={{
          className: clsx("block text-center sm:hidden"),
        }}
      >
        <FlowMenuTarget />
        <FlowMenuDropdown>
          <Menu.Item
            leftSection={<EyeIcon width={14} />}
            onClick={handlers.onView}
          >
            View house
          </Menu.Item>
          {!data.occupantName && (
            <Menu.Item
              color='#969921'
              leftSection={<DeactivateIcon width={13} />}
              onClick={handlers.onAdd}
            >
              Add Occupant
            </Menu.Item>
          )}

          <Menu.Divider />
          {isActive ? (
            <Menu.Item
              color='#969921'
              leftSection={<DeactivateIcon width={13} />}
              onClick={() => suspendAccount(id)}
            >
              Suspend
            </Menu.Item>
          ) : (
            <Menu.Item
              color='#11A506'
              leftSection={<ActivateIcon width={13} />}
              onClick={() => activateAccount(id)}
            >
              Activate
            </Menu.Item>
          )}
        </FlowMenuDropdown>
      </FlowMenu>
    </Fragment>
  );
}
