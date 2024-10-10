import { Stack, StackProps } from "@mantine/core";

interface FlowFormContentProps extends StackProps {}

export function FlowFormContent({ children, ...props }: FlowFormContentProps) {
  return (
    <Stack px={32} py={24} gap={16} flex={1} {...props}>
      {children}
    </Stack>
  );
}
