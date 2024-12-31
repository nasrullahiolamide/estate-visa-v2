import { Flex, FlexProps, Text, TextProps } from "@mantine/core";
import { useFlowState } from "./flow-context";
import { Fragment } from "react";

type FlowCurrentPageProps = {
  rootProps?: FlexProps;
  pageProps?: TextProps;
  countProps?: TextProps;
  totalProps?: TextProps;
  showTotal?: boolean;
};

export function FlowCurrentPage({
  rootProps,
  pageProps,
  countProps,
  totalProps,
  showTotal = true,
}: FlowCurrentPageProps) {
  const { page, entriesPerPage, totalEntryCount } = useFlowState();

  return (
    <Flex
      gap={2}
      className="prose-sm/medium text-primary-text-caption"
      {...rootProps}
    >
      <Text span>Results: </Text>

      <Text span {...pageProps}>
        {entriesPerPage > 0 ? page : 0}
      </Text>
      <Text span> - </Text>
      <Text span {...countProps}>
        {entriesPerPage}
      </Text>
      {showTotal && (
        <Fragment>
          <Text span> of </Text>
          <Text span {...totalProps}>
            {totalEntryCount}
          </Text>
        </Fragment>
      )}
    </Flex>
  );
}
