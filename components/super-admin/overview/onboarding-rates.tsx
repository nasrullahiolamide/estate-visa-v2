import { AreaChart } from "@mantine/charts";
import { Stack, Group, Indicator, Flex, Text } from "@mantine/core";
import { FilterRequestsDropdown } from "@/components/admin/overview";
import { rates } from "@/components/admin/data/rates";
import { useQueryState } from "nuqs";

export function OnboardingRates() {
  const [timeFilter, setTimeFilter] = useQueryState("time-filter", {
    defaultValue: "Week",
  });

  return (
    <Stack
      flex={1}
      bg='white'
      justify='space-between'
      className='rounded-lg backdrop-blur-sm w-full'
      p={20}
      gap={18}
    >
      <Group>
        <Text fw={500} size='lg'>
          Onboarding Rates
        </Text>
        <FilterRequestsDropdown
          data={["Week", "Biannual", "Quarter"]}
          onFilter={setTimeFilter}
          value={timeFilter}
          ml='auto'
        />
      </Group>

      <AreaChart
        h={300}
        data={rates}
        dataKey='date'
        series={[
          { name: "users", label: "Users", color: "green.9" },
          { name: "estateOwners", label: "Estate Owners", color: "gray.3" },
        ]}
        curveType='monotone'
        connectNulls
        areaProps={{
          dot: false,
          isAnimationActive: true,
          animationDuration: 1000,
        }}
      />

      <Flex justify='space-between' align='center' mt='auto'>
        <Group className='w-full' flex={1}>
          <Indicator color='green.9' />
          <Text fz={14}>Users</Text>

          <Indicator color='gray.3' />
          <Text fz={14}>Estate Owners</Text>
        </Group>
      </Flex>
    </Stack>
  );
}
