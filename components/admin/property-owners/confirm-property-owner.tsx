import { Fragment } from "react";

import { MODALS } from "@/packages/libraries";

import { Button, Text, Stack, Flex } from "@mantine/core";
import { modals } from "@mantine/modals";

export function ConfirmPropertyOwner() {
  const handleConfirmation = () => {
    console.log("Added Successfully");
    modals.close(MODALS.ADD_NEW_OCCUPANTS);
    modals.close(MODALS.CONFIRMATION);
  };

  return (
    <Fragment>
      <Stack py={10} className='sm:p-5'>
        <Text ta='center' className='prose-xl/medium'>
          Is this Occupant the Property Owner?
        </Text>
        <Text ta='center' className='prose-lg/regular' component='p'>
          A property owner is the main owner of the apartment.
        </Text>

        <Flex justify='center' gap={15} mt={30}>
          <Button
            flex={1}
            w='fit-content'
            variant='outline'
            onClick={() => modals.close(MODALS.CONFIRMATION)}
          >
            No
          </Button>
          <Button flex={1} onClick={handleConfirmation}>
            Yes, proceed
          </Button>
        </Flex>
      </Stack>
    </Fragment>
  );
}
