"use client";

import { useQueryState } from "nuqs";
import { Fragment } from "react";
import { Add } from "iconsax-react";
import { Button, Flex, Tabs } from "@mantine/core";
import { AppShellHeader } from "@/components/admin/shared/app-shell";
import { FilterDropdown } from "@/components/admin/shared/dropdowns/filter";
import { FlowContainer } from "@/components/layout/flow-container";
import { FlowContentContainer } from "@/components/layout/flow-content-container";
import { FlowTabs, FlowTabsPanel } from "@/components/layout";
import { UserFriendsIcon, BroadcastIcon } from "@/svgs";

export default function Messages() {
  const [view, setView] = useQueryState("type", {
    defaultValue: "occupants",
  });

  return (
    <Fragment>
      <AppShellHeader title='Messages' options={<HeaderOptions />} />
      <FlowContainer type='plain' className='lg:~p-1/8'>
        <FlowContentContainer
          classNames={{
            root: "rounded-none lg:rounded-2xl bg-white",
          }}
        >
          <FlowTabs value={view} onChange={setView}>
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
              <></>
            </FlowTabsPanel>
          </FlowTabs>
        </FlowContentContainer>
      </FlowContainer>
    </Fragment>
  );
}

function HeaderOptions() {
  return (
    <Flex gap={14} wrap='wrap'>
      <Button fz='sm' size='md' leftSection={<Add />}>
        Write a Message
      </Button>
      <FilterDropdown
        label='Filter'
        data={[
          { label: "Recently Added", value: "recent" },
          { label: "Street Name(A-Z)", value: "a-z" },
          { label: "Street Name(Z-A)", value: "z-a" },
        ]}
      />
      <FilterDropdown
        label='All'
        data={[
          { label: "All", value: "all" },
          { label: "Inbox", value: "inbox" },
          { label: "Sent", value: "sent" },
        ]}
      />
    </Flex>
  );
}
