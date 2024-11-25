import {
  Flex,
  FlexProps,
  Pagination,
  PaginationControl,
  PaginationEdgeProps,
  PaginationNext,
  Text,
  TextProps,
} from "@mantine/core";
import { useFlowState } from "./flow-context";

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
  const { page, numberOfPages = 2 } = useFlowState();

  return (
    <Flex
      size='sm'
      component={Pagination.Root}
      total={numberOfPages}
      siblings={3}
      boundaries={1}
      align='center'
      gap={10}
      {...rootProps}
      className='prose-sm/medium'
    >
      <Pagination.Previous />
      {Array.from({ length: numberOfPages }, (_, index) => {
        if (index > 2) return null;
        return (
          <Pagination.Control
            key={index}
            value={index + 1}
            active={index + 1 === page}
          >
            {index + 1}
          </Pagination.Control>
        );
      })}
      {numberOfPages > MAX_CONTROLS && <Pagination.Dots />}

      {numberOfPages > MAX_CONTROLS && (
        <Pagination.Control
          value={numberOfPages}
          active={page === numberOfPages}
        >
          {numberOfPages}
        </Pagination.Control>
      )}

      <Pagination.Next />
    </Flex>
  );
}
