"use client";

import { Stack, Tabs, Title } from "@mantine/core";
import { useQueryState } from "nuqs";

import { notifications } from "../data/notifications";
import { NotificationItem } from "./notification-item";
import {
  FlowContentContainer,
  FlowTabs,
  FlowTabsPanel,
} from "@/components/layout";

export function RecentActivities() {
  const [activity, setActivity] = useQueryState("activity", {
    defaultValue: "this-week",
  });

  return (
    <Stack
      flex={1}
      bg='white'
      className=' rounded-lg backdrop-blur-sm w-full'
      p={20}
      gap={16}
    >
      <Title className='prose-xl/medium text-primary-text-body'>
        Recent Activity Feed
      </Title>

      <FlowTabs value={activity} onChange={setActivity} px={0}>
        <Tabs.List>
          <Tabs.Tab value='this-week'>This week</Tabs.Tab>
          <Tabs.Tab value='last-week'>Last week</Tabs.Tab>
        </Tabs.List>

        <FlowTabsPanel value='this-week' mih={300}>
          <FlowContentContainer
            mt={16}
            className='lg:overflow-scroll h-full sm:h-[300px]'
          >
            {notifications.map((notification, index) => (
              <NotificationItem {...notification} key={index} />
            ))}
          </FlowContentContainer>
        </FlowTabsPanel>
        <FlowTabsPanel value='last-week' mih={300}>
          <FlowContentContainer h={300} mt={16} className='lg:overflow-scroll '>
            {notifications.map((notification, index) => (
              <NotificationItem {...notification} key={index} />
            ))}
          </FlowContentContainer>
        </FlowTabsPanel>
      </FlowTabs>
    </Stack>
  );
}
