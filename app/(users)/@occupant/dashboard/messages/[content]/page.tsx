"use client";

import { useRouter } from "next/navigation";
import { Fragment, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { modals } from "@mantine/modals";
import { useListState } from "@mantine/hooks";
import { Flex, Button } from "@mantine/core";
import { builder } from "@/builders";
import { MessagesData, useFakeMessagesData } from "@/builders/types/messages";
import { handleError, handleSuccess } from "@/packages/notification";
import { makePath, MODALS, PAGES } from "@/packages/libraries";
import { ConfirmationModal, EmptySlot } from "@/components/shared/interface";
import { AppShellHeader } from "@/components/admin/shared";
import { CurlyBackArrrow, TrashIcon } from "@/icons";
import {
  FlowContainer,
  FlowContentContainer,
  FlowPaper,
} from "@/components/layout";
import { ReplyModal } from "@/components/occupant/messages/reply";
import { MessageContent } from "@/components/shared/chat/messages/content";
import { useMessagesValue } from "@/packages/hooks/use-messages-value";

interface PageProps {
  params: {
    content: string;
  };
}

const replyMessage = (data: MessagesData) => {
  modals.open({
    title: "Reply Message",
    modalId: MODALS.REPLY_MESSAGE,
    children: <ReplyModal content={data} />,
  });
};

export default function Page({ params }: PageProps) {
  const {
    content: { id },
  } = useMessagesValue(params.content);
  const [state, handlers] = useListState<MessagesData>([]);
  const initialMessageData = useFakeMessagesData();

  const {
    data = [],
    isPlaceholderData,
    isFetching,
  } = useQuery({
    queryKey: builder.messages.get.id.get(id),
    queryFn: () => builder.use().messages.get.id(id),
    placeholderData: Array.from({ length: 1 }, () => initialMessageData),
    select: (data) => data,
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
          <FlowPaper
            containerProps={{
              my: 20,
            }}
          >
            {state ? (
              <MessageContent
                data={state.at(0) as MessagesData}
                recipient='Admin'
                skeleton={isPlaceholderData}
              />
            ) : (
              <EmptySlot
                title='Message not found. This Message may have been deleted or does not exist'
                src='no-talk'
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
      <Button
        fz='sm'
        size='md'
        variant='outline'
        onClick={() => replyMessage(data)}
      >
        <Flex className='flex items-center gap-2'>
          <CurlyBackArrrow />
          <span className='hidden sm:inline'> Reply Message</span>
        </Flex>
      </Button>
      <Button
        fz='sm'
        size='md'
        variant='outline'
        onClick={handleDelete}
        color='#CC0404'
      >
        <Flex className='flex items-center gap-2'>
          <TrashIcon width={18} />
          <span className='hidden sm:inline'>Delete Message</span>
        </Flex>
      </Button>
    </Flex>
  );
}
