"use client";

import { Fragment } from "react";
import { useSearchParams } from "next/navigation";
import { Stack } from "@mantine/core";

import { RecentActivities } from "@/components/admin/overview";
import { FlowContentHorizontal } from "@/components/layout";
import {
  StatisticsOverview,
  PercentageOfUsers,
  OnboardingRates,
} from "@/components/super-admin/overview";
import {
  AppShellHeader,
  AppShellMain,
} from "@/components/shared/interface/app-shell";
import { useQuery } from "@tanstack/react-query";

import { builder } from "@/builders";
import { useFakeSuperAdminDashboardData } from "@/builders/types/super-admin-dashboard";

export default function Overview() {
  const initialSuperAdminData = useFakeSuperAdminDashboardData();

  const timeFilter = useSearchParams().get("time-filter") || "Week";

  const { data, isPlaceholderData } = useQuery({
    queryKey: builder.dashboard.super_admin.get.get(timeFilter),
    queryFn: () => builder.use().dashboard.super_admin.get({ timeFilter }),
    placeholderData: initialSuperAdminData,
    select: (data) => {
      const { userPercentage } = { ...data };
      const occupantsPercentage = Math.floor(
        userPercentage.occupantsPercentage
      );
      const estateOwnersPercentage = Math.floor(
        userPercentage.estateOwnersPercentage
      );
      const subOccupantsPercentage = Math.floor(
        userPercentage.subOccupantsPercentage
      );

      return {
        ...data,
        userPercentage: [
          {
            name: "Occupants",
            value: occupantsPercentage,
            color: "#11A506",
            label: occupantsPercentage > 0 ? `${occupantsPercentage}%` : "",
          },
          {
            name: "Estate owners",
            value: estateOwnersPercentage,
            color: "#EF5DA8",
            label:
              estateOwnersPercentage > 0 ? `${estateOwnersPercentage}%` : "",
          },
          {
            name: "Sub-occupants",
            value: subOccupantsPercentage,
            color: "#FFA84A",
            label:
              subOccupantsPercentage > 0 ? `${subOccupantsPercentage}%` : "",
          },
        ],
      };
    },
  });

  if (!data) return;

  return (
    <Fragment>
      <AppShellHeader title='Overview' />

      <AppShellMain layout='default'>
        <Stack gap={35} w='100%'>
          <StatisticsOverview
            totalEstates={data.totalEstates}
            totalEstateOwners={data.totalEstateOwners}
            totalUsers={data.totalUsers}
            skeleton={isPlaceholderData}
          />
          <FlowContentHorizontal>
            <OnboardingRates />
            <PercentageOfUsers
              data={data.userPercentage}
              totalUsers={data.totalUsers}
              skeleton={isPlaceholderData}
            />
            <RecentActivities
              data={isPlaceholderData ? [] : data?.recentActivityFeed}
              skeleton={isPlaceholderData}
            />
          </FlowContentHorizontal>
        </Stack>
      </AppShellMain>
    </Fragment>
  );
}
