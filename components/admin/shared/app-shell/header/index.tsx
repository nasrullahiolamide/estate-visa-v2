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
} from "@mantine/core";
import { MAX_SCREEN_WIDTH } from "@/packages/constants/size";
import { ArrowBack, BellIcon, EstateVisaLogo } from "@/icons";

import { SearchEstate } from "../../search-estate";
import { UserDetails } from "../../user";
import { Links } from "./links";

interface AppShellHeaderProps {
  title: string;
  backHref?: string;
  options?: JSX.Element;
}

export function AppShellHeader({
  title,
  backHref,
  options,
}: AppShellHeaderProps) {
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
          className='~px-1/8 py-3'
        >
          <Center hiddenFrom='lg'>
            <EstateVisaLogo height={55} width={55} />
          </Center>

          <Flex className='flex-1 gap-2 justify-end sm:justify-between items-center '>
            <SearchEstate />
            <Flex gap={15} align='center'>
              <Center
                bg='purple.4'
                h={45}
                w={45}
                className='rounded-full cursor-pointer'
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
          className='~px-1/8 hidden lg:flex'
          py={18}
          mih={78}
        >
          <Flex gap={10} align='start'>
            {backHref && (
              <ActionIcon
                component={Link}
                href={backHref}
                size={32}
                variant='app-shell'
                __vars={{
                  "--ai-color": "var(--primary-text-body)",
                }}
              >
                <ArrowBack />
              </ActionIcon>
            )}

            <h1 className='text-2xl text-primary-text-body font-bold'>
              {title}
            </h1>
          </Flex>
          {!backHref && options}
        </Flex>
        <Links />
      </Stack>
    </AppShell.Section>
  );
}
