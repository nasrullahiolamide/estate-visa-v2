"use client";

import { Fragment } from "react";
import { Add } from "iconsax-react";
import { Button, Flex } from "@mantine/core";
import { modals } from "@mantine/modals";
import { MODALS } from "@/packages/libraries";
import { ConfirmDelete } from "@/components/admin/shared/modals";
import { ViewEditHouses } from "@/components/admin/houses/view-edit";
import { AddNewHouse } from "@/components/admin/houses/add";
import { SheduleMeeting } from "@/components/admin/meetings/shedule";

import { AppShellHeader } from "@/components/admin/shared/app-shell/header";
import { FilterDropdown } from "@/components/admin/shared/dropdowns/filter";
import { EmptySlot } from "@/components/shared/interface";
import {
  FlowContainer,
  FlowContentContainer,
  FlowEntriesPerPage,
  FlowFooter,
  FlowPagination,
  FlowPaper,
  FlowTable,
  FlowFloatingButtons,
  FlowTableActions,
} from "@/components/layout";
import { useDisclosure } from "@mantine/hooks";
import { useFakeMeetingsList } from "@/builders/types/meetings";
import { meetingColumns } from "@/columns/meetings";
import { AddNewMinutes } from "@/components/admin/meetings/add-minutes";

const filterOptions = [
  { label: "Recently Added", value: "recent" },
  { label: "Street Name(A-Z)", value: "a-z" },
  { label: "Street Name(Z-A)", value: "z-a" },
];

const handleNewMinutes = () => {
  modals.open({
    title: "Add Meeting Minutes",
    children: <AddNewMinutes />,
    modalId: MODALS.ADD_MEETINGS_MINUTES,
  });
};

export default function Meetings() {
  const [opened, { open: openDrawer, close: closeDrawer }] =
    useDisclosure(false);

  const meetings = useFakeMeetingsList();

  const dataToDisplay = meetings?.data.map((list) => {
    return {
      ...list,
      action: (
        <FlowTableActions
          actions={["activate-suspend", "edit", "view", "delete"]}
        />
      ),
    };
  });

  return (
    <Fragment>
      <AppShellHeader
        title='Meeting Overview'
        options={<HeaderOptions openDrawer={openDrawer} />}
      />

      <FlowContainer type='plain' className='lg:~p-1/8'>
        <FlowContentContainer
          classNames={{
            root: "rounded-none lg:rounded-2xl bg-white",
          }}
        >
          <FlowPaper>
            {meetings?.data.length ? (
              <FlowTable
                data={dataToDisplay}
                columns={meetingColumns}
                skeleton={false}
              />
            ) : (
              <EmptySlot
                title='You have no meetings yet. Schedule one to get started!'
                src='meeting'
                withButton
                text='Shedule Meeting'
                btnProps={{
                  leftSection: <Add />,
                  onClick: openDrawer,
                }}
              />
            )}
          </FlowPaper>
          <FlowFooter hidden={false}>
            <FlowPagination />
            <FlowEntriesPerPage />
          </FlowFooter>
        </FlowContentContainer>

        <FlowFloatingButtons
          withPrimaryButon
          hasFilterButton
          filterData={filterOptions}
          primaryButton={{
            icon: "add",
            btnProps: {
              onClick: openDrawer,
            },
          }}
        />
        <SheduleMeeting open={opened} close={closeDrawer} />
      </FlowContainer>
    </Fragment>
  );
}

interface HeaderOptionsProps {
  openDrawer: () => void;
}

function HeaderOptions({ openDrawer }: HeaderOptionsProps) {
  return (
    <Flex gap={14} wrap='wrap'>
      <Button fz='sm' size='md' leftSection={<Add />}>
        Schedule Meeting
      </Button>
      <Button
        fz='sm'
        variant='outline'
        size='md'
        leftSection={<Add />}
        onClick={handleNewMinutes}
      >
        Add Meeting Minutes
      </Button>
      <FilterDropdown data={filterOptions} />
    </Flex>
  );
}
