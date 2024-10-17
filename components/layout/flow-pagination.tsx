import {
  Button,
  Flex,
  FlexProps,
  Pagination,
  PaginationEdgeProps,
  Text,
  TextProps,
} from "@mantine/core";
import { useFlowState } from "./flow-context";

interface FlowPaginationProps {
  rootProps?: FlexProps;
  previousButtonProps?: PaginationEdgeProps;
  nextButtonProps?: PaginationEdgeProps;
  innerProps?: FlexProps;
  pageProps?: TextProps;
  limitProps?: TextProps;
}

export function FlowPagination({
  rootProps,
  previousButtonProps,
  nextButtonProps,
  innerProps,
  pageProps,
  limitProps,
}: FlowPaginationProps) {
  const { page, numberOfPages } = useFlowState();

  return (
    <Flex
      size='sm'
      component={Pagination.Root}
      total={numberOfPages}
      align='center'
      gap={10}
      {...rootProps}
      className='prose-sm/medium text-primary-text-caption'
    >
      <Pagination.Previous {...previousButtonProps} content='P'>
        Previous
      </Pagination.Previous>

      {/* <Flex
        gap={1}
        fw={500}
        className='text-primary-text-subtle'
        {...innerProps}
      >
        <Text span className='text-primary-text-body' {...pageProps}>
          {page}
        </Text>
        <Text span>/</Text>
        <Text span {...limitProps}>
          {numberOfPages}
        </Text>
      </Flex> */}

      <Pagination.Items />

      <Pagination.Next {...nextButtonProps}>Next</Pagination.Next>
    </Flex>
  );
}
