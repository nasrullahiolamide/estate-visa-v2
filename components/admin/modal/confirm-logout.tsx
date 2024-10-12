import { Fragment } from "react";

import { navigate } from "@/packages/actions";
import { PAGES, MODALS } from "@/packages/libraries";

import { Button, Text, Stack, Flex } from "@mantine/core";
import { modals } from "@mantine/modals";

export function ConfirmLogout() {
  return (
    <Fragment>
      <Stack p={20}>
        <Text ta='center' fw={500} className='prose-2xl/medium'>
          Are you sure you want to sign out of your account?
        </Text>

        <Flex justify='center' gap={30} mt={30}>
          <Button
            variant='outline'
            onClick={() => modals.close(MODALS.CONFIRM_LOGOUT)}
          >
            Stay Logged In
          </Button>
          <Button
            color='red'
            onClick={() => modals.close(MODALS.CONFIRM_LOGOUT)}
          >
            Sign Out
          </Button>
        </Flex>
      </Stack>
    </Fragment>
  );
}
