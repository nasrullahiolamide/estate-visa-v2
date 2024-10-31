"use client";

import Link from "next/link";
import { toString } from "lodash";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getAuthorizedUser } from "@/packages/actions";
import { PAGES, USER_TYPE } from "@/packages/libraries";
import { Box, Flex, NavLink } from "@mantine/core";
import { NavLinkType } from "../../data/navlinks";
import { ADMIN_ROUTES, SUPER_ADMIN_ROUTES } from "@/packages/constants/routes";

export function Links() {
  const [links, setLinks] = useState<NavLinkType>([]);

  useEffect(() => {
    (async () => {
      const { userType } = await getAuthorizedUser();
      setLinks(view[userType]);
    })();
  }, []);

  const pathname = usePathname();

  const view: Record<PropertyKey, NavLinkType> = {
    [USER_TYPE.ADMIN]: ADMIN_ROUTES,
    [USER_TYPE.SUPER_ADMIN]: SUPER_ADMIN_ROUTES,
  };

  return (
    <Flex
      align='center'
      justify='space-between'
      gap={20}
      className='lg:~px-1/8 overflow-scroll scrollbar-none'
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
            flex={1}
            active={isActive}
            variant='admin-app-shell-mobile'
            component={Link}
            href={item.href}
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
