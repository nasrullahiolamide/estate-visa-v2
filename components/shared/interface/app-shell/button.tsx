"use client";

import { PAGES } from "@/packages/libraries";
import { ActionIcon, NavLink, NavLinkProps } from "@mantine/core";
import { toString } from "lodash";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

interface ButtonProps extends NavLinkProps, LinkProps {
  opened?: boolean;
  id?: string;
}

export function AppShellButton({ opened, ...props }: ButtonProps) {
  const pathname = usePathname();

  const isActive =
    props.href === PAGES.DASHBOARD
      ? pathname === PAGES.DASHBOARD
      : pathname.startsWith(toString(props.href));

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
