"use client";

import { ProfileData } from "@/builders/types/profile";
import { FlowSearch, FlowSearchProps } from "@/components/layout/flow-search";
import { UserDetails } from "@/components/shared/user";
import { ArrowBack } from "@/icons";
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
import { Fragment } from "react";

import { useFlowNavigation } from "@/components/layout/flow-context";
import clsx from "clsx";

type AppShellHeaderProps = {
  title: string;
  backHref?: string;
  options?: JSX.Element;
  showLinks?: boolean;
  withSearch?: boolean;
  root?: boolean;
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
  const { isNavOpened, toggleNav } = useFlowNavigation();

  const user: ProfileData = decryptUri(getCookie(APP.USER_DATA));
  const pathname = usePathname();

  const heading = (
    <h1 className='text-lg sm:text-2xl text-primary-text-body font-medium pl-2 lg:pl-0'>
      {title}
    </h1>
  );

  return (
    <Fragment>
      <AppShell.Section
        top={0}
        pos='sticky'
        component='header'
        style={{
          zIndex: isNavOpened ? 240 : 120,
        }}
        className={clsx("border-l border-gray-2", {
          "bg-primary-background-white": !isNavOpened,
        })}
      >
        <Stack
          maw={MAX_SCREEN_WIDTH}
          mx='auto'
          component='section'
          justify='space-between'
          flex={1}
          gap={0}
        >
          <Flex
            gap={36}
            align='center'
            justify='space-between'
            className='~px-1/8 py-2'
          >
            <Flex align='center' gap={12} hiddenFrom='lg'>
              <Burger
                opened={isNavOpened}
                onClick={toggleNav}
                hiddenFrom='lg'
                size='sm'
              />
              <Flex gap={6} align='center'>
                <img
                  src='/images/estate-visa-logo.png'
                  alt='estate-visa-logo'
                  height={45}
                  width={45}
                  className={clsx({
                    "hidden lg:block": isNavOpened,
                  })}
                />
                {user.estate && (
                  <Title fw={500} c='purple.10' order={2} hidden={isNavOpened}>
                    {user.estate.name} Estate
                  </Title>
                )}
              </Flex>
            </Flex>

            <Flex className='flex-1 gap-2 justify-end lg:justify-between items-center'>
              {withSearch && (
                <Box hiddenFrom='lg' className='flex items-center'>
                  <FlowSearch {...searchProps} />
                </Box>
              )}
              <Flex
                gap={12}
                align='center'
                className='lg:ml-auto'
                hidden={isNavOpened}
              >
                <UserDetails />
              </Flex>
            </Flex>
          </Flex>

          <Divider className='border-gray-2' hidden={isNavOpened} />

          <Flex
            gap={20}
            py={16}
            align='center'
            justify='space-between'
            className={clsx("~px-1/8", { "hidden lg:flex": isNavOpened })}
          >
            <Flex gap={3} align='center'>
              {pathname !== PAGES.DASHBOARD && (
                <ActionIcon
                  onClick={back}
                  size={32}
                  variant='app-shell'
                  __vars={{
                    "--ai-color": "var(--primary-text-body)",
                  }}
                >
                  <ArrowBack />
                </ActionIcon>
              )}
              {heading}
            </Flex>
            <Box className='hidden lg:block'>{options}</Box>
          </Flex>
          <Divider className='border-gray-2' hidden={isNavOpened} />
        </Stack>
      </AppShell.Section>
    </Fragment>
  );
}
