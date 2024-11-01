"use client";

import { useQueryState } from "nuqs";
import { Fragment } from "react";
import { Add } from "iconsax-react";

import { Button, Flex, Stack, Tabs } from "@mantine/core";
import { modals } from "@mantine/modals";

import { MODALS } from "@/packages/libraries";
import { AppShellHeader } from "@/components/admin/shared/app-shell";
import { FilterDropdown } from "@/components/admin/shared/dropdowns/filter";
import { FlowContainer } from "@/components/layout/flow-container";
import { FlowContentContainer } from "@/components/layout/flow-content-container";
import { FlowTabs, FlowTabsPanel } from "@/components/layout";
import { OccupantMessages } from "@/components/admin/messages/occupants";
import { WriteModal } from "@/components/admin/messages/modals/write";
import { BroadcastMessages } from "@/components/admin/messages/broadcasts";

import { UserFriendsIcon, BroadcastIcon, Inbox } from "@/icons";
import { useMessagesValue } from "@/packages/hooks/use-messages-value";

export default function Messages() {
  const [view, setView] = useQueryState("type", {
    defaultValue: "occupants",
  });

  const { setContent } = useMessagesValue(view);

  const handleWriteBroadcastMsg = () => {
    modals.open({
      title: view === "occupants" ? "Write Message" : "Send Broadcast",
      modalId: MODALS.WRITE_BROADCAST_MESSAGE,
      children: <WriteModal view={view} />,
    });
  };

  return (
    <Fragment>
      <AppShellHeader
        title='Messages'
        options={
          <HeaderOptions view={view} onClick={handleWriteBroadcastMsg} />
        }
      />
      <FlowContainer type='plain' className='lg:~p-1/8'>
        <FlowContentContainer
          classNames={{
            root: "rounded-none lg:rounded-2xl bg-white",
          }}
        >
          <FlowTabs
            value={view}
            onChange={setView}
            tabsContainerProps={{ gap: 0 }}
          >
            <Flex align='center'>
              <Tabs.List className='w-full'>
                <Tabs.Tab
                  value='occupants'
                  flex={1}
                  py={18}
                  leftSection={<UserFriendsIcon />}
                >
                  Occupants
                </Tabs.Tab>
                <Tabs.Tab
                  value='broadcast'
                  flex={1}
                  py={18}
                  leftSection={<BroadcastIcon />}
                >
                  BroadCast
                </Tabs.Tab>
              </Tabs.List>
            </Flex>

            <FlowTabsPanel value='occupants'>
              <OccupantMessages />
            </FlowTabsPanel>
            <FlowTabsPanel value='broadcast'>
              <BroadcastMessages />
            </FlowTabsPanel>
          </FlowTabs>
        </FlowContentContainer>
      </FlowContainer>
    </Fragment>
  );
}

interface HeaderOptionsProps {
  view: string;
  onClick: () => void;
}

function HeaderOptions({ view, onClick }: HeaderOptionsProps) {
  return (
    <Flex gap={14} wrap='wrap'>
      {view === "occupants" ? (
        <Button fz='sm' size='md' leftSection={<Add />} onClick={onClick}>
          Write a Message
        </Button>
      ) : (
        <Button fz='sm' size='md' leftSection={<Add />} onClick={onClick}>
          Send a Broadcast
        </Button>
      )}
      <FilterDropdown
        label='All'
        icon={<Inbox />}
        data={[
          { label: "All", value: "all" },
          { label: "Inbox", value: "inbox" },
          { label: "Sent", value: "sent" },
        ]}
      />
      <FilterDropdown
        label='Filter'
        data={[
          { label: "Recently Added", value: "recent" },
          { label: "Street Name(A-Z)", value: "a-z" },
          { label: "Street Name(Z-A)", value: "z-a" },
        ]}
      />
    </Flex>
  );
}
