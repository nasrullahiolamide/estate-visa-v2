"use client";

import { toString } from "lodash";
import { Add } from "iconsax-react";
import { getCookie } from "cookies-next";
import { useQueryState } from "nuqs";
import { modals } from "@mantine/modals";
import { Fragment, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button, Flex, Tabs } from "@mantine/core";
import { builder } from "@/builders";
import { useFakeMessagesList } from "@/builders/types/messages";
import { APP, MODALS } from "@/packages/libraries";
import {
  FlowTabs,
  FlowTabsPanel,
  useFlowState,
  FlowContentContainer,
  FlowContainer,
  FlowEntriesPerPage,
  FlowFooter,
  FlowPagination,
} from "@/components/layout";
import { FilterDropdown } from "@/components/shared/interface/dropdowns";
import { AppShellHeader } from "@/components/shared/interface/app-shell";
import { WriteModal } from "@/components/admin/messages/write";
import { Conversations } from "@/components/shared/chat/messages/conversation";
import { Announcements } from "@/components/shared/chat/notice-board/conversation";
import { MESSAGE_TYPE } from "@/components/shared/chat/types";
import { UserFriendsIcon, BroadcastIcon, Inbox } from "@/icons";
import clsx from "clsx";

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
              <Conversations
                isAdmin
                data={data?.occupant_messages}
                loading={isPlaceholderData}
                emptyProps={{
                  title:
                    "You have no messages yet. Start a conversation to stay connected!",
                  text: "Write a Message",
                  btnProps: {
                    leftSection: <Add />,
                    onClick: handleModal,
                  },
                }}
              />
            </FlowTabsPanel>
            <FlowTabsPanel value={MESSAGE_TYPE.BROADCAST}>
              <Announcements
                isAdmin
                data={data?.broadcast_messages}
                loading={isPlaceholderData}
                emptyProps={{
                  title:
                    "You have no broadcast messages yet. Check back later for updates!",
                  text: "Send a Broadcast",
                  btnProps: {
                    leftSection: <Add />,
                    onClick: handleModal,
                  },
                }}
              />
            </FlowTabsPanel>
          </FlowTabs>
        </FlowContentContainer>
        <FlowFooter
          className={clsx(
            "flex bg-white justify-between lg:rounded-b-2xl mt-2",
            { hidden: noDataAvailable || isPlaceholderData }
          )}
        >
          <FlowPagination />
          <FlowEntriesPerPage />
        </FlowFooter>
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
