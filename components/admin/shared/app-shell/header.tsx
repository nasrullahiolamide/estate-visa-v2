"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AppShell,
  Center,
  Divider,
  Flex,
  Indicator,
  NavLink,
  Stack,
} from "@mantine/core";

import { SearchEstate } from "../search-estate";
import { AdminUser } from "../user-admin";
import { adminLinks, NavLinkType, superAdminLinks } from "../data/navlinks";
import { BellIcon, EstateVisaLogo } from "@/svgs";
import { MAX_SCREEN_WIDTH } from "@/packages/constants/size";
import { USER_TYPE } from "@/packages/libraries";
import { getUserType } from "@/packages/actions";
import { usePathname } from "next/navigation";

interface AppShellHeaderProps {
  title: string;
  backHref?: string;
  options?: JSX.Element;
}

export function AppShellHeader({ title, options }: AppShellHeaderProps) {
  const [links, setLinks] = useState<NavLinkType>([]);

  useEffect(() => {
    (async () => {
      const userType = await getUserType();
      setLinks(view[userType]);
    })();
  }, []);

  const pathname = usePathname();

  const view: Record<PropertyKey, NavLinkType> = {
    [USER_TYPE.ADMIN]: adminLinks,
    [USER_TYPE.SUPER_ADMIN]: superAdminLinks,
  };

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

          <Flex
            flex={1}
            justify={{
              base: "flex-end",
              sm: "space-between",
            }}
            gap={5}
          >
            <SearchEstate />
            <Flex gap={15} align='center'>
              <Center
                bg='purple.4'
                h={45}
                w={45}
                className='rounded-full cursor-pointer'
              >
                <Indicator processing color='red' size={11} withBorder>
                  <BellIcon width={22} />
                </Indicator>
              </Center>
              <AdminUser />
            </Flex>
          </Flex>
        </Flex>

        <Divider className='border-gray-2' />

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

        <Flex
          align='center'
          justify='space-between'
          gap={12}
          className='lg:~px-1/8 overflow-scroll scrollbar-none'
          hiddenFrom='lg'
        >
          {links?.map((item, index) => {
            const isActive = item.href === pathname;
            return (
              <NavLink
                key={index}
                flex={1}
                active={isActive}
                variant='admin-app-shell-mobile'
                component={Link}
                href={item.href}
                label={item.title}
                leftSection={<item.icon />}
              />
            );
          })}
        </Flex>
      </Stack>
    </AppShell.Section>
  );
}
