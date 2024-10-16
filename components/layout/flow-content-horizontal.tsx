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
    <Flex
      display='grid'
      flex={1}
      className='grid gap-6'
      style={{
        gridTemplateColumns: "repeat(auto-fill,minmax(min(420px,100%),1fr))",
        gridAutoRows: "1fr",
      }}
    >
      {children}
    </Flex>
  );
}
