import { Stack, StackProps } from "@mantine/core";

interface FlowContentContainerProps extends StackProps {}

export function FlowContentContainer({
  children,
  ...props
}: FlowContentContainerProps) {
  return (
    <Stack
      gap={0}
      flex={1}
      pos="relative"
      align="normal"
      style={{
        overflow: "auto",
      }}
      {...props}
    >
      {children}
    </Stack>
  );
}
