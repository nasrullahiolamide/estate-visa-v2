import { Fragment } from "react";

import { MODALS } from "@/packages/libraries";

import { Button, Text, Stack, Flex } from "@mantine/core";
import { modals } from "@mantine/modals";
import { Emblem } from "@/components/shared/interface";
import { OccupantsData } from "@/builders/types/occupants";

interface ConfirmOccupantProps {
  data: OccupantsData;
}

export function ConfirmOccupant({ data }: ConfirmOccupantProps) {
  const handleConfirmation = () => {
    console.log("Added Successfully");
    console.log(data);
    modals.close(MODALS.ADD_NEW_OCCUPANTS);
    modals.close(MODALS.CONFIRM_OCCUPANT);
  };

  return (
    <Fragment>
      <Stack py={10} className='sm:p-5'>
        <Text ta='center' className='prose-xl/medium'>
          Is the Occupant a Principal Occupant?
        </Text>
        <Text ta='center' className='prose-lg/regular' component='p'>
          A principal occupant is the main owner of the apartment.
        </Text>

        <Flex justify='center' gap={15} mt={30}>
          <Button
            flex={1}
            w='fit-content'
            variant='outline'
            onClick={() => modals.close(MODALS.CONFIRM_OCCUPANT)}
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
