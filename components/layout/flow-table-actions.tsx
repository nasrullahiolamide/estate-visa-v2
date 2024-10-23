import {
  ActivateIcon,
  AddIcon,
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
import clsx from "clsx";

export enum ACTIONS_LABELS {
  ADD = "add",
  EDIT = "edit",
  VIEW = "view",
  DELETE = "delete",
  ACTIVATE_SUSPEND = "activate-suspend",
  OTHERS = "others",
}
type ActionType =
  | "activate-suspend"
  | "edit"
  | "view"
  | "delete"
  | "add"
  | "others";

type ActionPropsMap = {
  add: {
    label?: string;
    onAdd: () => void;
  };
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
  others: {
    children: ReactNode;
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

type FlowTableActionsProps<T extends ActionType[]> = PropsWithChildren<{
  actions?: T;
  ItemProps?: MenuItemProps;
  DropdownProps?: MenuDropdownProps;
  showDesktopView?: boolean;
}> & {
  addProps?: ExtractProps<T>[ACTIONS_LABELS.ADD];
  editProps?: ExtractProps<T>[ACTIONS_LABELS.EDIT];
  viewProps?: ExtractProps<T>[ACTIONS_LABELS.VIEW];
  deleteProps?: ExtractProps<T>[ACTIONS_LABELS.DELETE];
  activateSuspendProps?: ExtractProps<T>[ACTIONS_LABELS.ACTIVATE_SUSPEND];
  otherProps?: ExtractProps<T>[ACTIONS_LABELS.OTHERS];
};

export function FlowTableActions<T extends ActionType[]>({
  actions,
  addProps,
  editProps,
  viewProps,
  deleteProps,
  activateSuspendProps,
  otherProps,
  ItemProps,
  DropdownProps,
  showDesktopView = true,
}: FlowTableActionsProps<T>) {
  const view: Record<PropertyKey, ReactNode> = {
    [ACTIONS_LABELS.ADD]: (
      <Menu.Item
        key={ACTIONS_LABELS.ADD}
        leftSection={<AddIcon width={14} fontWeight={700} />}
        onClick={addProps?.onAdd}
      >
        {addProps?.label || "Add"}
      </Menu.Item>
    ),

    [ACTIONS_LABELS.EDIT]: (
      <Menu.Item
        key={ACTIONS_LABELS.EDIT}
        leftSection={<EditIcon width={14} />}
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

    others: otherProps?.children,
  };

  return (
    <Fragment>
      <FlowMenu
        wrapperProps={{
          className: clsx("block text-center", {
            "sm:hidden": showDesktopView,
          }),
        }}
      >
        <FlowMenuTarget />
        <FlowMenuDropdown {...DropdownProps}>
          {actions && actions.map((action) => view[action])}
        </FlowMenuDropdown>
      </FlowMenu>

      {showDesktopView && (
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
      )}
    </Fragment>
  );
}
