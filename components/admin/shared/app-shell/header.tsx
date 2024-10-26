"use client";

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
import { ArrowBack, BellIcon, EstateVisaLogo } from "@/svgs";

import { SearchEstate } from "../search-estate";
import { AdminUser } from "../user-admin";
import { Links } from "./header/links";
import Link from "next/link";
import { ArrowLeft } from "iconsax-react";

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
  const Heading = () => (
    <Flex
      gap={15}
      align='center'
      justify='space-between'
      className='~px-1/8 hidden lg:flex'
      py={18}
    >
      <h1 className='text-2xl text-primary-text-body font-bold'>{title}</h1>
      {options}
    </Flex>
  );

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
          className='~px-1/8 py-2 md:py-5'
        >
          <Center hiddenFrom='lg'>
            <EstateVisaLogo height={50} width={50} />
          </Center>

          <Flex className='flex-1 gap-2 justify-end sm:justify-between '>
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
              <AdminUser />
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
