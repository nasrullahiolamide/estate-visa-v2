import { Stack, StackProps } from "@mantine/core";

interface FlowModalContentProps extends StackProps {}

export function FlowModalContent({
  children,
  ...props
}: FlowModalContentProps) {
  return (
    <Stack
      py={20}
      mb={16}
      className="border-y border-primary-border-light"
      {...props}
    >
      {children}
    </Stack>
  );
}
