import { Flex, FlexProps } from "@mantine/core";

interface FlowFooterProps extends FlexProps {
  visible?: boolean | number;
}

export function FlowFooter({ children, ...props }: FlowFooterProps) {
  return (
    <Flex
      px={20}
      py={20}
      gap={15}
      wrap='wrap'
      className='lg:justify-between sm:flex flex-col lg:flex-row lg:items-center border-t border-primary-border-light rounded-b-4 bg-primary-background-white sm:px-12'
      {...props}
    >
      {children}
    </Flex>
  );
}
