import { Flex, FlexProps } from "@mantine/core";

type FlowContentVerticalProps = FlexProps & {
  breakpoint?: `${number}px`;
};

export function FlowContentVertical({
  children,
  breakpoint = "325px",
  ...props
}: FlowContentVerticalProps) {
  return (
    <Flex
      p={15}
      variant="grid"
      __vars={{
        "--min": breakpoint,
      }}
      gap={16}
      style={{
        overflow: "auto",
      }}
      {...props}
    >
      {children}
    </Flex>
  );
}
