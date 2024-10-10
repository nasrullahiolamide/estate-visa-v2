"use client";

import {
  AppShell,
  Center,
  Divider,
  Flex,
  NavLink,
  Stack,
  Box,
} from "@mantine/core";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Trail } from "./bread-crumbs";
import { SearchEstate } from "./search-estate";
import { AdminUser } from "./user-admin";
import { adminLinks, superAdminLinks } from "./navlinks";

import { MAX_SCREEN_WIDTH } from "@/packages/constants/size";
import { USER_TYPE } from "@/packages/libraries";
import { EstateVisaLogo } from "@/svgs";

interface AppShellHeaderProps {
  title: string;
  backHref?: string;
  trail?: Trail[];
}

export function AppShellHeader({ title, backHref }: AppShellHeaderProps) {
  const user = USER_TYPE.ADMIN;
  const pathname = usePathname();

  const navLinks =
    user === USER_TYPE.ADMIN
      ? adminLinks
      : user === USER_TYPE.SUPER_ADMIN
      ? superAdminLinks
      : [];

  const heading = (
    <div className='~px-1/8 hidden lg:block py-[18px]'>
      <h1 className='text-3xl text-primary-text-body font-bold'>{title}</h1>
    </div>
  );

  return (
    <AppShell.Section
      pos='sticky'
      top={0}
      component='header'
      bg='white'
      className='z-50 border-l border-gray-2'
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
          py={18}
          align='center'
          justify='space-between'
          className='~px-1/8'
        >
          <Center hiddenFrom='lg'>
            <EstateVisaLogo height={65} width={65} />
          </Center>

          <Flex
            flex={1}
            justify={{
              base: "flex-end",
              sm: "space-between",
            }}
            gap={10}
          >
            <SearchEstate />
            <AdminUser />
          </Flex>
        </Flex>

        <Divider className='border-gray-2' />

        {heading}

        <Flex
          align='center'
          className='~px-1/8 overflow-scroll scrollbar-none'
          hiddenFrom='lg'
        >
          {navLinks.map((item, index) => {
            const isActive = item.href === pathname;

            return (
              <NavLink
                key={index}
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

//  {
//    backHref && (
//      <ActionIcon
//        left={-35}
//        pos='absolute'
//        component={Link}
//        href={backHref}
//        size={32}
//        variant='app-shell'
//        __vars={{
//          "--ai-color": "var(--primary-text-body)",
//        }}
//      >
//        <ArrowLeft size='20' />
//      </ActionIcon>
//    );
//  }
