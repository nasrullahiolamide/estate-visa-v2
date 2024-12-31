"use client";

import { ProfileData } from "@/builders/types/profile";
import { useFlowState } from "@/components/layout";
import { useFlowDispatch } from "@/components/layout/flow-context";
import { FlowSearch, FlowSearchProps } from "@/components/layout/flow-search";
import { FlowActionType } from "@/components/layout/use-flow-reducer";
import { UserDetails } from "@/components/shared/user";
import { ArrowBack, EstateVisaLogo } from "@/icons";
import { MAX_SCREEN_WIDTH } from "@/packages/constants/size";
import { APP, decryptUri, PAGES } from "@/packages/libraries";
import {
  ActionIcon,
  AppShell,
  Box,
  Burger,
  Divider,
  Flex,
  Stack,
  Title,
} from "@mantine/core";
import { getCookie } from "cookies-next";
import { usePathname, useRouter } from "next/navigation";

import clsx from "clsx";
import { Fragment, useEffect } from "react";

type AppShellHeaderProps = {
  title: string;
  backHref?: string;
  options?: JSX.Element;
  showLinks?: boolean;
  withSearch?: boolean;
} & (
  | {
      withSearch: true;
      searchProps: FlowSearchProps;
    }
  | {
      withSearch?: false;
      searchProps?: FlowSearchProps;
    }
);

export function AppShellHeader({
  title,
  backHref,
  ...props
}: AppShellHeaderProps) {
  const { options, showLinks = true, withSearch, searchProps } = props;
  const { back } = useRouter();
  const { openedNav } = useFlowState();

  const user: ProfileData = decryptUri(getCookie(APP.USER_DATA));
  const dispatch = useFlowDispatch();
  const pathname = usePathname();

  const toggle = () => {
    dispatch({ type: FlowActionType.TOGGLE_NAV, payload: !openedNav });
  };

  const heading = (
    <h1 className="text-lg sm:text-2xl text-primary-text-body font-bold pl-2 lg:pl-0">
      {title}
    </h1>
  );

  useEffect(() => {
    if (openedNav) {
      dispatch({ type: FlowActionType.TOGGLE_NAV, payload: false });
    }
  }, [pathname]);

  return (
    <Fragment>
      <AppShell.Section
        top={0}
        pos="sticky"
        component="header"
        style={{
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          zIndex: 120,
        }}
        className={clsx("border-l border-gray-2 bg-primary-background-white")}
      >
        <Stack
          maw={MAX_SCREEN_WIDTH}
          mx="auto"
          component="section"
          justify="space-between"
          flex={1}
          gap={0}
        >
          <Flex
            gap={36}
            align="center"
            justify="space-between"
            className="~px-1/8 py-2"
          >
            <Flex align="center" gap={6} hiddenFrom="lg">
              <Burger
                opened={openedNav}
                onClick={toggle}
                hiddenFrom="lg"
                size="sm"
              />
              <EstateVisaLogo height={45} width={45} />
              {user.estate && (
                <Title fw={500} c="purple.10" order={2}>
                  {user.estate.name} Estate
                </Title>
              )}
            </Flex>
            <Flex className="flex-1 gap-2 justify-end lg:justify-between items-center">
              {withSearch && (
                <Box hiddenFrom="lg" className="flex items-center">
                  <FlowSearch {...searchProps} />
                </Box>
              )}
              <Flex gap={12} align="center" className="lg:ml-auto">
                <UserDetails />
              </Flex>
            </Flex>
          </Flex>

          <Divider className="border-gray-2" />

          <Flex
            gap={20}
            py={16}
            align="center"
            justify="space-between"
            className={clsx("~px-1/8", { "hidden lg:flex": openedNav })}
          >
            <Flex gap={3} align="center">
              {pathname !== PAGES.DASHBOARD && (
                <ActionIcon
                  onClick={back}
                  size={32}
                  variant="app-shell"
                  __vars={{
                    "--ai-color": "var(--primary-text-body)",
                  }}
                >
                  <ArrowBack />
                </ActionIcon>
              )}
              {heading}
            </Flex>
            <Box className="hidden lg:block">{options}</Box>
          </Flex>
        </Stack>
      </AppShell.Section>
    </Fragment>
  );
}
