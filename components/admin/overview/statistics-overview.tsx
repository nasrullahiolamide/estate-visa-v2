"use client";

import { Box } from "@mantine/core";

import { StatisticsCard } from "../../shared/interface/cards";
import { makePath, PAGES } from "@/packages/libraries";
import { GateIcon, HousesIcon, UserFriendsIcon, UserGroupIcon } from "@/icons";

interface StatisticsOverviewProps {
  totalHouses: number;
  totalOccupants: number;
  totalSubOccupants: number;
  totalGates: number;
  skeleton?: boolean;
}

export function StatisticsOverview({
  totalHouses,
  totalOccupants,
  totalSubOccupants,
  totalGates,
  skeleton: isPlaceholderData,
}: StatisticsOverviewProps) {
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
        value={totalHouses}
        label='Manage Houses'
        href={makePath(PAGES.DASHBOARD, PAGES.HOUSES)}
        skeleton={isPlaceholderData}
      />

      <StatisticsCard
        icon={UserFriendsIcon}
        title='Total Occupants'
        total={totalOccupants}
        label='Manage Occupants'
        href={makePath(PAGES.DASHBOARD, PAGES.OCCUPANTS)}
        skeleton={isPlaceholderData}
      />

      <StatisticsCard
        icon={UserGroupIcon}
        title='Total Sub-Occupants'
        total={totalSubOccupants}
        label='Manage Sub-Occupants'
        href={makePath(PAGES.DASHBOARD, PAGES.SUB_OCCUPANTS)}
        skeleton={isPlaceholderData}
      />

      <StatisticsCard
        icon={GateIcon}
        title='Total Gates'
        total={totalGates}
        label='Manage Gates'
        href={makePath(PAGES.DASHBOARD, PAGES.GATES)}
        skeleton={isPlaceholderData}
      />
    </Box>
  );
}
