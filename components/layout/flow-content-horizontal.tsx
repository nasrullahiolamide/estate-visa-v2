import { Flex, FlexProps } from "@mantine/core";
import clsx from "clsx";
import { PropsWithChildren } from "react";

type FlowContentHorizontalProps = PropsWithChildren<{
  breakpoint?: `${number}`;
}> &
  FlexProps;

export function FlowContentHorizontal({
  children,
  breakpoint = "420",
  className,
  ...props
}: FlowContentHorizontalProps) {
  return (
    <Flex
      display='grid'
      flex={1}
      className={clsx("grid gap-6", className)}
      style={{
        gridTemplateColumns: `repeat(auto-fill,minmax(min(${breakpoint}px,100%),1fr))`,
        gridAutoRows: "1fr",
      }}
      {...props}
    >
      {children}
    </Flex>
  );
}
