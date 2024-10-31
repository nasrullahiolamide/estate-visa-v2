import clsx from "clsx";

import { getCookie, setCookie } from "cookies-next";
import { User, LogoutCurve } from "iconsax-react";
import { Avatar, Flex, Menu, Stack } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useSuspenseQuery } from "@tanstack/react-query";

import { navigate } from "@/packages/actions";
import { APP, encryptUri, makePath, MODALS, PAGES } from "@/packages/libraries";
import { formatUserType } from "@/builders/types/login";
import { builder } from "@/builders";
import { ArrowDownIcon } from "@/icons";
import { ConfirmLogout } from "./modals/logout";
import Link from "next/link";

function handleLogout() {
  modals.open({
    children: <ConfirmLogout />,
    withCloseButton: false,
    modalId: MODALS.CONFIRMATION,
  });
}

export function UserDetails() {
  const userId = getCookie(APP.USER_ID) as string;

  const { data, isLoading } = useSuspenseQuery({
    queryKey: builder.account.profile.get.get(userId),
    queryFn: () => builder.use().account.profile.get(userId),
    select: (data) => {
      const encryptedValue = encryptUri(data);
      setCookie(APP.USER_DATA, encryptedValue);
      return data;
    },
  });

  const userDetails = {
    fullName: `${data?.firstname} ${data?.lastname}`,
    userType: formatUserType[data?.roles[0].name],
    ...data,
  };

  return (
    <Menu
      shadow='md'
      position='bottom-end'
      classNames={{
        item: clsx({
          skeleton: isLoading,
        }),
      }}
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
          <Avatar
            src={null}
            alt='Mide Martins'
            size={45}
            className={clsx({
              skeleton: isLoading,
            })}
          />

          <Flex
            gap={12}
            className={clsx("hidden sm:flex", {
              skeleton: isLoading,
            })}
            align='center'
          >
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

      <Menu.Dropdown className='shadow-lg overflow-hidden' variant='action'>
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
