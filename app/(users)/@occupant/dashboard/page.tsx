"use client";

import { builder } from "@/builders";
import { useFakeOccupantDashboard } from "@/builders/types/occupant-dashboard";
import { AppShellHeader, AppShellMain } from "@/components/admin/shared";
import {
  CountDown,
  ServiceRequest,
  StatisticsOverview,
} from "@/components/occupant/overview";
import { APP, calculateDeadline, encode, PAGES } from "@/packages/libraries";
import { getFeatureFlag } from "@/packages/libraries/auth";
import { VALIDITY } from "@/packages/libraries/enum";
import { cookieOptions } from "@/packages/libraries/handlers/handle-login";
import { Stack } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { getCookie, setCookie } from "cookies-next";
import { toString } from "lodash";
import { Fragment, useEffect, useMemo } from "react";

export default function Overview() {
  const userId = toString(getCookie(APP.OCCUPANT_ID));
  const initialOccupantData = useMemo(() => useFakeOccupantDashboard(), []);

  const { data, isPlaceholderData } = useQuery({
    queryKey: builder.dashboard.occupant.get.$get(),
    queryFn: () => builder.$use.dashboard.occupant.get(userId),
    placeholderData: initialOccupantData,
    select: (data) => data,
  });

  const flags = getFeatureFlag();
  const isRestricted = flags.includes(PAGES.SERVICE_REQUESTS);

  useEffect(() => {
    if (!data) return;

    const isValidUser =
      calculateDeadline({
        validityPeriod: data.house.validityPeriod,
        dayCreated: data.house.updatedAt as string,
      }).getTime() > Date.now();

    console.log({ isValidUser });

    setCookie(
      APP.EVISA_ACCOUNT,
      !isValidUser ? VALIDITY.EXPIRED : VALIDITY.VALID,
      {
        ...cookieOptions,
        sameSite: "lax",
        encode,
      }
    );
  }, [data]);

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
          {!isRestricted && <ServiceRequest />}
        </Stack>
      </AppShellMain>
    </Fragment>
  );
}
