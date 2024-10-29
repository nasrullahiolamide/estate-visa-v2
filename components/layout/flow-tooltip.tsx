import {
  EditIcon,
  TrashIcon,
  EyeIcon,
  ActivateIcon,
  DeactivateIcon,
} from "@/svgs";
import {
  Box,
  BoxProps,
  PolymorphicComponentProps,
  Tooltip,
} from "@mantine/core";
import { ElementType, ReactNode } from "react";

type FlowToolTipCoreProps = {
  label?: string;
  icon: "View" | "Edit" | "Delete" | "Activate" | "Suspend";
  onClick?: (props?: any) => void;
};

type FlowToolTipProps<C extends ElementType = "a"> = FlowToolTipCoreProps &
  PolymorphicComponentProps<C>;

const view: Record<PropertyKey, ReactNode> = {
  View: <EyeIcon color='var(--blue-8)' />,
  Edit: <EditIcon color='var(--blue-8)' />,
  Delete: <TrashIcon color='var(--red-8)' />,
  Activate: <ActivateIcon color='var(--green-8)' />,
  Suspend: <DeactivateIcon color='var(--yellow-8)' />,
};

export function FlowToolTip<C extends ElementType = "a">({
  label,
  icon,
  ...props
}: FlowToolTipProps<C>) {
  return (
    <Tooltip label={label ? label : icon} className='hidden sm:block'>
      <Box {...props}>{children ? children : view[icon]}</Box>
    </Tooltip>
  );
}
