import { AppShellHeader, AppShellMain } from "@/components/admin/shared";
import {
  ServiceRequest,
  StatisticsOverview,
  CountDown,
} from "@/components/occupant/overview";

import { Stack } from "@mantine/core";
import { Fragment } from "react";

export default function Overview() {
  return (
    <Fragment>
      <AppShellHeader title='Overview' />

      <AppShellMain layout='default'>
        <Stack gap={35} w='100%'>
          <StatisticsOverview />
          <CountDown />
          <ServiceRequest />
        </Stack>
      </AppShellMain>
    </Fragment>
  );
}
