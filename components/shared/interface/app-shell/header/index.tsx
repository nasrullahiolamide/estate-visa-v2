"use client";

import { ProfileData } from "@/builders/types/profile";
import { FlowSearch, useFlowState } from "@/components/layout";
import { useFlowDispatch } from "@/components/layout/flow-context";
import { FlowSearchProps } from "@/components/layout/flow-search";
import { FlowActionType } from "@/components/layout/use-flow-reducer";
import { UserDetails } from "@/components/shared/user";
import { ArrowBack, EstateVisaLogo } from "@/icons";
import { MAX_SCREEN_WIDTH } from "@/packages/constants/size";
import { APP, decryptUri } from "@/packages/libraries";
import {
  ActionIcon,
  AppShell,
  Box,
  Divider,
  Flex,
  Stack,
  Title,
} from "@mantine/core";
import clsx from "clsx";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { NavigationLinks } from "./links";

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
  const user: ProfileData = decryptUri(getCookie(APP.USER_DATA));
  const { options, showLinks = true, withSearch, searchProps } = props;

  const { back } = useRouter();
  const { openedNav } = useFlowState();
  const dispatch = useFlowDispatch();

  const toggle = () => {
    dispatch({ type: FlowActionType.TOGGLE_NAV, payload: !openedNav });
  };

  const heading = (
    <h1 className="text-lg sm:text-2xl text-primary-text-body font-bold">
      {title}
    </h1>
  );

  return (
    <AppShell.Section
      top={0}
      pos="sticky"
      bg="white"
      component="header"
      style={{
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      }}
      className={clsx(
        "border-l border-primary-text-normal z-50",
        "bg-primary-background-white backdrop-blur-2xl",
      )}
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
          {/* <Burger
            opened={openedNav}
            onClick={toggle}
            hiddenFrom='sm'
            size='sm'
          /> */}
          <Flex align="center" gap={6} hiddenFrom="lg">
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
          className={clsx("~px-1/8 hidden lg:flex", {
            "!flex": !showLinks,
          })}
        >
          <Flex gap={10} align="center">
            {backHref && (
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
          {options}
        </Flex>
        {showLinks && <NavigationLinks />}
      </Stack>
    </AppShell.Section>
  );
}
