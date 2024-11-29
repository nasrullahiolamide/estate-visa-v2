"use client";

import Link from "next/link";
import clsx from "clsx";
import { toString } from "lodash";
import { builder } from "@/builders";
import { getCookie } from "cookies-next";
import { useQuery } from "@tanstack/react-query";
import { SVGProps, useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { Box, Flex, NavLink } from "@mantine/core";
import {
  ADMIN_ROUTES,
  GATEMAN_ROUTES,
  OCCUPANT_ROUTES,
  PROPERTY_OWNER_ROUTES,
  SUB_OCCUPANT_ROUTES,
  SUPER_ADMIN_ROUTES,
  SUB_ADMIN_ROUTES,
} from "@/packages/constants/routes";
import { getFeatureFlag } from "@/packages/libraries/auth";
import { APP, makePath, PAGES, USER_TYPE } from "@/packages/libraries";

const view: Record<PropertyKey, NavLinkType> = {
  [USER_TYPE.ADMIN]: ADMIN_ROUTES,
  [USER_TYPE.SUB_ADMIN]: SUB_ADMIN_ROUTES,
  [USER_TYPE.SUPER_ADMIN]: SUPER_ADMIN_ROUTES,
  [USER_TYPE.OCCUPANT]: OCCUPANT_ROUTES,
  [USER_TYPE.PROPERTY_OWNER]: PROPERTY_OWNER_ROUTES,
  [USER_TYPE.SUB_OCCUPANT]: SUB_OCCUPANT_ROUTES,
  [USER_TYPE.GATEMAN]: GATEMAN_ROUTES,
};

export type NavLinkType = Array<{
  title: string;
  href: string;
  icon: ({ ...props }: SVGProps<SVGSVGElement>) => JSX.Element;
}>;

export function NavigationLinks() {
  const userId = toString(getCookie(APP.USER_ID));
  const flags = getFeatureFlag();

  const [links, setLinks] = useState<NavLinkType>([]);
  const activeLinkRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const pathname = usePathname();

  const { data: user, isLoading } = useQuery({
    queryKey: builder.account.profile.get.get(userId),
    queryFn: () => builder.use().account.profile.get(userId),
    select: (data) => data,
    enabled: !!userId,
  });

  useEffect(() => {
    if (user) {
      const userType = user.roles[0].name;
      setLinks(view[userType]);
    }
  }, [user, isLoading]);

  useEffect(() => {
    const activeIndex = links.findIndex((item) =>
      item.href === PAGES.DASHBOARD
        ? pathname === PAGES.DASHBOARD
        : pathname.startsWith(toString(item.href))
    );

    if (activeIndex !== -1 && activeLinkRefs.current[activeIndex]) {
      activeLinkRefs.current[activeIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [pathname, links]);

  return (
    <Flex
      align='center'
      justify='space-between'
      gap={20}
      className={clsx("lg:~px-1/8 overflow-x-auto scrollbar-none", {
        skeleton: isLoading,
      })}
      hiddenFrom='lg'
    >
      {links.map((item, index) => {
        const isActive =
          item.href === PAGES.DASHBOARD
            ? pathname === PAGES.DASHBOARD
            : pathname.startsWith(toString(item.href));

        if (flags.some((flag) => makePath(PAGES.DASHBOARD, flag) === item.href))
          return null;

        return (
          <NavLink
            key={index}
            ref={(el) => {
              activeLinkRefs.current[index] = el;
            }}
            active={isActive}
            variant='admin-app-shell-mobile'
            component={Link}
            href={item.href}
            flex={1}
            label={
              <Flex gap={5} align='center' justify='center'>
                <item.icon width={20} />
                <Box>{item.title}</Box>
              </Flex>
            }
          />
        );
      })}
    </Flex>
  );
}
