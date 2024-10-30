import { Stack, StackProps, Tabs, TabsProps } from "@mantine/core";

interface FlowTabsProps extends TabsProps {
  tabsContainerProps?: StackProps;
}

export function FlowTabs({
  children,
  tabsContainerProps,
  ...props
}: FlowTabsProps) {
  return (
    <Stack flex={1} {...tabsContainerProps}>
      <Tabs {...props} display='contents'>
        {children}
      </Tabs>
    </Stack>
  );
}
