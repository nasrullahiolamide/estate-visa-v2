"use client";

import { Box } from "@mantine/core";

import { makePath, PAGES } from "@/packages/libraries";
import { StatisticsCard } from "@/components/admin/shared";
import {
  AirlineManageGateIcon,
  ServiceRequestIcon,
  TablerMessageIcon,
  UserGroupIcon,
} from "@/icons";

interface StatisticsOverviewProps {
  totalGateRequests: number;
  totalServiceRequests: number;
  totalSubOccupants: number;
  totalMessages: number;
  skeleton?: boolean;
}

export function StatisticsOverview({
  totalGateRequests,
  totalServiceRequests,
  totalSubOccupants,
  totalMessages,
  skeleton: isPlaceholderData,
}: StatisticsOverviewProps) {
  return (
    <Box
      className="grid gap-6"
      style={{
        gridTemplateColumns: "repeat(auto-fill,minmax(min(350px,100%),1fr))",
        gridAutoRows: "1fr",
      }}
    >
      <StatisticsCard
        icon={AirlineManageGateIcon}
        title="Total Gate Requests"
        value={totalGateRequests}
        total={totalGateRequests}
        label="Manage Gate Requests"
        href={makePath(PAGES.DASHBOARD, PAGES.GATE_REQUESTS)}
        skeleton={isPlaceholderData}
      />
      <StatisticsCard
        icon={UserGroupIcon}
        title="Total Sub-Occupant"
        value={totalSubOccupants}
        total={totalSubOccupants}
        label="Manage Sub-Occupants"
        href={makePath(PAGES.DASHBOARD, PAGES.SUB_OCCUPANTS)}
        skeleton={isPlaceholderData}
      />

      {/* <StatisticsCard
        icon={TablerMessageIcon}
        title="Total Messages"
        value={totalMessages}
        total={totalMessages}
        label="Manage Messages"
        href={makePath(PAGES.DASHBOARD, PAGES.MESSAGES)}
        skeleton={isPlaceholderData}
      /> */}

      <StatisticsCard
        icon={ServiceRequestIcon}
        title="Total Service Requests"
        value={totalServiceRequests}
        total={totalServiceRequests}
        label="Manage Service Requests"
        href={makePath(PAGES.DASHBOARD, PAGES.SERVICE_REQUESTS)}
        skeleton={isPlaceholderData}
      />
    </Box>
  );
}
