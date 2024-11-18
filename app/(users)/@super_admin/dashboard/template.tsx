"use client";

import { APP } from "@/packages/libraries";
import { AppShell, Center, Flex, ScrollArea, Stack } from "@mantine/core";
import { getCookie } from "cookies-next";
import { boolean } from "mathjs";

import { AppShellButton } from "@/components/shared/interface/app-shell/button";
import { SUPER_ADMIN_ROUTES } from "@/packages/constants/routes";
import { EstateVisaLogo } from "@/icons";

type TemplateProps = React.PropsWithChildren<{}>;

export default function Template({ children }: TemplateProps) {
  const collapsedNav = getCookie(APP.EXPANDED_NAVBAR);
  const opened = boolean(collapsedNav ?? true);

  return (
    <AppShell
      bg='accent.12'
      navbar={{
        width: opened ? 280 : 95,
        breakpoint: "lg",
        collapsed: { mobile: true },
      }}
      styles={{
        navbar: {
          zIndex: "100 !important",
        },
      }}
    >
      <AppShell.Navbar
        style={{
          alignItems: opened ? "unset" : "center",
        }}
        px={opened ? 0 : 12}
        py={32}
        withBorder={false}
      >
        <AppShell.Section>
          <Center>
            <EstateVisaLogo height={120} width={120} />
          </Center>
        </AppShell.Section>

        <AppShell.Section
          grow
          component={ScrollArea}
          className='scrollbar-none pt-8'
        >
          <Stack gap={12}>
            {SUPER_ADMIN_ROUTES.map((link, index) => (
              <AppShellButton
                key={index}
                leftSection={<link.icon />}
                href={link.href}
                label={link.title}
                opened={opened}
              />
            ))}
          </Stack>
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main component={Flex} h='100dvh' className='overflow-auto'>
        <Stack gap={0} flex={1} className='bg-primary-background-dark'>
          {children}
        </Stack>
      </AppShell.Main>
    </AppShell>
  );
}
