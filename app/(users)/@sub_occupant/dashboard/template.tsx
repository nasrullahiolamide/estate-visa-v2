"use client";

import { getCookie } from "cookies-next";
import { boolean } from "mathjs";
import {
  AppShell,
  Center,
  Divider,
  Flex,
  ScrollArea,
  Stack,
  Title,
} from "@mantine/core";

import { AppShellButton } from "@/components/shared/interface/app-shell/button";
import { APP, decryptUri, makePath, PAGES } from "@/packages/libraries";
import {
  AirlineManageGateIcon,
  DashboardIcon,
  EstateVisaLogo,
  GroupDiscussionIcon,
  NoticeBoardIcon,
  ServiceRequestIcon,
} from "@/icons";
import { ProfileData } from "@/builders/types/profile";
import { usePathname } from "next/navigation";
import { navigate } from "@/packages/actions";
import { useEffect } from "react";

import Swal from "sweetalert2";
import { toString } from "lodash";
import { getFeatureFlag } from "@/packages/libraries/auth";

type TemplateProps = React.PropsWithChildren<{}>;
type FeatureFlag = Record<string, string[]>;

export default function Template({ children }: TemplateProps) {
  const user: ProfileData = decryptUri(getCookie(APP.USER_DATA));
  const collapsedNav = getCookie(APP.EXPANDED_NAVBAR);
  const opened = boolean(collapsedNav ?? true);

  const pathname = usePathname();
  const flags = getFeatureFlag();

  useEffect(() => {
    const isRestricted = flags.some((url) => pathname.includes(url));

    if (isRestricted) {
      Swal.fire({
        icon: "error",
        title: "Permission Denied",
        text: "You do not have access to this feature.",
        confirmButtonColor: "var(--blue-8)",
        confirmButtonText: "Go to Dashboard",
        allowOutsideClick: false,
        allowEnterKey: false,
        allowEscapeKey: false,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(PAGES.DASHBOARD);
        }
      });
    }
  }, [pathname]);

  return (
    <AppShell
      bg='accent.12'
      navbar={{
        width: opened ? 240 : 95,
        breakpoint: "lg",
        collapsed: { mobile: true },
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
          <Center>
            <EstateVisaLogo height={80} width={80} />
          </Center>

          {user.estate && (
            <Title mt={10} ta='center' fw={700} c='purple.9'>
              {user.estate.name} Estate
            </Title>
          )}
          <Divider mt={24} />

          <AppShell.Section
            grow
            component={ScrollArea}
            className='scrollbar-none ~pt-2/14'
          >
            <Stack gap={8}>
              <AppShellButton
                leftSection={<DashboardIcon />}
                href={PAGES.DASHBOARD}
                label={"Overview"}
                opened={opened}
              />
              <AppShellButton
                leftSection={<AirlineManageGateIcon />}
                href={makePath(PAGES.DASHBOARD, PAGES.GATE_REQUESTS)}
                label={"Gate Requests"}
                opened={opened}
              />

              <AppShellButton
                leftSection={<NoticeBoardIcon />}
                href={makePath(PAGES.DASHBOARD, PAGES.NOTICE_BOARD)}
                label={"Notice Board"}
                opened={opened}
              />
              <AppShellButton
                leftSection={<GroupDiscussionIcon />}
                href={makePath(PAGES.DASHBOARD, PAGES.MEETINGS)}
                label={"Meetings"}
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
