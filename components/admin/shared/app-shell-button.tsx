"use client";

import { PAGES } from "@/packages/libraries";
import { ActionIcon, NavLink, NavLinkProps } from "@mantine/core";
import { usePathname } from "next/navigation";

import Link, { LinkProps } from "next/link";

interface ButtonProps extends NavLinkProps, LinkProps {
  opened?: boolean;
}

export function AppShellButton({ opened, ...props }: ButtonProps) {
  const pathname = usePathname();

  const isActive = pathname === props.href;

  return opened ? (
    <NavLink
      active={isActive}
      variant='admin-app-shell'
      component={Link}
      {...props}
    />
  ) : (
    <ActionIcon variant='app-shell' data-active={isActive} size={48}>
      {props.leftSection}
    </ActionIcon>
  );
}
