import clsx from "clsx";
import Link from "next/link";

import { getCookie } from "cookies-next";
import { User, LogoutCurve } from "iconsax-react";
import { Avatar, Flex, Menu, Stack } from "@mantine/core";
import { modals } from "@mantine/modals";

import { APP, decryptUri, makePath, MODALS, PAGES } from "@/packages/libraries";
import { formatUserType } from "@/builders/types/login";
import { ArrowDownIcon } from "@/icons";
import { ConfirmLogout } from "./modals/logout";
import { ProfileData } from "@/builders/types/profile";

function handleLogout() {
  modals.open({
    children: <ConfirmLogout />,
    withCloseButton: false,
    modalId: MODALS.CONFIRMATION,
  });
}

export function UserDetails() {
  const user: ProfileData = decryptUri(getCookie(APP.USER_DATA));

  const userDetails = {
    fullName: `${user?.firstname} ${user?.lastname}`,
    userType: formatUserType[user?.roles[0].name],
    ...user,
  };

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
    >
      <Menu.Target>
        <Flex align='center' gap={8} className='cursor-pointer'>
          <Avatar src={null} alt={userDetails.firstname} size={45} />

          <Flex gap={12} className={clsx("hidden sm:flex")} align='center'>
            <Stack gap={1}>
              <p className='text-primary-text-body font-medium text-sm'>
                {userDetails.firstname}
              </p>
              <p className='text-xs'>{userDetails.userType}</p>
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
              alt={userDetails.firstname}
              size={40}
            />
            <Stack gap={1}>
              <p className='text-primary-text-body font-medium'>
                {userDetails.firstname}
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
