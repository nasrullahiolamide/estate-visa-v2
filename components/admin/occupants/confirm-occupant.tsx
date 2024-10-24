import { Fragment } from "react";

import { MODALS } from "@/packages/libraries";

import { Button, Text, Stack, Flex } from "@mantine/core";
import { modals } from "@mantine/modals";
import { ConfirmationModal, Emblem } from "@/components/shared/interface";
import { OccupantsData } from "@/builders/types/occupants";

interface ConfirmOccupantProps {
  data: OccupantsData;
}

export function ConfirmOccupant({ data }: ConfirmOccupantProps) {
  const handleConfirmation = () => {
    console.log("Added Successfully");
    console.log(data);
    modals.close(MODALS.ADD_NEW_OCCUPANTS);
    modals.close(MODALS.CONFIRMATION);
  };

  return (
    <Fragment>
      <ConfirmationModal
        withTwoButtons
        title=' Is the Occupant a Principal Occupant?'
        description='A principal occupant is the main owner of the apartment.'
        primaryBtnText='Yes, proceed'
        secondaryBtnText='No'
        primaryBtnProps={{
          onClick: handleConfirmation,
        }}
        secondaryBtnProps={{
          onClick: () => handleConfirmation,
        }}
      />
    </Fragment>
  );
}
