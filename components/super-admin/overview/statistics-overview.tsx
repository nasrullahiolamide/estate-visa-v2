"use client";

import { Box } from "@mantine/core";

import { makePath, PAGES } from "@/packages/libraries";
import { EstateIcon, UserIcon } from "@/icons";
import { StatisticsCard } from "@/components/admin/shared";

interface StatisticsOverviewProps {
  totalEstates: number;
  totalEstateOwners: number;
  totalUsers: number;
  skeleton?: boolean;
}

export function StatisticsOverview({
  totalEstates,
  totalEstateOwners,
  totalUsers,
  skeleton,
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
        icon={EstateIcon}
        title='Total Estates'
        value={totalEstates}
        total={totalEstates}
        label='Manage Houses'
        href={makePath(PAGES.DASHBOARD, PAGES.ESTATES)}
        skeleton={skeleton}
      />

      <StatisticsCard
        icon={UserIcon}
        title='Total Estate Owners'
        value={totalEstateOwners}
        label='Manage Estate Owners'
        href={makePath(PAGES.DASHBOARD, PAGES.ESTATES)}
        skeleton={skeleton}
      />

      <StatisticsCard
        icon={UserIcon}
        title='Total Users'
        value={totalUsers}
        label='Manage Users'
        skeleton={skeleton}
      />
    </Box>
  );
}
