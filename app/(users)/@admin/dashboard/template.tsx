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
import { APP, decryptUri, encode, makePath, PAGES } from "@/packages/libraries";
import {
  AdministratorIcon,
  DashboardIcon,
  EstateVisaLogo,
  GateIcon,
  GroupDiscussionIcon,
  HousesIcon,
  ServiceRequestIcon,
  TablerMessageIcon,
  UserFriendsIcon,
  UserGroupIcon,
} from "@/icons";
import { ProfileData } from "@/builders/types/profile";
import { navigate } from "@/packages/actions";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

import Swal from "sweetalert2";
import { getFeatureFlag } from "@/packages/libraries/auth";

type TemplateProps = React.PropsWithChildren<{}>;

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
        width: opened ? 260 : 95,
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
            className='scrollbar-none ~pt-2\1/8'
          >
            <Stack gap={8}>
              <AppShellButton
                leftSection={<DashboardIcon />}
                href={PAGES.DASHBOARD}
                label={"Overview"}
                opened={opened}
              />
              <AppShellButton
                leftSection={<AdministratorIcon />}
                href={makePath(PAGES.DASHBOARD, PAGES.SUB_ADMINS)}
                label={"Sub Admins"}
                opened={opened}
              />
              <AppShellButton
                leftSection={<UserGroupIcon />}
                href={makePath(PAGES.DASHBOARD, PAGES.PROPERTY_OWNERS)}
                label={"Property Owners"}
                opened={opened}
              />
              <AppShellButton
                leftSection={<UserFriendsIcon />}
                href={makePath(PAGES.DASHBOARD, PAGES.OCCUPANTS)}
                label={"Occupants"}
                opened={opened}
              />
              <AppShellButton
                leftSection={<UserGroupIcon />}
                href={makePath(PAGES.DASHBOARD, PAGES.SUB_OCCUPANTS)}
                label={"Sub Occupants"}
                opened={opened}
              />
              <AppShellButton
                leftSection={<HousesIcon />}
                href={makePath(PAGES.DASHBOARD, PAGES.HOUSES)}
                label={"Houses"}
                opened={opened}
              />
              <AppShellButton
                leftSection={<GateIcon />}
                href={makePath(PAGES.DASHBOARD, PAGES.GATES)}
                label={"Gates"}
                opened={opened}
              />
              {/* <AppShellButton
                leftSection={<TablerMessageIcon />}
                href={makePath(PAGES.DASHBOARD, PAGES.MESSAGES)}
                label={"Messages"}
                opened={opened}
              /> */}
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
