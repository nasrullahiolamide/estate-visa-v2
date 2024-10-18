import { Fragment } from "react";

import { MODALS } from "@/packages/libraries";

import { Button, Text, Stack, Flex } from "@mantine/core";
import { modals } from "@mantine/modals";
import { Emblem } from "@/components/shared/interface";

export function DeleteSubAdmin() {
  const handleDelete = () => {
    modals.close(MODALS.DELETE_SUB_ADMIN);
  };

  return (
    <Fragment>
      <Stack py={10} className='sm:p-5'>
        <Emblem image='/sprites/delete.gif' h={120} />
        <Text ta='center' className='prose-2xl/regular'>
          Are you sure you want to delete this Sub Admin?
        </Text>

        <Flex justify='center' gap={15} mt={30}>
          <Button
            flex={1}
            w='fit-content'
            variant='outline'
            onClick={() => modals.close(MODALS.DELETE_SUB_ADMIN)}
          >
            No
          </Button>
          <Button flex={1} color='red' onClick={handleDelete}>
            Yes, delete
          </Button>
        </Flex>
      </Stack>
    </Fragment>
  );
}
