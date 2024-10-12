import { MODALS, PAGES } from "@/packages/libraries";
import { modals } from "@mantine/modals";
import { navigate } from "@/packages/actions";
import { Avatar, Flex, Menu, Stack } from "@mantine/core";

import { ArrowDown01Icon } from "hugeicons-react";
import { User, Setting2, LogoutCurve } from "iconsax-react";

import { ConfirmLogout } from "../modal/confirm-logout";

export function AdminUser() {
  function handleLogout() {
    modals.open({
      children: <ConfirmLogout />,
      withCloseButton: false,
      modalId: MODALS.CONFIRM_LOGOUT,
    });
  }
  return (
    <Menu
      shadow='md'
      width={200}
      position='bottom-end'
      styles={{
        item: {
          padding: "8px 16px",
        },
      }}
    >
      <Menu.Target>
        <Flex align='center' gap={8}>
          <Avatar
            size={50}
            src='/images/avatar.png'
            alt='Mide Martins'
            radius='xl'
          />

          <Flex gap={12} className='hidden sm:flex' align='center'>
            <Stack gap={1}>
              <p className='text-primary-text-body font-medium'>Mide Martins</p>
              <p className='text-xs'>Estate Owner</p>
            </Stack>

            <ArrowDown01Icon className='cursor-pointer' />
          </Flex>
        </Flex>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Account</Menu.Label>
        <Menu.Item
          leftSection={<User size={18} />}
          onClick={() => navigate(PAGES.PROFILE)}
        >
          My Profile
        </Menu.Item>
        <Menu.Item leftSection={<Setting2 size={18} />}>Settings</Menu.Item>
        <Menu.Divider />
        <Menu.Item
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
