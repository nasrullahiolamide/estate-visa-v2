import clsx from "clsx";

import { FlowContainer } from "@/components/layout";
import { ClockIcon } from "@/icons";
import { Stack, Title, Flex, Text } from "@mantine/core";
import { MessagesData } from "@/builders/types/messages";
import { Attachments } from "@/components/shared/chat/attachments";
import { TIME_FORMAT } from "@/packages/constants/time";
import { formatDate } from "@/packages/libraries";

interface MessageContentProps {
  skeleton: boolean;
  data: MessagesData;
  recipient: string;
  isAdmin?: boolean;
}

export function MessageContent({
  skeleton,
  data,
  recipient,
  isAdmin = false,
}: MessageContentProps) {
  const localDate = formatDate(data?.updatedAt, "MM/DD/YYYY");
  const localTime = formatDate(data?.updatedAt, TIME_FORMAT);

  // const recipient = data?.tag === "inbox" ? "Admin" : "All Houses";

  return (
    <Stack className='w-full' gap={0} component='article'>
      <Stack className='p-5 sm:p-7'>
        <div className='space-y-2'>
          <Title
            order={2}
            fz={16}
            className={clsx({
              skeleton,
            })}
          >
            {data?.tag === "inbox" ? "From:" : "To:"} <span>{recipient}</span>
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
              <span>{localDate}</span>
              <span>at</span>
              <span className='uppercase'>{localTime}</span>
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

          <FlowContainer p={20} mah={430} mih={150} skeleton={skeleton}>
            <Text>{data?.content}</Text>
          </FlowContainer>
        </Stack>

        {data?.attachments && (
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
        )}
      </Stack>
      {data?.responses && (
        <Stack gap={0} className='sm:pl-5'>
          {data?.responses
            .sort(
              (a, b) =>
                new Date(a.updatedAt).getTime() -
                new Date(b.updatedAt).getTime()
            )
            .map((response) => (
              <MessageContent
                key={response.id}
                skeleton={skeleton}
                data={response}
                recipient={recipient}
              />
            ))}
        </Stack>
      )}
    </Stack>
  );
}
