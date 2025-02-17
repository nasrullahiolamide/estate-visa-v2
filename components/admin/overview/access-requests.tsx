"use client";

import clsx from "clsx";

import { builder } from "@/builders";
import { useFakeAccessRequestData } from "@/builders/types/admin-dashboard";
import { PieChart } from "@/components/shared/interface/charts/pie";
import { GateIcon, NoData } from "@/icons";
import { cast } from "@/packages/libraries";
import { Flex, Stack, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useQueryState } from "nuqs";
import { useMemo } from "react";

import { floor } from "lodash";
import { DownloadHistory } from "./download-history";
import { FilterRequestsDropdown } from "./requests-dropdown";

export function AccessRequests() {
  const initialAccessRequest = useMemo(() => useFakeAccessRequestData(), []);

  const [period, setPeriod] = useQueryState("ar-prd", {
    defaultValue: "monthly",
  });

  const { data, isPlaceholderData } = useQuery({
    queryKey: builder.dashboard.admin.access_requests.$get(period),
    queryFn: () => builder.$use.dashboard.admin.access_requests({ period }),
    placeholderData: initialAccessRequest,
    select: (data) => {
      const approvedPercentage = floor(data.approvedPercentage);
      const pendingPercentage = floor(data.pendingPercentage);
      const totalRequests = floor(data.totalRequests);

      const noData = approvedPercentage === 0 && pendingPercentage === 0;

      return {
        totalRequests,
        noData,
        requests: [
          {
            name: "Approved",
            value: approvedPercentage,
            color: "#11A506",
            label: approvedPercentage > 0 ? `${approvedPercentage}%` : "",
          },
          {
            name: "Pending",
            value: pendingPercentage,
            color: "#969921",
            label: pendingPercentage > 0 ? `${pendingPercentage}%` : "",
          },
        ],
      };
    },
  });

  return (
    <Stack
      bg='white'
      className={clsx("rounded-lg backdrop-blur-sm w-full sm:w-[620px]", {
        skeleton: isPlaceholderData,
      })}
      p={20}
      gap={16}
    >
      <Stack gap={4}>
        <Flex align='center'>
          <Text fw={500} fz='lg'>
            Access Request
          </Text>

          <FilterRequestsDropdown
            data={["weekly", "monthly", "yearly"]}
            value={period}
            onFilter={setPeriod}
            ml='auto'
          />
        </Flex>
        <DownloadHistory />
      </Stack>
      {data?.noData ? (
        <Stack gap={0} h={250}>
          <NoData />
          <Text ta='center'>No Data Available</Text>
        </Stack>
      ) : (
        // </Stack>
        <PieChart
          data={data?.requests ?? []}
          labelProps={{
            icon: GateIcon,
            text: "Total Requests",
            value: cast.string(data?.totalRequests),
          }}
        />
      )}
    </Stack>
  );
}
