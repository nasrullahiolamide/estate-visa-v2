import clsx from "clsx";

import { FlowContainer } from "@/components/layout";
import { ClockIcon } from "@/icons";
import { Stack, Title, Flex, Text } from "@mantine/core";
import { MessagesData } from "@/builders/types/messages";
import { Attachments } from "@/components/shared/chat/attachments";
import { MESSAGE_TYPE } from "@/components/shared/chat/types";

interface MessageContentProps {
  view: string;
  skeleton: boolean;
  data: MessagesData | undefined;
}

export function MessageContent({ view, skeleton, data }: MessageContentProps) {
  return (
    <Stack className='w-full h-full p-5 sm:p-7'>
      <div className='space-y-2'>
        <Title
          order={2}
          fz={16}
          className={clsx({
            skeleton,
          })}
        >
          {view === MESSAGE_TYPE.OCCUPANT && data?.tag === "sent"
            ? "From:"
            : "To:"}{" "}
          <span>
            {view === MESSAGE_TYPE.OCCUPANT
              ? data?.house.houseNumber
              : "All Houses"}
          </span>
        </Title>
        <Flex
          align='center'
          gap={4}
          className={clsx({
            skeleton,
          })}
        >
          <ClockIcon width={14} height={14} />
          <Text className='text-gray-300 space-x-1' fz={12}>
            <span>{data?.localDate}</span>
            <span>at</span>
            <span className='uppercase'>{data?.localTime}</span>
          </Text>
        </Flex>
      </div>

      <Stack>
        <Title
          order={2}
          c='plum.5'
          fz={20}
          fw={500}
          className={clsx({
            skeleton,
          })}
        >
          {data?.subject}
        </Title>

        <FlowContainer p={20} mah={430} mih={430} skeleton={skeleton}>
          <Text>{data?.content}</Text>
        </FlowContainer>
      </Stack>

      {data?.attachments ? (
        <Stack
          gap={6}
          className={clsx({
            skeleton,
          })}
        >
          <Title order={2} c='plum.5' fz={20} fw={500}>
            Attachments
          </Title>
          <Attachments url={""} />
        </Stack>
      ) : null}
    </Stack>
  );
}
