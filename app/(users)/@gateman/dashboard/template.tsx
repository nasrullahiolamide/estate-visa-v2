"use client";

import { getCookie } from "cookies-next";
import { boolean } from "mathjs";
import {
  AppShell,
  Center,
  Divider,
  Flex,
  ScrollArea,
  Stack,
  Title,
} from "@mantine/core";

import { AppShellButton } from "@/components/shared/interface/app-shell/button";
import { APP, decryptUri } from "@/packages/libraries";
import { GATEMAN_ROUTES } from "@/packages/constants/routes";
import { EstateVisaLogo } from "@/icons";
import { ProfileData } from "@/builders/types/profile";

type TemplateProps = React.PropsWithChildren<{}>;

export default function Template({ children }: TemplateProps) {
  const user: ProfileData = decryptUri(getCookie(APP.USER_DATA));
  const collapsedNav = getCookie(APP.EXPANDED_NAVBAR);
  const opened = boolean(collapsedNav ?? true);

  return (
    <AppShell
      bg='accent.12'
      navbar={{
        width: opened ? 240 : 95,
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
        withBorder={false}
        py={28}
        px={opened ? 0 : 12}
        style={{
          alignItems: opened ? "unset" : "center",
        }}
      >
        <AppShell.Section>
          <Center>
            <EstateVisaLogo height={80} width={80} />
          </Center>

          {user.estate && (
            <Title mt={10} ta='center' fw={700} c='purple.9'>
              {user.estate.name} Estate
            </Title>
          )}
        </AppShell.Section>
        <Divider mt={24} />

        <AppShell.Section
          grow
          component={ScrollArea}
          className='scrollbar-none ~pt-2/14'
        >
          <Stack gap={8}>
            {GATEMAN_ROUTES.map((link, index) => (
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
        <Stack gap={0} flex={1} className='bg-primary-text-normal'>
          {children}
        </Stack>
      </AppShell.Main>
    </AppShell>
  );
}
