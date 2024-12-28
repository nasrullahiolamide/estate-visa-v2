import clsx from "clsx";

import { Fragment } from "react";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Flex, Menu } from "@mantine/core";
import { modals } from "@mantine/modals";

import { builder } from "@/builders";
import { MODALS } from "@/packages/libraries";
import { handleError, handleSuccess } from "@/packages/notification";
import { ConfirmationModal } from "@/components/shared/interface";
import {
  FlowMenu,
  FlowMenuTarget,
  FlowMenuDropdown,
  FlowToolTip,
} from "@/components/layout";
import {
  ActivateIcon,
  DeactivateIcon,
  EditIcon,
  EyeIcon,
  TrashIcon,
} from "@/icons";

interface MarketRuleActionsProps {
  id: string;
  handlers: {
    onAdd: () => void;
    onView: () => void;
    onEdit: () => void;
  };
}

export function MarketRuleActions({ id, handlers }: MarketRuleActionsProps) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: builder.$use.houses.id.remove,
    onError: (error: AxiosError) => {
      handleError(error)();
      modals.close(MODALS.CONFIRMATION);
    },
    onSuccess: () => {
      handleSuccess({
        message: "Rule deleted successfully",
        autoClose: 1200,
      });
      queryClient.invalidateQueries({
        queryKey: builder.houses.list.table.$get(),
      });
      modals.close(MODALS.CONFIRMATION);
    },
  });

  const handleDelete = () => {
    modals.open({
      children: (
        <ConfirmationModal
          withTwoButtons
          title="Are you sure you want to delete this rule?"
          src="delete"
          primaryBtnText="Yes, delete"
          secondaryBtnText="No"
          srcProps={{
            ml: 0,
          }}
          secondaryBtnProps={{
            disabled: isPending,
          }}
          primaryBtnProps={{
            color: "red",
            loading: isPending,
            disabled: isPending,
            onClick: () => mutate(id),
          }}
        />
      ),
      withCloseButton: false,
      modalId: MODALS.CONFIRMATION,
    });
  };

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
            View
          </Menu.Item>
          <Menu.Item
            leftSection={<EditIcon width={14} />}
            onClick={handlers.onEdit}
          >
            Edit
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item
            color="#CC0404"
            leftSection={<TrashIcon width={15} />}
            onClick={handleDelete}
          >
            Delete
          </Menu.Item>
        </FlowMenuDropdown>
      </FlowMenu>

      <Flex className="hidden sm:flex justify-center items-center" gap={8}>
        <FlowToolTip icon="View" onClick={handlers.onView} />
        <FlowToolTip icon="Edit" onClick={handlers.onEdit} />
        <FlowToolTip icon="Delete" onClick={handleDelete} />
      </Flex>
    </Fragment>
  );
}
