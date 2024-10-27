import { APP, makePath, MODALS, PAGES, USER_TYPE } from "@/packages/libraries";
import { modals } from "@mantine/modals";
import { navigate } from "@/packages/actions";
import { Avatar, Flex, Menu, Stack } from "@mantine/core";

import { User, LogoutCurve } from "iconsax-react";

import { ArrowDownIcon } from "@/svgs";
import { useQuery } from "@tanstack/react-query";
import { builder } from "@/builders";
import { ConfirmLogout } from "./modals/logout";
import { getCookie } from "cookies-next";
import clsx from "clsx";

const userType: Record<PropertyKey, string> = {
  [USER_TYPE.ADMIN]: "Estate Owner",
  [USER_TYPE.SUPER_ADMIN]: "Super Admin",
  [USER_TYPE.OCCUPANT]: "Occupant",
  [USER_TYPE.SUB_OCCUPANT]: "Sub Occupant",
  [USER_TYPE.PROPERTY_OWNER]: "Property Owner",
  [USER_TYPE.GATEMAN]: "Gateman",
};

export function AdminUser() {
  function handleLogout() {
    modals.open({
      children: <ConfirmLogout />,
      withCloseButton: false,
      modalId: MODALS.CONFIRMATION,
    });
  }

  const userId = getCookie(APP.USER_ID) ?? "";

  const { data, isLoading } = useQuery({
    queryKey: builder.account.profile.get.get(userId),
    queryFn: () => builder.use().account.profile.get(userId),
    select: ({ data }) => data.user,
  });

  const userDetails = {
    fullName: `${data?.firstname} ${data?.lastname}`,
    userType: userType[data?.roles[0].name ?? ""],
    ...data,
  };

  console.log({ data, userDetails });

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
          padding: "16px",
          borderRadius: 0,
          cursor: "pointer",
        },
        dropdown: {
          padding: 0,
        },
      }}
    >
      <Menu.Target>
        <Flex align='center' gap={8}>
          <Avatar
            src={data?.picture}
            alt='Mide Martins'
            size={40}
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
                {userDetails.fullName}
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
          closeMenuOnClick={false}
        >
          <Flex align='center' gap={8}>
            <Avatar src={userDetails.picture} alt='Mide Martins' size={30} />
            <Stack gap={1}>
              <p className='text-primary-text-body font-medium'>
                {userDetails.fullName}
              </p>
              <p className='text-xs'>{userDetails.email}</p>
            </Stack>
          </Flex>
        </Menu.Item>
        <Menu.Divider />

        <Menu.Item
          leftSection={<User size={18} />}
          onClick={() => navigate(makePath(PAGES.DASHBOARD, PAGES.PROFILE))}
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
