import { Flex, FlexProps } from "@mantine/core";

interface FlowHeaderProps extends FlexProps {}

export function FlowHeader({ children, ...props }: FlowHeaderProps) {
  return (
    <Flex
      justify="space-between"
      p={16}
      align="center"
      className="border-b border-primary-border-light"
      {...props}
    >
      {children}
    </Flex>
  );
}
