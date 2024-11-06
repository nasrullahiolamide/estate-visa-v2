"use client";

import { Box } from "@mantine/core";

import { StatisticsCard } from "../shared/cards";
import { useQuery } from "@tanstack/react-query";
import { builder } from "@/builders";
import { useFakeAdminDashboardData } from "@/builders/types/admin-dashboard";
import { makePath, PAGES } from "@/packages/libraries";
import { GateIcon, HousesIcon, UserFriendsIcon, UserGroupIcon } from "@/icons";

export function StatisticsOverview() {
  const initialAdminData = useFakeAdminDashboardData();

  const { data, isPlaceholderData } = useQuery({
    queryKey: builder.dashboard.admin.get.get(),
    queryFn: () => builder.use().dashboard.admin.get(),
    placeholderData: initialAdminData,
    select: (data) => data,
  });

  return (
    <Box
      className='grid gap-6'
      style={{
        gridTemplateColumns: "repeat(auto-fill,minmax(min(350px,100%),1fr))",
        gridAutoRows: "1fr",
      }}
    >
      <StatisticsCard
        icon={HousesIcon}
        title='Total Houses'
        value={data?.totalHouses}
        total={data?.totalHouses}
        label='Manage Houses'
        href={makePath(PAGES.DASHBOARD, PAGES.HOUSES)}
        skeleton={isPlaceholderData}
      />

      <StatisticsCard
        icon={UserFriendsIcon}
        title='Total Occupants'
        value={data?.totalOccupants}
        label='Manage Occupants'
        href={makePath(PAGES.DASHBOARD, PAGES.OCCUPANTS)}
        skeleton={isPlaceholderData}
      />

      <StatisticsCard
        icon={UserGroupIcon}
        title='Total Sub-Occupants'
        value={data?.totalSubOccupants}
        label='Manage Sub-Occupants'
        href={makePath(PAGES.DASHBOARD, PAGES.SUB_OCCUPANTS)}
        skeleton={isPlaceholderData}
      />

      <StatisticsCard
        icon={GateIcon}
        title='Total Gates'
        value={data?.totalGates}
        label='Manage Gates'
        href={makePath(PAGES.DASHBOARD, PAGES.GATES)}
        skeleton={isPlaceholderData}
      />
    </Box>
  );
}
