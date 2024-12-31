import {
  EditIcon,
  TrashIcon,
  EyeIcon,
  ActivateIcon,
  DeactivateIcon,
  AddIcon,
} from "@/icons";
import { Box, createPolymorphicComponent, Tooltip } from "@mantine/core";
import { PasswordCheck } from "iconsax-react";
import { ReactNode } from "react";
import { MdOutlinePassword } from "react-icons/md";

interface FlowToolTipCoreProps {
  label?: string;
  icon:
    | "View"
    | "Edit"
    | "Delete"
    | "Activate"
    | "Suspend"
    | "Add"
    | "Password";
  onClick?: (props?: any) => void;
}

const view: Record<PropertyKey, ReactNode> = {
  View: <EyeIcon color="var(--blue-8)" />,
  Edit: <EditIcon color="var(--blue-8)" />,
  Delete: <TrashIcon color="var(--red-8)" />,
  Activate: <ActivateIcon color="var(--green-8)" />,
  Suspend: <DeactivateIcon color="var(--yellow-8)" />,
  Add: <AddIcon />,
  Password: <MdOutlinePassword size={20} color="var(--blue-8)" />,
};

export const FlowToolTip = createPolymorphicComponent<
  "div",
  FlowToolTipCoreProps
>(({ ...props }) => {
  return (
    <Tooltip
      label={props.label ? props.label : props.icon}
      className="hidden sm:block"
    >
      <Box {...props}>{view[props.icon]}</Box>
    </Tooltip>
  );
});
