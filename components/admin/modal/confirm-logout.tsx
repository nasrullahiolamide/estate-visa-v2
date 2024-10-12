import { Fragment } from "react";

import { navigate } from "@/packages/actions";
import { PAGES, MODALS } from "@/packages/libraries";

import { Button, Text, Stack, Flex } from "@mantine/core";
import { modals } from "@mantine/modals";

export function ConfirmLogout() {
  return (
    <Fragment>
      <Stack py={10} className='sm:p-5'>
        <Text ta='center' className='prose-2xl/regular'>
          Are you sure you want to sign out of your account?
        </Text>

        <Flex justify='center' gap={15} mt={30}>
          <Button
            flex={1}
            w='fit-content'
            variant='outline'
            onClick={() => modals.close(MODALS.CONFIRM_LOGOUT)}
          >
            Stay Logged In
          </Button>
          <Button
            flex={1}
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
