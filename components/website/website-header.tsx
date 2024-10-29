"use client";

import {
  Anchor,
  Box,
  Burger,
  Button,
  Divider,
  Flex,
  Popover,
  Stack,
} from "@mantine/core";

import Link from "next/link";
import { getCookie, hasCookie } from "cookies-next";
import { useLayoutEffect, useState } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";

import { MAX_SCREEN_WIDTH } from "@/packages/constants/size";
import { EstateVisaLogo } from "@/svgs/estate-visa-logo";
import { PAGES, TOKEN } from "@/packages/libraries";

import { TalkToUsButton } from "./talk-to-us/button";

const links = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Features",
    href: "/#features",
  },
  {
    title: "How It Works",
    href: "/#how-it-works",
  },
  {
    title: "Testimonial",
    href: "/#testimonial",
  },
];

export function NavList({ close }: { close?: () => void }) {
  return (
    <>
      {links.map((link, index) => (
        <Anchor
          key={index}
          href={link.href}
          variant='hover'
          className={clsx("text-primary-text-body py-2")}
          fz={18}
          fw={500}
          w='fit-content'
          onClick={close}
          component={Link}
        >
          {link.title}
        </Anchor>
      ))}
    </>
  );
}

export function WebsiteHeader() {
  const pathname = usePathname();
  const [opened, toggle] = useState(false);
  // const [isAdmin, setIsAdmin] = useState(false);

  const isAdmin = hasCookie(TOKEN.HEADER);

  // useLayoutEffect(() => {
  //   setIsAdmin(hasCookie(TOKEN.HEADER));
  // }, []);

  return (
    <Stack gap={0}>
      <Flex
        justify='space-between'
        align='center'
        className='lg:px-16 md:px-8 px-4'
      >
        <Flex
          w='100%'
          maw={MAX_SCREEN_WIDTH}
          component='header'
          gap={16}
          py={10}
          align='center'
          className='justify-between'
          mx='auto'
        >
          <Box component='figure'>
            <EstateVisaLogo width={62} height={62} />
          </Box>
          <Flex
            gap={32}
            align='center'
            visibleFrom='lg'
            style={{
              justifySelf: "center",
            }}
          >
            <NavList />
          </Flex>
          <Flex
            gap={12}
            style={{
              justifySelf: "end",
            }}
          >
            <Button
              href={isAdmin ? PAGES.DASHBOARD : PAGES.LOGIN}
              variant='outline'
              component={Link}
              // className={clsx({ "skeleton border-none miw-36": !isAdmin })}
            >
              {isAdmin ? "Go to dashboard" : "Login"}
            </Button>

            {pathname === PAGES.TALK_TO_US ? null : <TalkToUsButton />}
          </Flex>

          <Popover
            radius='md'
            trapFocus={false}
            transitionProps={{
              transition: "pop-top-right",
            }}
            opened={opened}
            onChange={toggle}
            classNames={{
              dropdown: "bg-white/70 mt-2",
            }}
            styles={{
              dropdown: {
                backdropFilter: "blur(5px)",
                WebkitBackdropFilter: "blur(5px)",
              },
            }}
            position='bottom-end'
            withArrow={false}
          >
            <Popover.Target>
              <Burger
                hiddenFrom='lg'
                opened={opened}
                onClick={() => toggle(!opened)}
                aria-label='Toggle navigation'
                transitionDuration={500}
                className='relative'
                size='md'
              />
            </Popover.Target>

            <Popover.Dropdown
              className='border rounded-lg shadow-2xl border-primary-border-light '
              miw={300}
            >
              <Stack gap={12} py={16} px={20}>
                <NavList close={() => toggle(!opened)} />
              </Stack>
            </Popover.Dropdown>
          </Popover>
        </Flex>
      </Flex>
      <Divider />
    </Stack>
  );
}
