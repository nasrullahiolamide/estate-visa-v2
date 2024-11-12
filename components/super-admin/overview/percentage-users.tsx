"use client";

import { Stack, Text } from "@mantine/core";
import {
  PieChart,
  PieChartData,
} from "@/components/shared/interface/charts/pie";
import { cast } from "@/packages/libraries";
import clsx from "clsx";

interface PercentageOfUsersProps {
  data: PieChartData[];
  totalUsers: number;
  skeleton?: boolean;
}

export function PercentageOfUsers({
  data,
  totalUsers,
  skeleton,
}: PercentageOfUsersProps) {
  return (
    <Stack
      flex={1}
      bg='white'
      className={clsx("rounded-lg backdrop-blur-sm w-full", { skeleton })}
      p={20}
      gap={16}
    >
      <Text fw={500} fz='lg'>
        Percentage of users
      </Text>

      <PieChart
        withDownloadButton={false}
        data={data}
        labelProps={{
          text: "Total users",
          value: cast.string(totalUsers),
        }}
        legendProps={{
          align: "center",
          justify: "center",
          gap: 10,
        }}
      />
    </Stack>
  );
}
