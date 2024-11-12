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
};

export function FlowEntriesPerPage({ rootProps }: FlowEntriesPerPageProps) {
  const { pageSize } = useFlowState();
  const dispatch = useFlowDispatch();

  return (
    <Flex
      gap={10}
      wrap='wrap'
      align='center'
      className='prose-sm/medium hidden lg:flex'
      {...rootProps}
    >
      <Text>Show</Text>
      <Select
        data={["20", "50", "100"]}
        value={cast.string(pageSize)}
        onChange={(value) => {
          dispatch({
            type: FlowActionType.SET_PAGE_SIZE,
            payload: cast.number(value),
          });
        }}
        size='sm'
        searchable={false}
        clearable={false}
        rightSection={<ArrowDown2 size={14} />}
        classNames={{
          input: "bg-gray-1",
        }}
        style={{
          width: 75,
        }}
      />
      <Text>entries</Text>
    </Flex>
  );
}
