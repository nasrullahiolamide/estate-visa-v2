"use client";

import { ProfileData } from "@/builders/types/profile";
import { useFlowNavigation } from "@/components/layout/flow-context";
import { AppShellButton } from "@/components/shared/interface/app-shell/button";
import {
  AirlineManageGateIcon,
  DashboardIcon,
  EstateVisaLogo,
  GroupDiscussionIcon,
  MarketPlaceIcon,
  ServiceRequestIcon,
  UserGroupIcon,
} from "@/icons";
import { APP, decryptUri, makePath, PAGES } from "@/packages/libraries";
import { getFeatureFlag } from "@/packages/libraries/auth";
import {
  AppShell,
  Center,
  Divider,
  Flex,
  ScrollArea,
  Stack,
  Title,
} from "@mantine/core";
import clsx from "clsx";
import { getCookie } from "cookies-next";
import { boolean } from "mathjs";

type TemplateProps = React.PropsWithChildren<{}>;

export default function Template({ children }: TemplateProps) {
  const user: ProfileData = decryptUri(getCookie(APP.USER_DATA));
  const collapsedNav = getCookie(APP.EXPANDED_NAVBAR);
  const opened = boolean(collapsedNav ?? true);
  const flags = getFeatureFlag();

  const { isNavOpened } = useFlowNavigation();

  return (
    <AppShell
      navbar={{
        width: opened ? 270 : 95,
        breakpoint: "lg",
      }}
      styles={{
        navbar: {
          zIndex: "200",
        },
      }}
    >
      <AppShell.Navbar
        withBorder={false}
        py={28}
        px={opened ? 0 : 12}
        style={{
          alignItems: opened ? "unset" : "center",
        }}
        className={clsx({
          "hidden lg:flex": !isNavOpened,
        })}
      >
        <AppShell.Section>
          <Stack gap={0}>
            <Center>
              <EstateVisaLogo height={80} width={80} />
            </Center>

            {user.estate && (
              <Title mt={10} ta='center' fw={500} order={2} c='purple.9'>
                {user.estate.name} Estate
              </Title>
            )}
            <Divider mt={24} />
          </Stack>

          <AppShell.Section
            grow
            component={ScrollArea}
            className={clsx("scrollbar-none ~pt-1/8")}
          >
            <Stack gap={8}>
              <AppShellButton
                leftSection={<DashboardIcon />}
                href={PAGES.DASHBOARD}
                label={"Overview"}
                id='overview'
                opened={opened}
              />
              <AppShellButton
                leftSection={<AirlineManageGateIcon />}
                href={makePath(PAGES.DASHBOARD, PAGES.GATE_REQUESTS)}
                label={"Gate Requests"}
                id='gate-requests'
                opened={opened}
              />
              <AppShellButton
                leftSection={<GroupDiscussionIcon />}
                href={makePath(PAGES.DASHBOARD, PAGES.MEETINGS)}
                label={"Meetings"}
                opened={opened}
              />
              <AppShellButton
                leftSection={<UserGroupIcon />}
                href={makePath(PAGES.DASHBOARD, PAGES.SUB_OCCUPANTS)}
                label={"Sub Occupants"}
                opened={opened}
              />
              {!flags.includes(PAGES.SERVICE_REQUESTS) && (
                <AppShellButton
                  leftSection={<ServiceRequestIcon />}
                  href={makePath(PAGES.DASHBOARD, PAGES.SERVICE_REQUESTS)}
                  label={"Service Requests"}
                  opened={opened}
                />
              )}
              {!flags.includes(PAGES.MARKET_PLACE) && (
                <AppShellButton
                  leftSection={<MarketPlaceIcon />}
                  href={makePath(PAGES.DASHBOARD, PAGES.MARKET_PLACE)}
                  label={"Market Place"}
                  opened={opened}
                />
              )}
            </Stack>
          </AppShell.Section>
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main component={Flex} h='100dvh' className='overflow-auto'>
        <Stack gap={0} flex={1} className='bg-primary-text-normal'>
          {children}
        </Stack>
      </AppShell.Main>
    </AppShell>
  );
}
