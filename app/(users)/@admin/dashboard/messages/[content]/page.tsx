"use client";

import { Fragment } from "react";
import { AxiosError } from "axios";
import { Flex, Button } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useMutation, useQuery } from "@tanstack/react-query";
import { builder } from "@/builders";
import { MessagesData, useFakeMessagesData } from "@/builders/types/messages";
import { TIME_FORMAT } from "@/packages/constants/time";
import { navigate } from "@/packages/actions";
import { handleError, handleSuccess } from "@/packages/notification";
import { formatDate, makePath, MODALS, PAGES } from "@/packages/libraries";
import { AppShellHeader } from "@/components/admin/shared";
import { ConfirmationModal, EmptySlot } from "@/components/shared/interface";
import { AddIcon, CurlyBackArrrow, EditIcon, TrashIcon } from "@/icons";
import { MessageContent } from "@/components/admin/messages/cards/content";
import {
  FlowContainer,
  FlowContentContainer,
  FlowPaper,
} from "@/components/layout";
import {
  MessagesValue,
  useMessagesValue,
} from "@/packages/hooks/use-messages-value";
import {
  MESSAGE_TYPE,
  WriteModal,
} from "@/components/admin/messages/modals/write";
import { EditModal } from "@/components/admin/messages/modals/edit";
import { useRouter } from "next/navigation";

interface PageProps {
  params: {
    content: string;
  };
}

const handleWriteBroadcastMsg = (view: string) => {
  modals.open({
    title: view === MESSAGE_TYPE.OCCUPANT ? "Write Message" : "Send Broadcast",
    modalId: MODALS.WRITE_BROADCAST_MESSAGE,
    children: <WriteModal view={view} />,
  });
};

const editMessage = (view: string, data: MessagesData) => {
  modals.open({
    title: view === MESSAGE_TYPE.OCCUPANT ? "Edit Message" : "Edit Broadcast",
    modalId: MODALS.EDIT_MESSAGE,
    children: <EditModal view={view} content={data} />,
  });
};

export default function Page({ params }: PageProps) {
  const {
    content: { view, id },
  } = useMessagesValue(params.content);

  const initialMessageData = useFakeMessagesData();

  const { data: message, isPlaceholderData } = useQuery({
    queryKey: builder.messages.get.id.get(id),
    queryFn: () => builder.use().messages.get.id(id),
    placeholderData: Array.from({ length: 1 }, (_, i) => initialMessageData),
    select: (data) =>
      data.map((item) => {
        const localDate = formatDate(item?.updatedAt, "MM/DD/YYYY");
        const localTime = formatDate(item?.updatedAt, TIME_FORMAT);
        const houseIds = [item.house.houseNumber];
        return { ...item, localDate, localTime, houseIds };
      }),
    enabled: !!id,
  });
  const data = message?.[0];

  return (
    <Fragment>
      <AppShellHeader
        title='Message Details'
        backHref={makePath(PAGES.DASHBOARD, PAGES.MESSAGES)}
        showLinks={false}
        options={
          <HeaderOptions content={{ view, id }} data={data as MessagesData} />
        }
      />
      <FlowContainer type='plain' className='lg:~p-1/8'>
        <FlowContentContainer
          classNames={{
            root: "rounded-none lg:rounded-2xl bg-white",
          }}
        >
          <FlowPaper>
            {data ? (
              <MessageContent
                data={data}
                skeleton={isPlaceholderData}
                view={view}
              />
            ) : (
              <EmptySlot
                title='Message not found. Start a conversation to stay connected!'
                src='no-talk'
                withButton
                text={
                  view === MESSAGE_TYPE.OCCUPANT
                    ? "Write Message"
                    : "Send a Broadcast"
                }
                btnProps={{
                  leftSection: <AddIcon />,
                  onClick: () => handleWriteBroadcastMsg(view),
                }}
              />
            )}
          </FlowPaper>
        </FlowContentContainer>
      </FlowContainer>
    </Fragment>
  );
}

interface HeaderOptionsProps {
  content: MessagesValue;
  data: MessagesData;
}

function HeaderOptions({ content, data }: HeaderOptionsProps) {
  const { view, id } = content;
  // const { back } = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: builder.use().messages.remove,
    onError: () => {
      handleError({
        message: "An error occurred while deleting message, please try again",
      })();
      modals.close(MODALS.CONFIRMATION);
    },
    onSuccess: () => {
      handleSuccess({
        autoClose: 1200,
        message:
          view === MESSAGE_TYPE.OCCUPANT
            ? "Message deleted successfully"
            : "Broadcast deleted successfully",
      });
      modals.close(MODALS.CONFIRMATION);
    },
  });

  const handleDelete = () => {
    modals.open({
      children: (
        <ConfirmationModal
          withTwoButtons
          title={`Are you sure you want to delete this ${
            view === MESSAGE_TYPE.OCCUPANT ? "message" : "broadcast"
          }?`}
          src='delete'
          primaryBtnText='Yes, delete'
          secondaryBtnText='No'
          srcProps={{
            ml: 0,
          }}
          secondaryBtnProps={{
            disabled: isPending,
          }}
          primaryBtnProps={{
            color: "red",
            loading: isPending,
            disabled: isPending,
            onClick: () => mutate(id),
          }}
        />
      ),
      withCloseButton: false,
      modalId: MODALS.CONFIRMATION,
    });
  };

  return (
    <Flex gap={14} wrap='wrap' align='center' justify='center'>
      {view === MESSAGE_TYPE.OCCUPANT && data.isRead ? (
        <Button fz='sm' size='md' variant='outline' onClick={() => {}}>
          <Flex className='flex items-center gap-2'>
            <CurlyBackArrrow width={20} />
            <span className='hidden sm:inline'> Reply Message</span>
          </Flex>
        </Button>
      ) : (
        <Button
          fz='sm'
          size='md'
          variant='outline'
          onClick={() => editMessage(view, data)}
        >
          <Flex className='flex items-center gap-2'>
            <EditIcon width={18} />
            <span className='hidden sm:inline'> Edit Message</span>
          </Flex>
        </Button>
      )}

      <Button
        fz='sm'
        size='md'
        variant='outline'
        onClick={handleDelete}
        color='#CC0404'
      >
        <Flex className='flex items-center gap-2'>
          <TrashIcon width={18} />
          <span className='hidden sm:inline'>Delete</span>
        </Flex>
      </Button>
    </Flex>
  );
}
