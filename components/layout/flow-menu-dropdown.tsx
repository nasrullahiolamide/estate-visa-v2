import { MenuDropdown, MenuDropdownProps } from "@mantine/core";
import clsx from "clsx";

interface FlowMenuDropdownProps extends MenuDropdownProps {}

export function FlowMenuDropdown({
  children,
  ...props
}: FlowMenuDropdownProps) {
  return (
    <MenuDropdown variant="action" {...props}>
      {children}
    </MenuDropdown>
  );
}
