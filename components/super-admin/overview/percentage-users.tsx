"use client";

import { Flex, Stack, Text } from "@mantine/core";
import { PieChart } from "@/components/shared/interface/charts/pie";
import { cast } from "@/packages/libraries";

const data = [
  { name: "Occupants", value: 50, color: "#11A506", label: "50%" },
  { name: "Estate owners", value: 20, color: "#EF5DA8", label: "20%" },
  { name: "Sub-occupants", value: 30, color: "#FFA84A", label: "30%" },
];

export function PercentageOfUsers() {
  return (
    <Stack
      flex={1}
      bg='white'
      className='rounded-lg backdrop-blur-sm w-full   '
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
          value: cast.string(1000),
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
