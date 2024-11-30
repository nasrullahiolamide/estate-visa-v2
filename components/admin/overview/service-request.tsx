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
      const transformedData = data.map((item) => {
        return {
          day: item.day.substring(0, 3),
          Approved: item.approved,
          Pending: item.pending,
          Declined: item.rejected,
        };
      });

      const hasData = transformedData.some(
        (item) => item.Approved > 0 || item.Pending > 0 || item.Declined > 0
      );

      return hasData ? transformedData : [];
    },
  });

  return (
    <Stack
      bg='white'
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
          data={[
            {
              label: "Week",
              value: "week",
            },
            {
              label: "6 months",
              value: "6months",
            },
            {
              label: "Year",
              value: "year",
            },
          ]}
          ml='auto'
          value={period}
          onFilter={setPeriod}
        />
      </Group>
      {data?.length ? (
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
      ) : (
        <Stack gap={0} h={250}>
          <NoData />
          <Text ta='center'>No Data Available</Text>
        </Stack>
      )}
    </Stack>
  );
}
