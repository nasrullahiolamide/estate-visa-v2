import { MenuDropdown, MenuDropdownProps } from "@mantine/core";

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
