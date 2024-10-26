import { Stack, StackProps } from "@mantine/core";

interface FlowStepContentProps extends StackProps {}

export function FlowStepContent({ children, ...props }: FlowStepContentProps) {
  return (
    <Stack className='h-full w-full' {...props}>
      {children}
    </Stack>
  );
}
