import {
  ActivateIcon,
  DeactivateIcon,
  EditIcon,
  EyeIcon,
  TrashIcon,
} from "@/svgs";
import { Menu, MenuItemProps } from "@mantine/core";
import { ReactNode } from "react";

enum ITEM_LABELS {
  EDIT = "edit",
  VIEW = "view",
  DELETE = "delete",
  ACTIVATE_SUSPEND = "activate-suspend",
}
type Items = "edit" | "view" | "delete" | "activate-suspend";
// type IsType<T, U> = T extends U ? true : false;
// type IsActivateSuspend = IsType<"activate-suspend", Items>;

// type ActivateSuspend = {
//   isActive: boolean;
//   activateLabel?: string;
//   suspendLabel?: string;
// };

type FlowMenuItemProps = MenuItemProps & {
  item?: Items;
  onClick?: (props: any) => void;
  label?: string;
} & (
    | {
        item: "activate-suspend";
        isActive: boolean;
        handlers: {
          onActivate: (props: any) => void;
          onSuspend: (props: any) => void;
        };
        activateLabel?: string;
        suspendLabel?: string;
      }
    | {
        item?: Exclude<Items, "activate-suspend">;
        isActive?: never;
        activateLabel?: never;
        suspendLabel?: never;
        handlers?: never;
      }
  );

export function FlowMenuItem({
  item,
  label,
  isActive,
  handlers,
  activateLabel,
  suspendLabel,
  children,
  ...props
}: FlowMenuItemProps) {
  const view: Record<PropertyKey, ReactNode> = {
    [ITEM_LABELS.EDIT]: (
      <Menu.Item {...props} leftSection={<EditIcon width={14} />}>
        {label ? label : "Edit"}
      </Menu.Item>
    ),

    [ITEM_LABELS.DELETE]: (
      <Menu.Item
        {...props}
        color='#CC0404'
        leftSection={<TrashIcon width={15} />}
      >
        {label ? label : "Delete"}
      </Menu.Item>
    ),

    [ITEM_LABELS.VIEW]: (
      <Menu.Item {...props} leftSection={<EyeIcon width={14} />}>
        {label ? label : "View"}
      </Menu.Item>
    ),

    [ITEM_LABELS.ACTIVATE_SUSPEND]: (
      <FlowMenuItem
        color={isActive ? "#969921" : "#11A506"}
        onClick={isActive ? handlers.onSuspend : handlers?.onActivate}
        leftSection={
          isActive ? <DeactivateIcon width={13} /> : <ActivateIcon width={13} />
        }
      >
        {/* {activateLabel && suspendLabel && isActive ? suspendLabel : activateLabel} */}
        {isActive ? "Suspend" : "Activate"}
      </FlowMenuItem>
    ),
  };

  return (
    <>{item ? view[item] : <Menu.Item {...props}>{children}</Menu.Item>}</>
  );
}
