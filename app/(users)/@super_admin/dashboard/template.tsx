"use client";

import {
  AppShell,
  Center,
  Divider,
  Flex,
  ScrollArea,
  Stack,
  Title,
} from "@mantine/core";
import { getCookie } from "cookies-next";
import { boolean } from "mathjs";

import { ProfileData } from "@/builders/types/profile";
import { useFlowState } from "@/components/layout";
import { AppShellButton } from "@/components/shared/interface/app-shell/button";
import { DashboardIcon, EstateIcon, EstateVisaLogo } from "@/icons";
import { APP, decryptUri, makePath, PAGES } from "@/packages/libraries";
import clsx from "clsx";

type TemplateProps = React.PropsWithChildren<{}>;

export default function Template({ children }: TemplateProps) {
  const user: ProfileData = decryptUri(getCookie(APP.USER_DATA));
  const collapsedNav = getCookie(APP.EXPANDED_NAVBAR);
  const opened = boolean(collapsedNav ?? true);

  const { openedNav } = useFlowState();

  return (
    <AppShell
      navbar={{
        width: opened ? 270 : 95,
        collapsed: { mobile: !openedNav },
        breakpoint: "lg",
      }}
      styles={{
        navbar: {
          zIndex: "100 !important",
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
      >
        <AppShell.Section>
          <Stack
            gap={0}
            className={clsx({
              "hidden lg:flex": openedNav,
            })}
          >
            <Center>
              <EstateVisaLogo height={80} width={80} />
            </Center>

            {user.estate && (
              <Title mt={10} ta="center" fw={700} c="purple.9">
                {user.estate.name} Estate
              </Title>
            )}
            <Divider mt={24} />
          </Stack>
        </AppShell.Section>

        <AppShell.Section
          grow
          component={ScrollArea}
          className={clsx("scrollbar-none ~pt-1/8", { "mt-12": openedNav })}
        >
          <Stack gap={8}>
            <AppShellButton
              leftSection={<DashboardIcon />}
              href={PAGES.DASHBOARD}
              label={"Overview"}
              opened={opened}
            />
            <AppShellButton
              leftSection={<EstateIcon />}
              href={makePath(PAGES.DASHBOARD, PAGES.ESTATES)}
              label={"Estates"}
              opened={opened}
            />
          </Stack>
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main component={Flex} h="100dvh" className="overflow-auto">
        <Stack gap={0} flex={1} className="bg-primary-text-normal">
          {children}
        </Stack>
      </AppShell.Main>
    </AppShell>
  );
}
