import { Stack, StackProps } from "@mantine/core";
import clsx from "clsx";

interface FlowContainerProps extends StackProps {
  type?: "plain" | "border";
  skeleton?: boolean;
}

export function FlowContainer({
  children,
  type = "border",
  skeleton,
  ...props
}: FlowContainerProps) {
  return (
    <Stack
      flex={1}
      className={clsx("h-full overflow-auto bg-primary-background-subtle", {
        "border rounded-xl border-primary-border-light bg-primary-background-white":
          type === "border",
        skeleton,
      })}
      gap={0}
      {...props}
    >
      {children}
    </Stack>
  );
}
