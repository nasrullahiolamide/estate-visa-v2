import { DownloadIcon, FilterIcon } from "@/svgs";
import { BarChart } from "@mantine/charts";
import { Stack, Group, Indicator, Flex, Text, Select } from "@mantine/core";
import { ArrowDown } from "iconsax-react";
import { FilterRequestsDropdown } from "./requests-dropdown";
import { DownloadDropdown } from "../../shared/interface/charts/download-dropdown";

export const data = [
  { day: "Mon", Approved: 1200, Pending: 900, Declined: 200 },
  { day: "Tue", Approved: 1900, Pending: 1200, Declined: 400 },
  { day: "Wed", Approved: 400, Pending: 1000, Declined: 200 },
  { day: "Thur", Approved: 1000, Pending: 200, Declined: 800 },
  { day: "Fri", Approved: 800, Pending: 1400, Declined: 1200 },
  { day: "Sat", Approved: 750, Pending: 600, Declined: 1000 },
  { day: "Sun", Approved: 750, Pending: 600, Declined: 1000 },
];

export function ServiceRequests() {
  return (
    <Stack
      bg='white'
      justify='space-between'
      className='rounded-lg backdrop-blur-sm w-full'
      p={20}
      gap={16}
    >
      <Group>
        <Text fw={500} size='lg'>
          Service Request
        </Text>
        <FilterRequestsDropdown data={["Week", "6 months", "Year"]} ml='auto' />
      </Group>
      <BarChart
        h={300}
        data={data}
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
          <Indicator color='#11A506' />
          <Text fz={14}>Approved</Text>

          <Indicator color='#969921' />
          <Text fz={14}>Pending</Text>
          <Indicator color='#EF5DA8' />
          <Text fz={14}>Declined</Text>
        </Group>
        <DownloadDropdown />
      </Flex>
    </Stack>
  );
}
