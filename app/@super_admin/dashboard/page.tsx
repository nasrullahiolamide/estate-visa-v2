import { Fragment } from "react";
import { Stack, Flex } from "@mantine/core";

import { RecentActivities } from "@/components/admin/overview";
import {
  StatisticsOverview,
  PercentageOfUsers,
  OnboardingRates,
} from "@/components/super-admin/overview";
import {
  AppShellHeader,
  AppShellMain,
} from "@/components/admin/shared/app-shell";
import { FlowContentHorizontal } from "@/components/layout/flow-content-horizontal";

export default function Overview() {
  return (
    <Fragment>
      <AppShellHeader title='Overview' />

      <AppShellMain layout='default'>
        <Stack gap={35} w='100%'>
          <StatisticsOverview />
          <FlowContentHorizontal>
            <OnboardingRates />
            <PercentageOfUsers />
            <RecentActivities />
          </FlowContentHorizontal>
        </Stack>
      </AppShellMain>
    </Fragment>
  );
}
