import { Flex, FlexProps, Text, TextProps } from "@mantine/core";
import { useFlowState } from "./flow-context";

type FlowCurrentPageProps = {
  rootProps?: FlexProps;
  pageProps?: TextProps;
  countProps?: TextProps;
  totalProps?: TextProps;
};

export function FlowCurrentPage({
  rootProps,
  pageProps,
  countProps,
  totalProps,
}: FlowCurrentPageProps) {
  const { page, entriesPerPage, totalEntryCount } = useFlowState();

  return (
    <Flex
      gap={2}
      className='prose-sm/medium text-primary-text-caption'
      {...rootProps}
    >
      <Text span {...pageProps}>
        {entriesPerPage > 0 ? page : 0}
      </Text>
      <Text span> - </Text>
      <Text span {...countProps}>
        {entriesPerPage}
      </Text>
      <Text span> of </Text>
      <Text span {...totalProps}>
        {totalEntryCount}
      </Text>
    </Flex>
  );
}
