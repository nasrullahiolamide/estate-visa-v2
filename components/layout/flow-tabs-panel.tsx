import {
  createPolymorphicComponent,
  Tabs,
  TabsPanelProps,
} from "@mantine/core";
import { forwardRef } from "react";

interface FlowTabsPanelProps extends TabsPanelProps {}

export const FlowTabsPanel = createPolymorphicComponent<
  "div",
  FlowTabsPanelProps
>(
  forwardRef<HTMLDivElement, FlowTabsPanelProps>(
    ({ children, ...props }, ref) => {
      return (
        <Tabs.Panel ref={ref} flex={1} h="100%" {...props}>
          {children}
        </Tabs.Panel>
      );
    }
  )
);
