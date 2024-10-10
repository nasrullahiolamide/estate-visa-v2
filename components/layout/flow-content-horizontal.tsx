import { Flex } from "@mantine/core";
import { PropsWithChildren } from "react";

type FlowContentHorizontalProps = PropsWithChildren<{
  breakpoint?: `${number}px`;
}>;

export function FlowContentHorizontal({
  children,
  breakpoint = "325px",
}: FlowContentHorizontalProps) {
  return (
    <Flex display="grid" flex={1} className="overflow-auto scrollbar-none">
      <Flex
        gap={16}
        variant="linear"
        __vars={{
          "--min": breakpoint,
        }}
      >
        {children}
      </Flex>
    </Flex>
  );
}
