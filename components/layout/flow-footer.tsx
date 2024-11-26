import { Flex, FlexProps } from "@mantine/core";

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
      className='justify-between items-center border-t border-primary-border-light rounded-b-4 bg-primary-background-white sm:px-12'
      hidden={visible}
      {...props}
    >
      {children}
    </Flex>
  );
}
