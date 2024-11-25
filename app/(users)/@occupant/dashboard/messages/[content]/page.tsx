"use client";

import { useRouter } from "next/navigation";
import { Fragment, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { modals } from "@mantine/modals";
import { useListState } from "@mantine/hooks";
import { Flex, Button } from "@mantine/core";
import { builder } from "@/builders";
import { MessagesData, useFakeMessagesData } from "@/builders/types/messages";
import { TIME_FORMAT } from "@/packages/constants/time";
import { handleError, handleSuccess } from "@/packages/notification";
import { formatDate, makePath, MODALS, PAGES } from "@/packages/libraries";
import { ConfirmationModal, EmptySlot } from "@/components/shared/interface";
import { AppShellHeader } from "@/components/admin/shared";
import { MessageContent } from "@/components/admin/messages/cards/content";
import { AddIcon, CurlyBackArrrow, EditIcon, TrashIcon } from "@/icons";
import {
  FlowContainer,
  FlowContentContainer,
  FlowPaper,
} from "@/components/layout";
import { WriteModal } from "@/components/admin/messages/modals/write";
import { EditModal } from "@/components/admin/messages/modals/edit";
import { MESSAGE_TYPE } from "@/components/admin/messages/enums";

interface PageProps {
  params: {
    content: string;
  };
}

const writeMessage = (view: string) => {
  modals.open({
    title: "Write Message",
    modalId: MODALS.WRITE_BROADCAST_MESSAGE,
    children: <WriteModal view={view} />,
  });
};

const editMessage = (view: string, data: MessagesData) => {
  modals.open({
    title: "Edit Message",
    modalId: MODALS.EDIT_MESSAGE,
    children: <EditModal view={view} content={data} />,
  });
};

export default function Page({ params }: PageProps) {
  const contentId = params.content;
  const [state, handlers] = useListState<MessagesData>([]);
  const initialMessageData = useFakeMessagesData();

  const {
    data = [],
    isPlaceholderData,
    isFetching,
  } = useQuery({
    queryKey: builder.messages.get.id.get(contentId),
    queryFn: () => builder.use().messages.get.id(contentId),
    placeholderData: Array.from({ length: 1 }, () => initialMessageData),
    select: (data) =>
      data.map((item) => {
        const localDate = formatDate(item?.updatedAt, "MM/DD/YYYY");
        const localTime = formatDate(item?.updatedAt, TIME_FORMAT);
        return { ...item, localDate, localTime };
      }),
  });

  useEffect(() => {
    handlers.setState(data);
  }, [isFetching]);

  return (
    <Fragment>
      <AppShellHeader
        title='Message Details'
        backHref={makePath(PAGES.DASHBOARD, PAGES.MESSAGES)}
        showLinks={false}
        options={<HeaderOptions data={state.at(0) as MessagesData} />}
      />
      <FlowContainer type='plain' className='lg:~p-1/8'>
        <FlowContentContainer
          classNames={{
            root: "rounded-none lg:rounded-2xl bg-white",
          }}
        >
          <FlowPaper>
            {state ? (
              <MessageContent
                data={state.at(0)}
                skeleton={isPlaceholderData}
                view={MESSAGE_TYPE.OCCUPANT}
              />
            ) : (
              <EmptySlot
                title='Message not found. Start a conversation to stay connected!'
                src='no-talk'
                withButton
                text='Write Message'
                btnProps={{
                  leftSection: <AddIcon />,
                  onClick: () => writeMessage(MESSAGE_TYPE.OCCUPANT),
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
  data: MessagesData;
}

function HeaderOptions({ data }: HeaderOptionsProps) {
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
        message: "Message deleted successfully",
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
          title='Are you sure you want to delete this message'
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
            onClick: () => mutate(data.id),
          }}
        />
      ),
      withCloseButton: false,
      modalId: MODALS.CONFIRMATION,
    });
  };

  return (
    <Flex gap={14} wrap='wrap' align='center' justify='center' hidden={!data}>
      {data?.tag === "inbox" ? (
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
          onClick={() => editMessage(MESSAGE_TYPE.OCCUPANT, data)}
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
