import clsx from "clsx";

import { NoData } from "@/icons";
import { BarChart } from "@mantine/charts";
import { Stack, Group, Indicator, Flex, Text } from "@mantine/core";
import { FilterRequestsDropdown } from "./requests-dropdown";
import { DownloadDropdown } from "../../shared/interface/charts/download-dropdown";
import { useQueryState } from "nuqs";
import { builder } from "@/builders";
import { useFakeServiceRequesData } from "@/builders/types/admin-dashboard";
import { useQuery } from "@tanstack/react-query";
import { Fragment } from "react";

export type ServiceRequestData = {
  day: string;
  approved: number;
  rejected: number;
  pending: number;
};

export function ServiceRequests() {
  const initialServiceRequests = useFakeServiceRequesData();

  const [period, setPeriod] = useQueryState("sr-prd", {
    defaultValue: "week",
  });

  const { data, isPlaceholderData } = useQuery({
    queryKey: builder.dashboard.admin.service_requests.get(period),
    queryFn: () => builder.use().dashboard.admin.service_requests({ period }),
    placeholderData: initialServiceRequests,
    select: (data) => {
      return data.map((item) => {
        return {
          day: item.day.substring(0, 3),
          Approved: item.approved,
          Pending: item.pending,
          Declined: item.rejected,
        };
      });
    },
  });

  return (
    <Stack
      bg='white'
      justify='space-between'
      className={clsx("rounded-lg backdrop-blur-sm w-full", {
        skeleton: isPlaceholderData,
      })}
      p={20}
      gap={16}
    >
      <Group>
        <Text fw={500} size='lg'>
          Service Request
        </Text>
        <FilterRequestsDropdown
          data={["week", "6months", "year"]}
          ml='auto'
          value={period}
          onFilter={setPeriod}
        />
      </Group>
      <Fragment>
        <BarChart
          h={300}
          data={data ?? []}
          dataKey='day'
          type='stacked'
          series={[
            { name: "Approved", color: "#11A506" },
            { name: "Pending", color: "#969921" },
            { name: "Declined", color: "#EF5DA8" },
          ]}
          barProps={{
            isAnimationActive: true,
            animationDuration: 1000,
          }}
        />
        <Flex justify='space-between' align='center' mt='auto'>
          <Group>
            <Flex align='center' gap={14}>
              <Indicator color='#11A506' />
              <Text fz={14}>Approved</Text>
            </Flex>
            <Flex align='center' gap={14}>
              <Indicator color='#969921' />
              <Text fz={14}>Pending</Text>
            </Flex>
            <Flex align='center' gap={14}>
              <Indicator color='#EF5DA8' />
              <Text fz={14}>Declined</Text>
            </Flex>
          </Group>
          <DownloadDropdown />
        </Flex>
      </Fragment>
    </Stack>
  );
}
