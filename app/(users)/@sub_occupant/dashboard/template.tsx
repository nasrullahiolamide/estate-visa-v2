"use client";

import { ProfileData } from "@/builders/types/profile";
import { useFlowState } from "@/components/layout";
import { useFlowDispatch } from "@/components/layout/flow-context";
import { FlowActionType } from "@/components/layout/use-flow-reducer";
import { AppShellButton } from "@/components/shared/interface/app-shell/button";
import {
  AirlineManageGateIcon,
  DashboardIcon,
  EstateVisaLogo,
  GroupDiscussionIcon,
  MarketPlaceIcon,
  ServiceRequestIcon,
} from "@/icons";
import { navigate } from "@/packages/actions";
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
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import Swal from "sweetalert2";

type TemplateProps = React.PropsWithChildren<{}>;

export default function Template({ children }: TemplateProps) {
  const user: ProfileData = decryptUri(getCookie(APP.USER_DATA));
  const collapsedNav = getCookie(APP.EXPANDED_NAVBAR);
  const opened = boolean(collapsedNav ?? true);
  const pathname = usePathname();
  const flags = getFeatureFlag();
  const dispatch = useFlowDispatch();

  const { openedNav } = useFlowState();

  useEffect(() => {
    const isRestricted = flags.some((url) => pathname.includes(url));

    if (openedNav)
      dispatch({ type: FlowActionType.TOGGLE_NAV, payload: false });

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
      navbar={{
        width: opened ? 270 : 95,
        breakpoint: "lg",
      }}
      styles={{
        navbar: {
          zIndex: "100 ",
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
          "hidden lg:flex": !openedNav,
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
                opened={opened}
              />
              <AppShellButton
                leftSection={<AirlineManageGateIcon />}
                href={makePath(PAGES.DASHBOARD, PAGES.GATE_REQUESTS)}
                label={"Gate Requests"}
                opened={opened}
              />

              {/* <AppShellButton
                leftSection={<NoticeBoardIcon />}
                href={makePath(PAGES.DASHBOARD, PAGES.NOTICE_BOARD)}
                label={"Notice Board"}
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
