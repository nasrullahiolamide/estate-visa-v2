import {
  ActivateIcon,
  DeactivateIcon,
  EditIcon,
  EyeIcon,
  TrashIcon,
} from "@/svgs";
import {
  Flex,
  Menu,
  MenuDropdownProps,
  MenuItemProps,
  Tooltip,
} from "@mantine/core";
import { Fragment, PropsWithChildren, ReactNode } from "react";
import { FlowMenu } from "./flow-menu";
import { FlowMenuDropdown } from "./flow-menu-dropdown";
import { FlowMenuTarget } from "./flow-menu-target";

export enum ACTIONS_LABELS {
  EDIT = "edit",
  VIEW = "view",
  DELETE = "delete",
  ACTIVATE_SUSPEND = "activate-suspend",
}
type ActionType = "activate-suspend" | "edit" | "view" | "delete";

type ActionPropsMap = {
  edit: {
    label?: string;
    onEdit: () => void;
  };
  view: {
    label?: string;
    onView: () => void;
  };
  delete: {
    label?: string;
    onDelete: () => void;
  };
  "activate-suspend": {
    isActive: boolean;
    label?: string;
    onActivate: () => void;
    onSuspend: () => void;
  };
};

type ExtractProps<T extends ActionType[]> = {
  [K in T[number]]: ActionPropsMap[K];
};

type FlowTableActionsProps<T extends ActionType[]> = {
  actions: T;
  ItemProps?: MenuItemProps;
  DropdownProps?: MenuDropdownProps;
} & {
  editProps?: ExtractProps<T>[ACTIONS_LABELS.EDIT];
  viewProps?: ExtractProps<T>[ACTIONS_LABELS.VIEW];
  deleteProps?: ExtractProps<T>[ACTIONS_LABELS.DELETE];
  activateSuspendProps?: ExtractProps<T>[ACTIONS_LABELS.ACTIVATE_SUSPEND];
};

export function FlowTableActions<T extends ActionType[]>({
  actions,
  editProps,
  viewProps,
  deleteProps,
  activateSuspendProps,
  ItemProps,
  DropdownProps,
}: FlowTableActionsProps<T>) {
  const view: Record<PropertyKey, ReactNode> = {
    [ACTIONS_LABELS.EDIT]: (
      <Menu.Item
        leftSection={<EditIcon width={14} key={ACTIONS_LABELS.EDIT} />}
        onClick={editProps?.onEdit}
      >
        {editProps?.label || "Edit"}
      </Menu.Item>
    ),

    [ACTIONS_LABELS.DELETE]: (
      <>
        <Menu.Divider />
        <Menu.Item
          {...ItemProps}
          color='#CC0404'
          leftSection={<TrashIcon width={15} />}
          key={ACTIONS_LABELS.DELETE}
          onClick={deleteProps?.onDelete}
        >
          {deleteProps?.label || "Delete"}
        </Menu.Item>
      </>
    ),

    [ACTIONS_LABELS.VIEW]: (
      <Menu.Item
        {...ItemProps}
        leftSection={<EyeIcon width={14} />}
        key={ACTIONS_LABELS.VIEW}
        onClick={viewProps?.onView}
      >
        {viewProps?.label || "View"}
      </Menu.Item>
    ),

    [ACTIONS_LABELS.ACTIVATE_SUSPEND]: (
      <Menu.Item
        color={activateSuspendProps?.isActive ? "#969921" : "#11A506"}
        onClick={
          activateSuspendProps?.isActive
            ? activateSuspendProps?.onSuspend
            : activateSuspendProps?.onActivate
        }
        key={ACTIONS_LABELS.ACTIVATE_SUSPEND}
        leftSection={
          activateSuspendProps?.isActive ? (
            <DeactivateIcon width={13} />
          ) : (
            <ActivateIcon width={13} />
          )
        }
      >
        {activateSuspendProps?.label || activateSuspendProps?.isActive
          ? "Suspend"
          : "Activate"}
      </Menu.Item>
    ),
  };

  return (
    <Fragment>
      <FlowMenu wrapperProps={{ className: "block sm:hidden text-center" }}>
        <FlowMenuTarget />
        <FlowMenuDropdown {...DropdownProps}>
          {actions && actions.map((action) => view[action])}
        </FlowMenuDropdown>
      </FlowMenu>

      <Flex className='hidden sm:flex justify-center' gap={8} align='center'>
        <Tooltip label='View'>
          <div onClick={viewProps?.onView}>
            <EyeIcon color='var(--blue-8)' />
          </div>
        </Tooltip>
        <Tooltip label='Edit'>
          <div onClick={editProps?.onEdit}>
            <EditIcon color='var(--blue-8)' />
          </div>
        </Tooltip>
        {activateSuspendProps?.isActive ? (
          <Tooltip label='Suspend'>
            <div onClick={activateSuspendProps.onSuspend}>
              <DeactivateIcon />
            </div>
          </Tooltip>
        ) : (
          <Tooltip label='Activate'>
            <div onClick={activateSuspendProps?.onActivate}>
              <ActivateIcon />
            </div>
          </Tooltip>
        )}

        <Tooltip label='Delete'>
          <div onClick={deleteProps?.onDelete}>
            <TrashIcon />
          </div>
        </Tooltip>
      </Flex>
    </Fragment>
  );
}
