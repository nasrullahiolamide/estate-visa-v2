import { ActionIcon, Flex, FlexProps } from "@mantine/core";
import { ReactNode } from "react";

import { GridIcon } from "@/svgs/grid-icon";
import { ListViewIcon } from "@/svgs/list-view-icon";

import { useFlowDispatch, useFlowState } from "./flow-context";
import { FlowActionType } from "./use-flow-reducer";

interface FlowViewToggleProps extends FlexProps {
  rightSection?: ReactNode;
  leftSection?: ReactNode;
}

export function FlowViewToggle({
  rightSection,
  leftSection,
  ...props
}: FlowViewToggleProps) {
  const dispatch = useFlowDispatch();
  const { view } = useFlowState();

  function handleViewChange(view: "grid" | "list") {
    dispatch({ type: FlowActionType.SET_VIEW, payload: view });
  }

  return (
    <Flex gap={8} justify="center" align="center" {...props}>
      {leftSection}

      <ActionIcon
        size={42}
        variant={view === "grid" ? "light" : "transparent"}
        c={view === "grid" ? "accent.9" : "gray.10"}
        onClick={() => handleViewChange("grid")}
      >
        <GridIcon />
      </ActionIcon>

      <ActionIcon
        size={42}
        variant={view === "list" ? "light" : "transparent"}
        c={view === "list" ? "accent.9" : "gray.10"}
        onClick={() => handleViewChange("list")}
      >
        <ListViewIcon />
      </ActionIcon>

      {rightSection}
    </Flex>
  );
}
