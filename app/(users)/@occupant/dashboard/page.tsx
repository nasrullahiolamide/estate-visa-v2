"use client";

import { builder } from "@/builders";
import { useFakeOccupantDashboard } from "@/builders/types/occupant-dashboard";
import { AppShellHeader, AppShellMain } from "@/components/admin/shared";
import {
  ServiceRequest,
  StatisticsOverview,
  CountDown,
} from "@/components/occupant/overview";
import { APP } from "@/packages/libraries";

import { Stack } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { toString } from "lodash";
import { Fragment } from "react";

export default function Overview() {
  const userId = toString(getCookie(APP.OCCUPANT_ID));
  const initialOccupantData = useFakeOccupantDashboard();

  const { data, isPlaceholderData } = useQuery({
    queryKey: builder.dashboard.occupant.get.get(),
    queryFn: () => builder.use().dashboard.occupant.get(userId),
    placeholderData: initialOccupantData,
    select: (data) => data,
  });

  console.log(data);

  return (
    <Fragment>
      <AppShellHeader title='Overview' />

      <AppShellMain layout='default'>
        <Stack gap={35} w='100%'>
          <StatisticsOverview
            totalGateRequests={data?.totalGateRequests ?? 0}
            totalMessages={data?.totalMessages ?? 0}
            totalSubOccupants={data?.totalSubOccupants ?? 0}
            totalServiceRequests={data?.totalServiceRequests ?? 0}
            skeleton={isPlaceholderData}
          />
          <CountDown house={data?.house} skeleton={isPlaceholderData} />
          <ServiceRequest />
        </Stack>
      </AppShellMain>
    </Fragment>
  );
}
