import { Box, BoxProps } from "@mantine/core";
import { ComponentProps, PropsWithChildren } from "react";

interface FlowScrollHorizontalProps extends PropsWithChildren<BoxProps> {}

export function FlowScrollHorizontal({ children }: FlowScrollHorizontalProps) {
  return <Box className="flex overflow-x-auto">{children}</Box>;
}
