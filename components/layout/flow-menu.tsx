import { Box, BoxProps, Menu, MenuProps } from "@mantine/core";

interface flowMenuProps extends MenuProps {
  wrapperProps?: BoxProps;
}

export function FlowMenu({ children, wrapperProps, ...props }: flowMenuProps) {
  return (
    <Box {...wrapperProps}>
      <Menu
        offset={0}
        position="bottom"
        withArrow
        arrowPosition="center"
        {...props}
      >
        {children}
      </Menu>
    </Box>
  );
}
