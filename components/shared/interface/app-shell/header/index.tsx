"use client";

import Link from "next/link";
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
import { MAX_SCREEN_WIDTH } from "@/packages/constants/size";
import { ArrowBack, BellIcon, EstateVisaLogo } from "@/icons";

import { SearchEstate } from "../../../search-estate";
import { UserDetails } from "../../../user";
import { Links } from "./links";
import clsx from "clsx";
import { APP, decryptUri, PAGES } from "@/packages/libraries";
import { ProfileData } from "@/builders/types/profile";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

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
  const user: ProfileData = decryptUri(getCookie(APP.USER_DATA));
  const { back } = useRouter();

  return (
    <AppShell.Section
      pos='sticky'
      top={0}
      component='header'
      bg='white'
      className='z-50 border-l border-gray-2'
      style={{
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      }}
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
          <Flex align='center' gap={6} hiddenFrom='lg'>
            <Center hiddenFrom='lg'>
              <EstateVisaLogo height={58} width={58} />
            </Center>

            {user.estate && (
              <Title fw={700} c='purple.10' order={2}>
                {user.estate.name} Estate
              </Title>
            )}
          </Flex>

          <Flex className='flex-1 gap-2 justify-end sm:justify-between items-center '>
            <SearchEstate />
            <Flex gap={15} align='center'>
              <Center
                bg='purple.4'
                h={45}
                w={45}
                className='rounded-full cursor-pointer'
                component={Link}
                href={PAGES.NOTIFICATIONS}
              >
                <Indicator processing color='red' size={10} withBorder>
                  <BellIcon width={22} />
                </Indicator>
              </Center>
              <UserDetails />
            </Flex>
          </Flex>
        </Flex>

        <Divider className='border-gray-2' />

        <Flex
          gap={20}
          align='center'
          justify='space-between'
          className={clsx("~px-1/8 hidden lg:flex", {
            "!flex": !showLinks,
          })}
          py={18}
          mih={78}
        >
          <Flex gap={10} align='center'>
            {backHref && (
              <ActionIcon
                // component={Link}
                // href={backHref}
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
            <h1 className='text-lg sm:text-2xl text-primary-text-body font-bold'>
              {title}
            </h1>
          </Flex>
          {options}
        </Flex>
        {showLinks && <Links />}
      </Stack>
    </AppShell.Section>
  );
}
