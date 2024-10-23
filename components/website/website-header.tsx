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
import { useDisclosure } from "@mantine/hooks";

import { MAX_SCREEN_WIDTH } from "@/packages/constants/size";
import { EstateVisaLogo } from "@/svgs/estate-visa-logo";

import { PAGES } from "@/packages/libraries";

import Link from "next/link";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Features",
    href: "#features",
  },
  {
    title: "How It Works",
    href: "#how-it-works",
  },
  {
    title: "Testimonial",
    href: "#testimonial",
  },
];

export function NavList({ close }: { close?: () => void }) {
  const pathname = usePathname();
  return (
    <>
      {links.map((link, index) => (
        <Anchor
          key={index}
          href={link.href}
          variant='hover'
          className={clsx(
            "text-primary-text-body py-2"
            // pathname.includes(link.href) && "text-blue-8"
          )}
          fz={18}
          fw={500}
          w='fit-content'
          onClick={close}
        >
          {link.title}
        </Anchor>
      ))}
    </>
  );
}

export function WebsiteHeader() {
  const [opened, { toggle, close }] = useDisclosure();

  useEffect(() => {
    const handleScroll = () => opened && close();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Stack gap={0}>
      <Flex justify='space-between' className='lg:px-16 md:px-8 px-4'>
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
            <EstateVisaLogo width={72} height={72} />
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
            <Link href={PAGES.LOGIN}>
              <Button variant='outline'>Log in</Button>
            </Link>
            <Button variant='primary' className='hidden sm:block'>
              Talk to us
            </Button>
          </Flex>

          <Popover
            radius='md'
            trapFocus={false}
            transitionProps={{
              transition: "pop-top-right",
            }}
            opened={opened}
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
                onClick={toggle}
                aria-label='Toggle navigation'
                transitionDuration={500}
                className='relative'
              />
            </Popover.Target>

            <Popover.Dropdown
              className='border rounded-lg shadow-2xl border-primary-border-light '
              miw={300}
            >
              <Stack gap={12} py={16} px={20}>
                <NavList close={close} />
              </Stack>
            </Popover.Dropdown>
          </Popover>
        </Flex>
      </Flex>
      <Divider />
    </Stack>
  );
}
