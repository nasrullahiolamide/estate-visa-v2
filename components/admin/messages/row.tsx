import {
  FlowMenu,
  FlowMenuDropdown,
  FlowMenuTarget,
} from "@/components/layout";
import { ArrowBack, ClockIcon } from "@/svgs";
import { Checkbox, Flex, Menu, Stack, Text } from "@mantine/core";

interface MeertingRowProps {
  status: "inbox" | "sent";
  label: string;
  title: string;
  description: string;
  date: string;
}

export function MeertingRow({ status }: MeertingRowProps) {
  return (
    <Flex align='center' className='flex items-center border-b py-4 px-6'>
      <Flex gap={18}>
        <Checkbox />
        {status === "sent" ? (
          <ArrowBack className='text-red-500 rotate-180' />
        ) : (
          <ArrowBack className='text-green-500' />
        )}
        <Text fw={700} fz={24}>
          H10
        </Text>
      </Flex>

      <Stack className='flex-grow'>
        <Text lineClamp={2}>
          <span className='font-bold mr-2'></span>
          <span className='font-semibold text-gray-800'>
            Meeting Minutes Review. Lorem ipsum dolor sit amet consectetur.
            Semper id lacus pretium tellus feugiat pretium tellus. Lorem ipsum
            dolor sit amet consectetur. Semper id lacus pretium tellus feugiat
            pretium tellus
          </span>
        </Text>
        <Flex>
          <ClockIcon width={16} height={16} />
          <Text className='text-gray-500'>
            <span></span>
            <span>at</span>
            <span></span>
          </Text>
        </Flex>
      </Stack>

      <FlowMenu>
        <FlowMenuTarget />
        <FlowMenuDropdown>
          <Menu.Item>View</Menu.Item>
        </FlowMenuDropdown>
      </FlowMenu>
    </Flex>
  );
}
