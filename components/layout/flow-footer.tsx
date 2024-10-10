import { Flex, FlexProps } from "@mantine/core";

interface FlowFooterProps extends FlexProps {
  visible?: boolean | number;
}

export function FlowFooter({
  children,
  visible = true,
  ...props
}: FlowFooterProps) {
  return (
    <Flex
      p={20}
      hidden={!visible}
      justify="space-between"
      align="center"
      className="border-t border-primary-border-light rounded-b-4 bg-primary-background-white"
      {...props}
    >
      {children}
    </Flex>
  );
}
