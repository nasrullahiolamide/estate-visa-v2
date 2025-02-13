"use client";

import clsx from "clsx";
import { Avatar, Flex, Stack, Text, Title } from "@mantine/core";
import { RecentActivityFeed } from "@/builders/types/super-admin-dashboard";
import { FlowContentContainer } from "@/components/layout";
import { fromNow } from "@/packages/libraries/formatters";
import { NoData } from "@/icons";

interface RecentActivitiesProps {
  data: RecentActivityFeed[];
  skeleton?: boolean;
}

const user = null;

export function RecentActivities({
  data = [],
  skeleton,
}: RecentActivitiesProps) {
  return (
    <Stack
      flex={1}
      bg="white"
      className={clsx("rounded-lg backdrop-blur-sm w-full", {
        skeleton,
      })}
      p={20}
      gap={16}
    >
      <Stack gap={6}>
        <Title order={2} className="prose-xl/medium text-primary-text-body">
          Recent Activity Feed
        </Title>
        {data.length !== 0 && (
          <Text c="gray" fz={14}>
            Showing activities for the last 7 days
          </Text>
        )}
      </Stack>

      <FlowContentContainer
        mt={12}
        mih={300}
        mah={350}
        className="overflow-scroll"
      >
        {!data.length ? (
          <Stack gap={0} h={320}>
            <NoData />
            <Text ta="center" mb={20}>
              No Data Available
            </Text>
          </Stack>
        ) : (
          data.map((activity) => (
            <Flex
              key={activity.id}
              flex={1}
              gap={18}
              wrap="nowrap"
              align="center"
              className={clsx("border-t border-gray-2 h-full ", {
                skeleton,
              })}
              py={16}
            >
              {user ? (
                <Avatar src={user} radius="xl" size={45} />
              ) : (
                <Avatar color="blue.4" radius="xl" size={45}>
                  {/* {user?.name[0]} */}
                  {user}
                </Avatar>
              )}
              <Stack gap={4}>
                <Text fz={14}>{activity.details}</Text>
                <Text fz={12} c="gray">
                  {fromNow(activity.createdAt)}
                </Text>
              </Stack>
            </Flex>
          ))
        )}
      </FlowContentContainer>
    </Stack>
  );
}
