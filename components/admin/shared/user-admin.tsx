import { MODALS, PAGES } from "@/packages/libraries";
import { modals } from "@mantine/modals";
import { navigate } from "@/packages/actions";
import { Avatar, Flex, Menu, Stack } from "@mantine/core";

import { ArrowDown01Icon } from "hugeicons-react";
import { User, Setting2, LogoutCurve } from "iconsax-react";

import { ConfirmLogout } from "./modals/logout";
import { ArrowDownIcon } from "@/svgs";

export function AdminUser() {
  function handleLogout() {
    modals.open({
      children: <ConfirmLogout />,
      withCloseButton: false,
      modalId: MODALS.CONFIRMATION,
    });
  }
  return (
    <Menu
      shadow='md'
      position='bottom-end'
      styles={{
        item: {
          padding: "16px",
          borderRadius: 0,
        },
        dropdown: {
          padding: 0,
        },
      }}
    >
      <Menu.Target>
        <Flex align='center' gap={8}>
          <Avatar
            src='/images/avatar.png'
            alt='Mide Martins'
            size={40}
            className='rounded-full'
          />

          <Flex gap={12} className='hidden sm:flex' align='center'>
            <Stack gap={1}>
              <p className='text-primary-text-body font-medium text-sm cur'>
                Mide Martins
              </p>
              <p className='text-xs'>Estate Owner</p>
            </Stack>

            <ArrowDownIcon className='cursor-pointer' />
          </Flex>
        </Flex>
      </Menu.Target>

      <Menu.Dropdown className='shadow-lg overflow-hidden' variant='action'>
        <Menu.Item
          classNames={{
            item: "hover:bg-transparent cursor-auto",
          }}
          closeMenuOnClick={false}
        >
          <Flex align='center' gap={8}>
            <Avatar src='/images/avatar.png' alt='Mide Martins' size={30} />
            <Stack gap={1}>
              <p className='text-primary-text-body font-medium'>Mide Martins</p>
              <p className='text-xs'>useradmin@estatevisa.com</p>
            </Stack>
          </Flex>
        </Menu.Item>
        <Menu.Divider />

        <Menu.Item
          leftSection={<User size={18} />}
          onClick={() => navigate(PAGES.PROFILE)}
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
