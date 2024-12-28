import { Flex, FlexProps, Text, TextProps, Select } from "@mantine/core";
import { useFlowDispatch, useFlowState } from "./flow-context";
import { FlowActionType } from "./use-flow-reducer";
import { cast } from "@/packages/libraries";
import { ArrowDown2 } from "iconsax-react";

type FlowEntriesPerPageProps = {
  rootProps?: FlexProps;
  pageProps?: TextProps;
  countProps?: TextProps;
  totalProps?: TextProps;
  options?: string[];
};

export function FlowEntriesPerPage({
  rootProps,
  options = ["10", "30", "50", "100"],
}: FlowEntriesPerPageProps) {
  const { pageSize } = useFlowState();
  const dispatch = useFlowDispatch();

  return (
    <Flex
      gap={10}
      wrap="wrap"
      align="center"
      className="prose-sm/medium"
      // lg:flex
      {...rootProps}
    >
      <Text fz={14}>Show</Text>
      <Select
        size="sm"
        searchable={false}
        clearable={false}
        rightSection={<ArrowDown2 size={14} />}
        data={options}
        value={cast.string(pageSize)}
        onChange={(value) => {
          dispatch({
            type: FlowActionType.SET_PAGE_SIZE,
            payload: cast.string(value),
          });
        }}
        classNames={{
          input: "bg-gray-1",
        }}
        style={{
          width: 75,
        }}
      />
      <Text fz={14}>entries</Text>
    </Flex>
  );
}
