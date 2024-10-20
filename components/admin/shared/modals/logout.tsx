import { Fragment } from "react";

import { navigate } from "@/packages/actions";
import { PAGES, MODALS } from "@/packages/libraries";

import { Button, Text, Stack, Flex } from "@mantine/core";
import { modals } from "@mantine/modals";
import { Emblem } from "@/components/shared/interface";

export function ConfirmLogout() {
  const handleLogout = () => {
    navigate(PAGES.LOGOUT);
    modals.close(MODALS.CONFIRM_LOGOUT);
  };

  return (
    <Fragment>
      <Stack py={10} className='sm:p-5'>
        <Emblem image='/sprites/logout.gif' h={110} ml={50} />
        <Text ta='center' className='prose-xl/regular sm:prose-2xl/regular'>
          Are you sure you want to sign out of your account?
        </Text>

        <Flex justify='center' gap={15} mt={20} wrap='wrap'>
          <Button
            w='fit-content'
            variant='outline'
            onClick={() => modals.close(MODALS.CONFIRM_LOGOUT)}
            className='sm:flex-1'
          >
            Stay Logged In
          </Button>
          <Button flex={1} color='red' onClick={handleLogout}>
            Sign Out
          </Button>
        </Flex>
      </Stack>
    </Fragment>
  );
}
