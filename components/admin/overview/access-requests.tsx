"use client";

import { GateIcon } from "@/icons";
import { Box, Flex, Group, Indicator, Stack, Text } from "@mantine/core";
import { FilterRequestsDropdown } from "./requests-dropdown";
import { DownloadDropdown } from "../../shared/interface/charts/download-dropdown";
import { PieChart } from "@/components/shared/interface/charts/pie";
import { cast } from "@/packages/libraries";

const data = [
  { name: "Approved", value: 70, color: "#11A506", label: "70%" },
  { name: "Pending", value: 30, color: "#969921", label: "30%" },
];

export function AccessRequests() {
  return (
    <Stack
      bg='white'
      className='rounded-lg backdrop-blur-sm w-full sm:w-[620px]'
      p={20}
      gap={16}
    >
      <Flex>
        <Text fw={500} fz='lg'>
          Access Request
        </Text>

        <FilterRequestsDropdown
          data={["Weekly", "Monthly", "Yearly"]}
          ml='auto'
        />
      </Flex>
      <PieChart
        data={data}
        labelProps={{
          icon: GateIcon,
          text: "Total Requests",
          value: cast.string(10),
        }}
      />
    </Stack>
  );
}
