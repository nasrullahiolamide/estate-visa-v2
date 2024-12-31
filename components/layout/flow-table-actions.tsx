import {
  ActivateIcon,
  AddIcon,
  DeactivateIcon,
  EditIcon,
  EyeIcon,
  TrashIcon,
} from "@/icons";
import {
  Flex,
  MantineComponent,
  Menu,
  MenuDropdownProps,
  MenuItemProps,
  PolymorphicComponentProps,
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

type ActionProps = {
  component?: PolymorphicComponentProps<MenuItemProps>;
  label: string;
  onClick: () => void;
};

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
  const desktopView: Record<PropertyKey, ReactNode> = {
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
      <>
        <Menu.Item
          key={ACTIONS_LABELS.EDIT}
          leftSection={<EditIcon width={14} />}
          onClick={editProps?.onEdit}
          {...editProps}
        >
          {editProps?.label || "Edit"}
        </Menu.Item>
      </>
    ),

    [ACTIONS_LABELS.DELETE]: (
      <>
        <Menu.Divider />
        <Menu.Item
          {...ItemProps}
          color="#CC0404"
          leftSection={<TrashIcon width={15} />}
          key={ACTIONS_LABELS.DELETE}
          onClick={deleteProps?.onDelete}
          {...deleteProps}
        >
          {deleteProps?.label || "Delete"}
        </Menu.Item>
      </>
    ),

    [ACTIONS_LABELS.VIEW]: (
      <Menu.Item
        leftSection={<EyeIcon width={14} />}
        key={ACTIONS_LABELS.VIEW}
        onClick={viewProps?.onView}
        {...viewProps}
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
        {...activateSuspendProps}
      >
        {activateSuspendProps?.label || activateSuspendProps?.isActive
          ? "Suspend"
          : "Activate"}
      </Menu.Item>
    ),

    others: (
      <Fragment key={ACTIONS_LABELS.OTHERS}>{otherProps?.children}</Fragment>
    ),
  };

  const mobileView: Record<PropertyKey, ReactNode> = {
    [ACTIONS_LABELS.ADD]: (
      <Tooltip
        key={ACTIONS_LABELS.ADD}
        label={addProps?.label || "Add"}
        className="hidden sm:block"
      >
        <div onClick={addProps?.onAdd}>
          <AddIcon color="var(--blue-8)" />
        </div>
      </Tooltip>
    ),

    [ACTIONS_LABELS.EDIT]: (
      <Tooltip
        key={ACTIONS_LABELS.EDIT}
        label={editProps?.label || "Edit"}
        className="hidden sm:block"
      >
        <div onClick={editProps?.onEdit}>
          <EditIcon color="var(--blue-8)" />
        </div>
      </Tooltip>
    ),

    [ACTIONS_LABELS.DELETE]: (
      <Tooltip
        key={ACTIONS_LABELS.DELETE}
        label={deleteProps?.label || "Delete"}
        className="hidden sm:block"
      >
        <div onClick={deleteProps?.onDelete}>
          <TrashIcon color="var(--red-8)" />
        </div>
      </Tooltip>
    ),

    [ACTIONS_LABELS.VIEW]: (
      <Tooltip
        key={ACTIONS_LABELS.VIEW}
        label={viewProps?.label || "View"}
        className="hidden sm:block"
      >
        <div onClick={viewProps?.onView}>
          <EyeIcon color="var(--blue-8)" />
        </div>
      </Tooltip>
    ),

    [ACTIONS_LABELS.ACTIVATE_SUSPEND]: (
      <Tooltip
        key={ACTIONS_LABELS.ACTIVATE_SUSPEND}
        label={
          activateSuspendProps?.label || activateSuspendProps?.isActive
            ? "Suspend"
            : "Activate"
        }
        className="hidden sm:block"
      >
        <div
          onClick={
            activateSuspendProps?.isActive
              ? activateSuspendProps?.onSuspend
              : activateSuspendProps?.onActivate
          }
        >
          {activateSuspendProps?.isActive ? (
            <DeactivateIcon color="var(--yellow-8)" />
          ) : (
            <ActivateIcon color="var(--green-8)" />
          )}
        </div>
      </Tooltip>
    ),
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
          {actions && actions.map((action) => desktopView[action])}
        </FlowMenuDropdown>
      </FlowMenu>

      {showDesktopView && (
        <Flex className="hidden sm:flex justify-center items-center" gap={8}>
          {actions && actions.map((action) => mobileView[action])}
        </Flex>
      )}
    </Fragment>
  );
}
