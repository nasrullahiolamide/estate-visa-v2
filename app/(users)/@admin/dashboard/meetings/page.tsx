"use client";

import { Fragment, ReactNode } from "react";
import { Button, Flex, Menu, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useDisclosure } from "@mantine/hooks";
import { useFakeMeetingsList } from "@/builders/types/meetings";
import { ActionableMeetingColumns } from "@/columns/for_admins/meetings";
import { MODALS } from "@/packages/libraries";
import { ConfirmDelete } from "@/components/admin/shared/modals";
import { SheduleMeeting } from "@/components/admin/meetings/shedule";
import { AppShellHeader } from "@/components/admin/shared/app-shell";
import { FilterDropdown } from "@/components/admin/shared/dropdowns/filter";
import { EmptySlot } from "@/components/shared/interface";
import { AddNewMinutes } from "@/components/admin/meetings/add-minutes";
import { AddIcon, EditIcon } from "@/icons";
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
  FlowMenuDropdown,
} from "@/components/layout";

const filterOptions = [
  { label: "A-Z", value: "a-z" },
  {
    label: "Status",
    value: "status",
    children: [
      { label: "Completed", value: "completed" },
      { label: "Scheduled", value: "sheduled" },
      { label: "Cancelled", value: "cancelled" },
    ],
  },
];

const handleDelete = () => {
  modals.open({
    children: <ConfirmDelete title='meeting' />,
    withCloseButton: false,
    modalId: MODALS.CONFIRMATION,
  });
};

const handleMinutes = () => {
  modals.open({
    title: "Add Meeting Minutes",
    children: <AddNewMinutes />,
    modalId: MODALS.ADD_MEETINGS_MINUTES,
  });
};

const Actions: Record<PropertyKey, ReactNode> = {
  cancelled: (
    <FlowTableActions
      actions={["edit", "add", "delete"]}
      showDesktopView={false}
      editProps={{
        label: "Edit Meeting Details",
        onEdit: () => console.log("Edit Meeting Details"),
      }}
      addProps={{
        label: "Reschedule Meeting",
        onAdd: handleMinutes,
      }}
      deleteProps={{
        onDelete: handleDelete,
      }}
    />
  ),

  completed: (
    <FlowTableActions
      actions={["view", "add", "delete"]}
      showDesktopView={false}
      viewProps={{
        label: "View Meeting Details",
        onView: () => console.log("View Meeting Details"),
      }}
      addProps={{
        label: "Add Meeting Minutes",
        onAdd: handleMinutes,
      }}
      deleteProps={{
        onDelete: handleDelete,
      }}
    />
  ),

  scheduled: (
    <FlowTableActions
      actions={["edit", "others", "delete"]}
      showDesktopView={false}
      editProps={{
        label: "Edit Meeting Details",
        onEdit: () => console.log("Edit Meeting Details"),
      }}
      deleteProps={{
        onDelete: handleDelete,
      }}
      otherProps={{
        children: (
          <Menu.Item
            closeMenuOnClick={false}
            leftSection={<EditIcon width={14} />}
          >
            <Menu position='right-start' offset={45}>
              <Menu.Target>
                <Text fz={14} w='100%'>
                  Edit Status
                </Text>
              </Menu.Target>
              <FlowMenuDropdown variant='action'>
                <Menu.Item onClick={() => console.log("Meeting Scheduled")}>
                  Complete Meeting
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item>Cancel Meeting</Menu.Item>
              </FlowMenuDropdown>
            </Menu>
          </Menu.Item>
        ),
      }}
    />
  ),
};

export default function Meetings() {
  const [opened, { open: openDrawer, close: closeDrawer }] =
    useDisclosure(false);

  const meetings = useFakeMeetingsList();

  const dataToDisplay = meetings?.data.map((list) => {
    return {
      ...list,
      action: Actions[list.status.toLowerCase()],
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
                columns={ActionableMeetingColumns}
                skeleton={false}
              />
            ) : (
              <EmptySlot
                title='You have no meetings yet. Schedule one to get started!'
                src='meeting'
                withButton
                text='Shedule Meeting'
                btnProps={{
                  leftSection: <AddIcon />,
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
      <Button fz='sm' size='md' leftSection={<AddIcon />} onClick={openDrawer}>
        Schedule Meeting
      </Button>
      <Button
        fz='sm'
        variant='outline'
        size='md'
        leftSection={<AddIcon />}
        onClick={handleMinutes}
      >
        Add Meeting Minutes
      </Button>
      <FilterDropdown data={filterOptions} />
    </Flex>
  );
}
