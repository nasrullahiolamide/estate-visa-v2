import clsx from "clsx";
import Link from "next/link";

import { useMemo } from "react";
import { toString } from "lodash";
import { getCookie } from "cookies-next";
import { User, LogoutCurve } from "iconsax-react";
import { useSuspenseQuery } from "@tanstack/react-query";

import { modals } from "@mantine/modals";
import { Avatar, Flex, Menu, Stack } from "@mantine/core";

import { builder } from "@/builders";
import { formatUserType, useFakeUserData } from "@/builders/types/login";
import { APP, makePath, MODALS, PAGES } from "@/packages/libraries";

import { ArrowDownIcon } from "@/icons";
import { ConfirmLogout } from "./interface/modals/logout";

function handleLogout() {
  modals.open({
    children: <ConfirmLogout />,
    withCloseButton: false,
    modalId: MODALS.CONFIRMATION,
  });
}

export function UserDetails() {
  const userId = toString(getCookie(APP.USER_ID));
  const initialUser = useFakeUserData();

  const { data: user, isLoading } = useSuspenseQuery({
    queryKey: builder.account.profile.get.get(userId),
    queryFn: () => builder.use().account.profile.get(userId),
    select: (data) => data,
    // placeholderData: initialUser,
  });

  const userDetails = useMemo(() => {
    return {
      fullname: `${user?.firstname} ${user?.lastname ?? ""}`,
      userType: formatUserType[user?.roles[0].name ?? ""],
      ...user,
    };
  }, [user]);

  return (
    <Menu
      shadow='md'
      position='bottom-end'
      styles={{
        item: {
          padding: "14px",
          borderRadius: 0,
        },
        dropdown: {
          padding: 0,
        },
      }}
      disabled={isLoading}
    >
      <Menu.Target>
        <Flex align='center' gap={8} className='cursor-pointer'>
          <Avatar
            src={userDetails?.picture}
            alt={userDetails.fullname}
            size={35}
            className={clsx({ skeleton: isLoading })}
          />

          <Flex gap={12} className={clsx("hidden sm:flex")} align='center'>
            <Stack gap={1} className={clsx({ skeleton: isLoading })}>
              <p className={clsx("prose-sm/medium")}>{userDetails.fullname}</p>
              <p className={clsx("text-xs")}>{userDetails.userType}</p>
            </Stack>

            <ArrowDownIcon className='cursor-pointer' />
          </Flex>
        </Flex>
      </Menu.Target>

      <Menu.Dropdown
        miw={230}
        className='shadow-lg overflow-hidden'
        variant='action'
      >
        <Menu.Item
          classNames={{
            item: "hover:bg-transparent cursor-auto",
          }}
        >
          <Flex align='center' gap={8}>
            <Avatar
              src={userDetails?.picture}
              alt={userDetails.fullname}
              size={40}
            />
            <Stack gap={1}>
              <p className='text-primary-text-body prose-sm/medium'>
                {userDetails.fullname}
              </p>
              <p className='text-xs'>{userDetails?.email}</p>
            </Stack>
          </Flex>
        </Menu.Item>
        <Menu.Divider />

        <Menu.Item
          leftSection={<User size={18} />}
          component={Link}
          href={makePath(PAGES.DASHBOARD, PAGES.PROFILE)}
        >
          My Profile
        </Menu.Item>
        <Menu.Item
          bg='purple.4'
          color='red'
          leftSection={<LogoutCurve size={18} />}
          onClick={handleLogout}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
