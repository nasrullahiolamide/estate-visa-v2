import { Stack, StackProps } from "@mantine/core";
import clsx from "clsx";

interface FlowContainerProps extends StackProps {
  type?: "plain" | "border";
}

export function FlowContainer({
  children,
  type = "border",
  ...props
}: FlowContainerProps) {
  return (
    <Stack
      flex={1}
      h="100%"
      className={clsx("overflow-auto", {
        "border rounded-2xl border-primary-border-light bg-primary-background-subtle":
          type === "border",
      })}
      gap={0}
      {...props}
    >
      {children}
    </Stack>
  );
}
