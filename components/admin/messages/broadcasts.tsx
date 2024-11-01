import Link from "next/link";

import { Flex, Stack, Text } from "@mantine/core";
import { FlowContentContainer } from "@/components/layout";
import { useMessagesValue } from "@/packages/hooks/use-messages-value";
import { makePath, PAGES } from "@/packages/libraries";

import { ClockIcon } from "@/icons";

export function BroadcastMessages() {
  const { setContent } = useMessagesValue();

  return (
    <FlowContentContainer mah={680}>
      {Array.from({ length: 10 }).map((_, i) => {
        const viewLink = setContent({ id: i.toString(), view: "broadcast" });
        return (
          <Flex
            key={i}
            className='border-b border-b-gray-3 px-4 lg:px-8'
            mih={130}
            gap={18}
          >
            <Stack
              gap={8}
              miw={130}
              w={350}
              className='border-r border-r-gray-3 py-4 '
            >
              <Text fw={500} fz={14}>
                Water Supply Maintenance
              </Text>
              <Flex align='center' gap={4}>
                <ClockIcon width={14} height={14} />
                <Text className='text-gray-300 space-x-1' fz={12}>
                  <span>21st of Aug., 2024</span>
                  <span>at</span>
                  <span>9:00AM</span>
                </Text>
              </Flex>
            </Stack>

            <Stack className='flex-grow p-4' gap={12}>
              <Text fw={500} fz={14}>
                Content
              </Text>
              <Text lineClamp={2} fz={14} c='gray.8'>
                Lorem ipsum dolor sit amet consectetur. Semper id lacus pretium
                tellus feugiat pretium tellus. Lorem ipsum dolor sit amet
                consectetur. Semper id lacus pretium tellus feugiat pretium
                tellus
              </Text>

              <Link
                href={makePath(PAGES.DASHBOARD, PAGES.MESSAGES, viewLink)}
                className='underline ml-auto text-blue-5 text-sm '
              >
                View More
              </Link>
            </Stack>
          </Flex>
        );
      })}
    </FlowContentContainer>
  );
}
