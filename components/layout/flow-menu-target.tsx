import { MoreIcon } from "@/svgs/more-icon";
import { ActionIcon, MenuTarget, MenuTargetProps } from "@mantine/core";

interface FlowMenuTargetProps extends Omit<MenuTargetProps, "children"> {}

export function FlowMenuTarget(props: FlowMenuTargetProps) {
  return (
    <MenuTarget {...props}>
      <ActionIcon variant="transparent" c="gray" size="lg">
        <MoreIcon />
      </ActionIcon>
    </MenuTarget>
  );
}
