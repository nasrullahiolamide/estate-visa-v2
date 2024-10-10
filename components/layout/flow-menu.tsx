import { Menu, MenuProps } from "@mantine/core";

interface flowMenuProps extends MenuProps {}

export function FlowMenu({ children, ...props }: flowMenuProps) {
  return (
    <Menu
      offset={0}
      position="bottom-start"
      withArrow
      arrowPosition="center"
      {...props}
    >
      {children}
    </Menu>
  );
}
