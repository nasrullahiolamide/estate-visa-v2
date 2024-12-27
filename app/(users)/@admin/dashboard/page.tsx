"use client";

import { builder } from "@/builders";
import { useFakeAdminDashboardData } from "@/builders/types/admin-dashboard";
import {
  AccessRequests,
  // RecentActivities,
  ServiceRequests,
  StatisticsOverview,
} from "@/components/admin/overview";
import { AppShellHeader, AppShellMain } from "@/components/admin/shared";
import { decryptUri, APP, PAGES } from "@/packages/libraries";
import { getFeatureFlag } from "@/packages/libraries/auth";

import { Stack, Flex } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { toString } from "lodash";
import { Fragment } from "react";

type FetureFlag = Record<string, string[]>;

export default function Overview() {
  const initialAdminData = useFakeAdminDashboardData();

  const flags = getFeatureFlag();
  const isRestricted = flags.some((flag) => flag === PAGES.SERVICE_REQUESTS);

  const { data, isPlaceholderData } = useQuery({
    queryKey: builder.dashboard.admin.get.$get(),
    queryFn: () => builder.$use.dashboard.admin.get(),
    placeholderData: initialAdminData,
    select: (data) => data,
  });

  if (!data) return null;

  return (
    <Fragment>
      <AppShellHeader title='Overview' />

      <AppShellMain layout='default'>
        <Stack gap={35} w='100%'>
          <StatisticsOverview
            totalGates={data?.totalGates ?? 0}
            totalHouses={data?.totalHouses ?? 0}
            totalOccupants={data?.totalOccupants ?? 0}
            totalSubOccupants={data?.totalSubOccupants ?? 0}
            skeleton={isPlaceholderData}
          />
          <Flex gap={30} className='flex-col sm:flex-row'>
            <AccessRequests />
            {!isRestricted && <ServiceRequests />}
          </Flex>
          {/* <RecentActivities
            data={isPlaceholderData ? [] : data?.recentActivityFeed}
            skeleton={isPlaceholderData}
          /> */}
        </Stack>
      </AppShellMain>
    </Fragment>
  );
}
