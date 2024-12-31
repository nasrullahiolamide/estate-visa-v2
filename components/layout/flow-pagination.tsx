import {
  Flex,
  FlexProps,
  Pagination,
  PaginationEdgeProps,
  Text,
  TextProps,
} from "@mantine/core";
import { useFlowState } from "./flow-context";
import { useFlowPagination } from "./use-flow-pagination";

const MAX_CONTROLS = 3;

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
  const pagination = useFlowPagination();

  const handleNextClick = () => {
    if (page < numberOfPages) {
      pagination.setPage((page + 1).toString());
    }
  };

  const handlePreviousClick = () => {
    if (page > 1) {
      pagination.setPage((page - 1).toString());
    }
  };
  return (
    <Flex
      size="sm"
      component={Pagination.Root}
      total={numberOfPages}
      align="center"
      gap={10}
      {...rootProps}
    >
      <Pagination.Previous
        onClick={handlePreviousClick}
        disabled={page <= 1}
        className="disabled:cursor-not-allowed"
        {...previousButtonProps}
      />

      <Flex
        gap={1}
        fw={500}
        className="text-primary-text-subtle"
        {...innerProps}
      >
        <Text span className="text-primary-text-body" {...pageProps}>
          {page}
        </Text>
        <Text span>/</Text>
        <Text span {...limitProps}>
          {numberOfPages}
        </Text>
      </Flex>

      <Pagination.Next
        onClick={handleNextClick}
        disabled={page >= numberOfPages}
        className="disabled:cursor-not-allowed"
        {...nextButtonProps}
      />
    </Flex>
  );
}
