import { Flex, FlexProps } from "@mantine/core";
import clsx from "clsx";

interface FlowFooterProps extends FlexProps {
  visible?: boolean;
}

export function FlowFooter({ children, visible, ...props }: FlowFooterProps) {
  return (
    <Flex
      px={20}
      py={20}
      gap={15}
      wrap='wrap'
      hidden={visible}
      className={clsx(
        "justify-between items-center",
        "border-t border-primary-border-light",
        "rounded-b-4 bg-primary-background-white sm:px-12"
      )}
      {...props}
    >
      {children}
    </Flex>
  );
}
