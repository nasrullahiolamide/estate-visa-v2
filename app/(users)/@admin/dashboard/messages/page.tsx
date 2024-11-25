"use client";

import { Fragment, useEffect } from "react";
import { toString } from "lodash";
import { getCookie } from "cookies-next";
import { useQueryState } from "nuqs";
import { Add } from "iconsax-react";
import { useQuery } from "@tanstack/react-query";
import { Button, Flex, Tabs } from "@mantine/core";
import { modals } from "@mantine/modals";

import { builder } from "@/builders";
import { useFakeMessagesList } from "@/builders/types/messages";
import { APP, MODALS } from "@/packages/libraries";
import { OccupantMessages } from "@/components/admin/messages/occupants";
import { BroadcastMessages } from "@/components/admin/messages/broadcasts";
import { WriteModal } from "@/components/admin/messages/modals/write";
import {
  FlowTabs,
  FlowTabsPanel,
  useFlowState,
  FlowContentContainer,
  FlowContainer,
} from "@/components/layout";
import { FilterDropdown } from "@/components/shared/interface/dropdowns";
import { AppShellHeader } from "@/components/shared/interface/app-shell";
import { UserFriendsIcon, BroadcastIcon, Inbox } from "@/icons";
import { MESSAGE_TYPE } from "@/components/admin/messages/enums";

export default function Messages() {
  const estateId = toString(getCookie(APP.ESTATE_ID));
  const initialMeetingList = useFakeMessagesList();

  const { page, pageSize } = useFlowState();
  const [type, setType] = useQueryState("type", {
    defaultValue: MESSAGE_TYPE.OCCUPANT,
  });

  const handleModal = () => {
    modals.open({
      title:
        type === MESSAGE_TYPE.OCCUPANT ? "Write Message" : "Send Broadcast",
      modalId: MODALS.WRTIE_MESSAGE,
      children: <WriteModal view={type} />,
    });
  };

  const { data, isPlaceholderData, refetch } = useQuery({
    queryKey: builder.messages.get.table.get(),
    queryFn: () =>
      builder.use().messages.get.table({
        estateId,
        params: { page, pageSize },
      }),
    placeholderData: initialMeetingList,
    select: (data) => {
      const occupant_messages = data?.messages?.filter(
        (message) => message.type === MESSAGE_TYPE.OCCUPANT
      );
      const broadcast_messages = data?.messages?.filter(
        (message) => message.type === MESSAGE_TYPE.BROADCAST
      );
      return { occupant_messages, broadcast_messages };
    },
  });

  const noOccupantMessages = data?.occupant_messages?.length === 0;
  const noBroadcastMessages = data?.broadcast_messages?.length === 0;
  const noDataAvailable =
    (type === MESSAGE_TYPE.OCCUPANT && noOccupantMessages) ||
    (type === MESSAGE_TYPE.BROADCAST && noBroadcastMessages);

  useEffect(() => {
    refetch();
  }, [type]);

  return (
    <Fragment>
      <AppShellHeader
        title='Messages'
        options={
          <HeaderOptions
            view={type}
            onClick={handleModal}
            hidden={noDataAvailable || isPlaceholderData}
          />
        }
      />
      <FlowContainer type='plain' className='lg:~p-1/8'>
        <FlowContentContainer
          classNames={{
            root: "rounded-none lg:rounded-2xl bg-white",
          }}
        >
          <FlowTabs
            value={type}
            onChange={setType}
            tabsContainerProps={{
              gap: 0,
            }}
          >
            <Flex align='center'>
              <Tabs.List className='w-full'>
                <Tabs.Tab
                  value={MESSAGE_TYPE.OCCUPANT}
                  flex={1}
                  py={18}
                  leftSection={<UserFriendsIcon />}
                >
                  Occupants
                </Tabs.Tab>
                <Tabs.Tab
                  value={MESSAGE_TYPE.BROADCAST}
                  flex={1}
                  py={18}
                  leftSection={<BroadcastIcon />}
                >
                  BroadCast
                </Tabs.Tab>
              </Tabs.List>
            </Flex>

            <FlowTabsPanel value={MESSAGE_TYPE.OCCUPANT}>
              <OccupantMessages
                data={data?.occupant_messages}
                loading={isPlaceholderData}
                handleWrite={handleModal}
              />
            </FlowTabsPanel>
            <FlowTabsPanel value={MESSAGE_TYPE.BROADCAST}>
              <BroadcastMessages
                data={data?.broadcast_messages}
                loading={isPlaceholderData}
                handleWrite={handleModal}
              />
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
  hidden?: boolean;
}

function HeaderOptions({ onClick, view, hidden }: HeaderOptionsProps) {
  return (
    <Flex gap={14} hidden={hidden} wrap='wrap'>
      {view === MESSAGE_TYPE.OCCUPANT ? (
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
