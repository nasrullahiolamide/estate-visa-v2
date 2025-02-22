import clsx from "clsx";
import Link from "next/link";

import { builder } from "@/builders";
import {
  FlowMenu,
  FlowMenuDropdown,
  FlowMenuTarget,
  FlowToolTip,
} from "@/components/layout";
import { ConfirmationModal } from "@/components/shared/interface";
import { EditIcon, EyeIcon, TrashIcon } from "@/icons";
import { makePath, MODALS, PAGES } from "@/packages/libraries";
import { handleError, handleSuccess } from "@/packages/notification";
import { Flex, Menu } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Fragment } from "react";

interface EstateActionsProps {
  id: string;
  editLink: string;
  viewLink: string;
}

export function EstateActions({ id, editLink, viewLink }: EstateActionsProps) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: builder.$use.estates.id.remove,
    onError: (error: AxiosError) => {
      handleError()();
      modals.close(MODALS.CONFIRMATION);
    },
    onSuccess: () => {
      handleSuccess("Estate Deleted Successfully", { autoClose: 1200 });
      queryClient.invalidateQueries({
        queryKey: builder.estates.get.$get(),
      });
      modals.close(MODALS.CONFIRMATION);
    },
  });

  const handleDelete = () => {
    modals.open({
      children: (
        <ConfirmationModal
          withTwoButtons
          title='Are you sure you want to delete this estate?'
          src='delete'
          primaryBtnText='Yes, delete'
          secondaryBtnText='No'
          srcProps={{
            ml: 0,
          }}
          primaryBtnProps={{
            color: "red",
            onClick: () => mutate(id),
            loading: isPending,
            disabled: isPending,
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
            component={Link}
            href={makePath(PAGES.DASHBOARD, PAGES.ESTATES, viewLink)}
          >
            View
          </Menu.Item>
          <Menu.Item
            leftSection={<EditIcon width={14} />}
            component={Link}
            href={makePath(PAGES.DASHBOARD, PAGES.ESTATES, editLink)}
          >
            Edit
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item
            color='#CC0404'
            leftSection={<TrashIcon width={15} />}
            onClick={handleDelete}
          >
            Delete
          </Menu.Item>
        </FlowMenuDropdown>
      </FlowMenu>

      <Flex className='hidden sm:flex justify-center items-center' gap={8}>
        <FlowToolTip
          icon='View'
          component={Link}
          href={makePath(PAGES.DASHBOARD, PAGES.ESTATES, viewLink)}
        />
        <FlowToolTip
          icon='Edit'
          component={Link}
          href={makePath(PAGES.DASHBOARD, PAGES.ESTATES, editLink)}
        />
        <FlowToolTip icon='Delete' onClick={handleDelete} />
      </Flex>
    </Fragment>
  );
}
