import { Avatar, Flex, Menu, Stack } from "@mantine/core";
import { ArrowDown01Icon } from "hugeicons-react";
import { User, Setting2, LogoutCurve, ArrowDown } from "iconsax-react";
import { Fragment } from "react";

export function AdminUser() {
  return (
    <Menu
      shadow='md'
      width={200}
      position='bottom-end'
      styles={{
        item: {
          padding: "8px 16px",
        },
        dropdown: {
          // marginTop: 2,
        },
      }}
    >
      <Menu.Target>
        <Flex align='center' gap={8}>
          <Avatar
            size={50}
            src='/images/user.png'
            alt='Mide Martins'
            radius='xl'
          />

          <Flex gap={12} className='hidden sm:flex' align='center'>
            <Stack gap={1}>
              <p className='text-primary-text-body font-medium'>Mide Martins</p>
              <p className='text-xs'>Estate Owner</p>
            </Stack>

            <ArrowDown01Icon className='pointer-cursor' />
          </Flex>
        </Flex>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Account</Menu.Label>
        <Menu.Item leftSection={<User size={18} />}>My Profile</Menu.Item>
        <Menu.Item leftSection={<Setting2 size={18} />}>Settings</Menu.Item>
        <Menu.Divider />
        <Menu.Item color='red' leftSection={<LogoutCurve size={18} />}>
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
