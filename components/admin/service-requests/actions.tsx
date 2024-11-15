import { Fragment, ReactNode } from "react";
import { Menu } from "@mantine/core";
import {
  FlowMenu,
  FlowMenuDropdown,
  FlowMenuTarget,
} from "@/components/layout";
import { DoubleMarkIcon } from "@/icons";

interface ServiceRequestActionsProps {
  id: string;
  status: string;
}

export function ServiceRequestActions({
  status,
  id,
}: ServiceRequestActionsProps) {
  const render: Record<PropertyKey, ReactNode> = {
    "in progress": (
      <Menu.Item color='blue.7' leftSection={<DoubleMarkIcon width={14} />}>
        Set as Completed
      </Menu.Item>
    ),

    pending: (
      <Menu.Item color='blue.7' leftSection={<DoubleMarkIcon width={14} />}>
        Set as In Progress
      </Menu.Item>
    ),
  };

  return (
    <FlowMenu>
      <FlowMenuTarget />
      <FlowMenuDropdown>{render[status]}</FlowMenuDropdown>
    </FlowMenu>
  );
}
