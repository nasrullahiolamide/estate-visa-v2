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
  const { page, entriesCountOnCurrentPage, totalEntryCount } = useFlowState();

  return (
    <Flex
      gap={2}
      className="prose-sm/medium text-primary-text-caption"
      {...rootProps}
    >
      <Text span {...pageProps}>
        {page}
      </Text>
      <Text span> - </Text>
      <Text span {...countProps}>
        {entriesCountOnCurrentPage}
      </Text>
      <Text span> of </Text>
      <Text span {...totalProps}>
        {totalEntryCount}
      </Text>
    </Flex>
  );
}
