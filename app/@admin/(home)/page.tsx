import {
  AccessRequests,
  RecentActivities,
  ServiceRequests,
  StatisticsOverview,
} from "@/components/admin/overview";
import { AppShellHeader, AppShellMain } from "@/components/admin/shared";

import { Stack, Flex } from "@mantine/core";
import { Fragment } from "react";

export default function Overview() {
  return (
    <Fragment>
      <AppShellHeader title='Overview' />

      <AppShellMain layout='default'>
        <Stack gap={35} w='100%'>
          <StatisticsOverview />
          <Flex gap={30} className='flex-col sm:flex-row'>
            <AccessRequests />
            <ServiceRequests />
          </Flex>
          <RecentActivities />
        </Stack>
      </AppShellMain>
    </Fragment>
  );
}
