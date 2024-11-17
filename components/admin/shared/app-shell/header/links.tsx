"use client";

import Link from "next/link";
import { toString } from "lodash";
import { SVGProps, useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { getAuthorizedUser } from "@/packages/actions";
import { PAGES, USER_TYPE } from "@/packages/libraries";
import { Box, Flex, NavLink } from "@mantine/core";
import {
  ADMIN_ROUTES,
  GATEMAN_ROUTES,
  OCCUPANT_ROUTES,
  PROPERTY_OWNER_ROUTES,
  SUB_OCCUPANT_ROUTES,
  SUPER_ADMIN_ROUTES,
} from "@/packages/constants/routes";

export type NavLinkType = Array<{
  title: string;
  href: string;
  icon: ({ ...props }: SVGProps<SVGSVGElement>) => JSX.Element;
}>;

export function Links() {
  const [links, setLinks] = useState<NavLinkType>([]);
  const activeLinkRef = useRef<HTMLAnchorElement | null>(null);
  const pathname = usePathname();

  const view: Record<PropertyKey, NavLinkType> = {
    [USER_TYPE.ADMIN]: ADMIN_ROUTES,
    [USER_TYPE.SUPER_ADMIN]: SUPER_ADMIN_ROUTES,
    [USER_TYPE.OCCUPANT]: OCCUPANT_ROUTES,
    [USER_TYPE.PROPERTY_OWNER]: PROPERTY_OWNER_ROUTES,
    [USER_TYPE.SUB_OCCUPANT]: SUB_OCCUPANT_ROUTES,
    [USER_TYPE.GATEMAN]: GATEMAN_ROUTES,
  };

  useEffect(() => {
    (async () => {
      const { userType } = await getAuthorizedUser();
      setLinks(view[userType]);
    })();
  }, []);

  useEffect(() => {
    if (activeLinkRef.current) {
      activeLinkRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
    console.log(activeLinkRef.current);
  }, [pathname]);

  return (
    <Flex
      align='center'
      justify='space-between'
      gap={20}
      className='lg:~px-1/8 overflow-x-auto scrollbar-none'
      hiddenFrom='lg'
    >
      {links?.map((item, index) => {
        const isActive =
          item.href === PAGES.DASHBOARD
            ? pathname === PAGES.DASHBOARD
            : pathname.startsWith(toString(item.href));

        return (
          <NavLink
            key={index}
            ref={isActive ? activeLinkRef : null}
            active={isActive}
            variant='admin-app-shell-mobile'
            component={Link}
            href={item.href}
            flex={1}
            label={
              <Flex gap={10} align='center' justify='center' py={8}>
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
