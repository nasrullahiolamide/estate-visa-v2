"use client";

import { Fragment, useEffect } from "react";
import { Flex, Button } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useMutation, useQuery } from "@tanstack/react-query";
import { builder } from "@/builders";
import { MessagesData, useFakeMessagesData } from "@/builders/types/messages";
import { handleError, handleSuccess } from "@/packages/notification";
import { formatDate, makePath, MODALS, PAGES } from "@/packages/libraries";
import { AppShellHeader } from "@/components/admin/shared";
import { ConfirmationModal, EmptySlot } from "@/components/shared/interface";
import { AddIcon, CurlyBackArrrow, EditIcon, TrashIcon } from "@/icons";

import {
  FlowContainer,
  FlowContentContainer,
  FlowPaper,
} from "@/components/layout";
import {
  MessagesValue,
  useMessagesValue,
} from "@/packages/hooks/use-messages-value";
import { WriteModal } from "@/components/admin/messages/write";
import { EditModal } from "@/components/admin/messages/edit";
import { useRouter } from "next/navigation";
import { MESSAGE_TYPE } from "@/components/shared/chat/types";
import { useListState } from "@mantine/hooks";
import { MessageContent } from "@/components/shared/chat/messages/content";
import { ReplyModal } from "@/components/admin/messages/reply";
import { TIME_FORMAT } from "@/packages/constants/time";

interface PageProps {
  params: {
    content: string;
  };
}

const writeMessage = (view: string) => {
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
  const { content } = useMessagesValue(params.content);
  const initialMessageData = useFakeMessagesData();

  const { data = [], isPlaceholderData } = useQuery({
    queryKey: builder.messages.get.id.get(content.id),
    queryFn: () => builder.use().messages.get.id(content.id),
    placeholderData: Array.from({ length: 1 }, (_, i) => initialMessageData),
    select: (data) =>
      data.map((item) => {
        const localDate = formatDate(item?.updatedAt, "MM/DD/YYYY");
        const localTime = formatDate(item?.updatedAt, TIME_FORMAT);

        return {
          ...item,
          localDate,
          localTime,
        };
      }),
  });

  const recipient =
    content.view === MESSAGE_TYPE.OCCUPANT
      ? data.at(0)?.parent?.house?.houseNumber ??
        data.at(0)?.house?.houseNumber ??
        ""
      : "All houses";

  return (
    <Fragment>
      <AppShellHeader
        title='Message Details'
        backHref={makePath(PAGES.DASHBOARD, PAGES.MESSAGES)}
        showLinks={false}
        options={
          <HeaderOptions
            content={{ view: content.view, id: content.id }}
            data={data.at(0) as MessagesData}
            hidden={isPlaceholderData || !data.length}
          />
        }
      />
      <FlowContainer type='plain' className='lg:~p-1/8'>
        <FlowContentContainer
          classNames={{
            root: "rounded-none lg:rounded-2xl bg-white",
          }}
        >
          <FlowPaper>
            {data.length ? (
              <MessageContent
                isAdmin
                isResponse={data.at(0)?.parent && true}
                data={data.at(0) as MessagesData}
                skeleton={isPlaceholderData}
                recipient={recipient}
              />
            ) : (
              <EmptySlot
                title='Message not found. Start a conversation to stay connected!'
                src='no-talk'
                withButton
                text={
                  content.view === MESSAGE_TYPE.OCCUPANT
                    ? "Write Message"
                    : "Send a Broadcast"
                }
                btnProps={{
                  leftSection: <AddIcon />,
                  onClick: () => writeMessage(content.view),
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
  hidden: boolean;
}

function HeaderOptions({ content, data, hidden }: HeaderOptionsProps) {
  const { view, id } = content;
  const { back } = useRouter();

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
      back();
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

  const replyMessage = () => {
    modals.open({
      title: "Reply Message",
      modalId: MODALS.WRTIE_MESSAGE,
      children: <ReplyModal content={data} />,
    });
  };

  return (
    <Flex gap={14} wrap='wrap' align='center' justify='center' hidden={hidden}>
      {(view === MESSAGE_TYPE.OCCUPANT && data?.responses.length) ||
      data.parent ? (
        <Button fz='sm' size='md' variant='outline' onClick={replyMessage}>
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
