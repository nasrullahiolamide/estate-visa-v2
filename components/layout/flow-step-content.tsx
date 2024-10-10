import { Stack, StackProps } from "@mantine/core";

interface FlowStepContentProps extends StackProps {}

export function FlowStepContent({ children, ...props }: FlowStepContentProps) {
  return (
    <Stack
      py={20}
      my={16}
      className="border-y border-primary-border-light"
      {...props}
    >
      {children}
    </Stack>
  );
}
