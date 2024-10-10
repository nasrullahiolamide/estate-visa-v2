import { FlexProps, Flex } from "@mantine/core";

interface FlowRightSectionProps extends FlexProps {}

export function FlowRightSection({
  children,
  ...props
}: FlowRightSectionProps) {
  return (
    <Flex gap={8} justify="center" align="center" {...props}>
      {children}
    </Flex>
  );
}
