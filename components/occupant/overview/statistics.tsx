"use client";

import { Box } from "@mantine/core";

import { useQuery } from "@tanstack/react-query";
import { builder } from "@/builders";
import { useFakeAdminDashboardData } from "@/builders/types/admin-dashboard";
import { makePath, PAGES } from "@/packages/libraries";
import { StatisticsCard } from "@/components/admin/shared";
import {
  AirlineManageGateIcon,
  ServiceRequestIcon,
  TablerMessageIcon,
  UserGroupIcon,
} from "@/icons";

export function StatisticsOverview() {
  const initialAdminData = useFakeAdminDashboardData();

  // const { data, isPlaceholderData } = useQuery({
  //   queryKey: builder.dashboard.admin.get.get(),
  //   queryFn: () => builder.use().dashboard.admin.get(),
  //   placeholderData: initialAdminData,
  //   select: (data) => data,
  // });

  return (
    <Box
      className='grid gap-6'
      style={{
        gridTemplateColumns: "repeat(auto-fill,minmax(min(350px,100%),1fr))",
        gridAutoRows: "1fr",
      }}
    >
      <StatisticsCard
        icon={AirlineManageGateIcon}
        title='Total Gate Requests'
        value={initialAdminData?.totalHouses}
        total={initialAdminData?.totalHouses}
        label='Manage Gate Requests'
        href={makePath(PAGES.DASHBOARD, PAGES.GATE_REQUESTS)}
        // skeleton={isPlaceholderData}
      />
      <StatisticsCard
        icon={UserGroupIcon}
        title='Total Sub-Occupant'
        value={initialAdminData?.totalHouses}
        total={initialAdminData?.totalHouses}
        label='Manage Sub-Occupants'
        href={makePath(PAGES.DASHBOARD, PAGES.SUB_OCCUPANTS)}
        // skeleton={isPlaceholderData}
      />

      <StatisticsCard
        icon={TablerMessageIcon}
        title='Total Messages'
        value={initialAdminData?.totalOccupants}
        label='Manage Messages'
        href={makePath(PAGES.DASHBOARD, PAGES.MESSAGES)}
        // skeleton={isPlaceholderData}
      />

      <StatisticsCard
        icon={ServiceRequestIcon}
        title='Total Service Requests'
        value={initialAdminData?.totalSubOccupants}
        label='Manage Service Requests'
        href={makePath(PAGES.DASHBOARD, PAGES.SERVICE_REQUESTS)}
        // skeleton={isPlaceholderData}
      />
    </Box>
  );
}
