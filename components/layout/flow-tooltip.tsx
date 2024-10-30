import {
  EditIcon,
  TrashIcon,
  EyeIcon,
  ActivateIcon,
  DeactivateIcon,
} from "@/svgs";
import {
  Box,
  createPolymorphicComponent,
  BoxProps,
  PolymorphicComponentProps,
  Tooltip,
} from "@mantine/core";
import { ElementType, ReactNode } from "react";

interface FlowToolTipCoreProps {
  label?: string;
  icon: "View" | "Edit" | "Delete" | "Activate" | "Suspend";
  onClick?: (props?: any) => void;
}

const view: Record<PropertyKey, ReactNode> = {
  View: <EyeIcon color='var(--blue-8)' />,
  Edit: <EditIcon color='var(--blue-8)' />,
  Delete: <TrashIcon color='var(--red-8)' />,
  Activate: <ActivateIcon color='var(--green-8)' />,
  Suspend: <DeactivateIcon color='var(--yellow-8)' />,
};

export const FlowToolTip = createPolymorphicComponent<
  "div",
  FlowToolTipCoreProps
>(({ ...props }) => {
  return (
    <Tooltip
      label={props.label ? props.label : props.icon}
      className='hidden sm:block'
    >
      <Box {...props}>{view[props.icon]}</Box>
    </Tooltip>
  );
});
