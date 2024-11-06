"use client";

import { Box } from "@mantine/core";

import { useQuery } from "@tanstack/react-query";
import { builder } from "@/builders";
import { useFakeAdminDashboardData } from "@/builders/types/admin-dashboard";
import { makePath, PAGES } from "@/packages/libraries";
import { EstateIcon, UserIcon } from "@/icons";
import { StatisticsCard } from "@/components/admin/shared";

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
        icon={EstateIcon}
        title='Total Estates'
        value={data?.totalHouses}
        total={data?.totalHouses}
        label='Manage Houses'
        href={makePath(PAGES.DASHBOARD, PAGES.ESTATES)}
        skeleton={isPlaceholderData}
      />

      <StatisticsCard
        icon={UserIcon}
        title='Total Estate Owners'
        value={data?.totalOccupants}
        label='Manage Estate Owners'
        href={makePath(PAGES.DASHBOARD, PAGES.ESTATES)}
        skeleton={isPlaceholderData}
      />

      <StatisticsCard
        icon={UserIcon}
        title='Total Users'
        value={data?.totalSubOccupants}
        label='Manage Users'
        skeleton={isPlaceholderData}
      />
    </Box>
  );
}
