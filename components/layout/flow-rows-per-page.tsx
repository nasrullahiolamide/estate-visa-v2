import {
  Flex,
  FlexProps,
  NativeSelect,
  NativeSelectProps,
  Text,
  TextProps,
} from "@mantine/core";
import { toNumber, toString } from "lodash";

import { useFlowDispatch, useFlowState } from "./flow-context";
import { FlowActionType } from "./use-flow-reducer";

interface FlowRowsPerPageProps {
  rootProps: FlexProps;
  textProps: TextProps;
  selectProps: NativeSelectProps;
}

export function FlowRowsPerPage({
  rootProps,
  textProps,
  selectProps,
}: FlowRowsPerPageProps) {
  const { pageSize } = useFlowState();
  const dispatch = useFlowDispatch();

  return (
    <Flex align="center" gap={10} {...rootProps}>
      <Text
        className="prose-sm/medium text-primary-text-caption"
        {...textProps}
      >
        Rows per page:
      </Text>

      <NativeSelect
        size="md"
        value={toString(pageSize)}
        rightSectionWidth={20}
        className="text-primary-text-body"
        data={["20", "50", "100"]}
        variant="unstyled"
        onChange={(event) => {
          dispatch({
            type: FlowActionType.SET_PAGE_SIZE,
            payload: toNumber(event.currentTarget.value),
          });
        }}
        {...selectProps}
      />
    </Flex>
  );
}
