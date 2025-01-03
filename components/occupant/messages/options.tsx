"use client";

import { builder } from "@/builders";
import { MessagesData } from "@/builders/types/messages";
import { MESSAGE_TYPE } from "@/components/shared/chat/types";
import { ConfirmationModal } from "@/components/shared/interface";
import { CurlyBackArrrow, TrashIcon } from "@/icons";
import { MODALS } from "@/packages/libraries";
import { handleError, handleSuccess } from "@/packages/notification";
import { Button, Flex } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ReplyModal } from "./reply";

interface HeaderOptionsProps {
  data: MessagesData;
  view: string;
}

const replyMessage = (data: MessagesData) => {
  modals.open({
    title: "Reply Message",
    modalId: MODALS.REPLY_MESSAGE,
    children: <ReplyModal content={data} />,
  });
};

export function HeaderOptions({ data, view }: HeaderOptionsProps) {
  const { back } = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: builder.$use.messages.remove,
    onError: () => {
      handleError(
        `An error occurred while deleting ${
          view === MESSAGE_TYPE.OCCUPANT ? "message" : "broadcast"
        }, please try again`
      )();
      modals.close(MODALS.CONFIRMATION);
    },
    onSuccess: () => {
      handleSuccess(
        `${
          view === MESSAGE_TYPE.OCCUPANT ? "Message" : "Broadcast"
        } Deleted Successfully`,
        { autoClose: 1200 }
      );
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
          }`}
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
      {view === MESSAGE_TYPE.OCCUPANT && (
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
          <span className='hidden sm:inline'>
            Delete
            {view === MESSAGE_TYPE.OCCUPANT ? " Message" : " Broadcast"}
          </span>
        </Flex>
      </Button>
    </Flex>
  );
}
