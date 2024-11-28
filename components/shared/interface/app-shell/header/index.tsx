"use client";

import {
  ActionIcon,
  AppShell,
  Center,
  Divider,
  Flex,
  Indicator,
  Stack,
  Title,
} from "@mantine/core";
import { APP, decryptUri, PAGES } from "@/packages/libraries";
import { MAX_SCREEN_WIDTH } from "@/packages/constants/size";

import { ProfileData } from "@/builders/types/profile";

import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

import { ArrowBack, BellIcon, EstateVisaLogo } from "@/icons";
import { SearchEstate } from "@/components/shared/search-estate";
import { UserDetails } from "@/components/shared/user";
import { NavigationLinks } from "./links";

import clsx from "clsx";
import Link from "next/link";

interface AppShellHeaderProps {
  title: string;
  backHref?: string;
  options?: JSX.Element;
  showLinks?: boolean;
}

export function AppShellHeader({
  title,
  backHref,
  options,
  showLinks = true,
}: AppShellHeaderProps) {
  const { back } = useRouter();
  const user: ProfileData = decryptUri(getCookie(APP.USER_DATA));

  const heading = (
    <h1 className='text-lg sm:text-2xl text-primary-text-body font-bold'>
      {title}
    </h1>
  );

  return (
    <AppShell.Section
      top={0}
      pos='sticky'
      bg='white'
      component='header'
      className={clsx(
        "border-l border-primary-text-normal z-50",
        "bg-primary-background-white backdrop-blur-2xl"
      )}
      style={{
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Stack
        // maw={MAX_SCREEN_WIDTH}
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
          <Flex align='center' gap={6} hiddenFrom='lg'>
            <EstateVisaLogo height={45} width={45} />
            {user.estate && (
              <Title fw={500} c='purple.10' order={2}>
                {user.estate.name} Estate
              </Title>
            )}
          </Flex>

          <Flex className='flex-1 gap-2 justify-end lg:justify-between items-center'>
            {/* <SearchEstate /> */}
            <Flex gap={12} align='center' ml='auto'>
              {/* <Center
                h={36}
                w={36}
                bg='purple.4'
                className='rounded-full cursor-pointer'
                component={Link}
                href={PAGES.NOTIFICATIONS}
              >
                <Indicator processing color='red' size={10} withBorder>
                  <BellIcon width={18} />
                </Indicator>
              </Center> */}
              <UserDetails />
            </Flex>
          </Flex>
        </Flex>

        <Divider className='border-gray-2' />

        <Flex
          gap={20}
          py={16}
          align='center'
          justify='space-between'
          className={clsx("~px-1/8 hidden lg:flex", {
            "!flex": !showLinks,
          })}
        >
          <Flex gap={10} align='center'>
            {backHref && (
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
          {options}
        </Flex>
        {showLinks && <NavigationLinks />}
      </Stack>
    </AppShell.Section>
  );
}
