import {
  FlowContentContainer,
  FlowMenu,
  FlowMenuDropdown,
  FlowMenuTarget,
} from "@/components/layout";
import {
  ArrowBack,
  ClockIcon,
  DoubleMarkIcon,
  EditIcon,
  TrashIcon,
} from "@/icons";
import { useMessagesValue } from "@/packages/hooks/use-messages-value";
import { Checkbox, Flex, Menu, Stack, Text } from "@mantine/core";

export function OccupantMessages() {
  const { setContent } = useMessagesValue();

  return (
    <FlowContentContainer mah={680}>
      {Array.from({ length: 10 }).map((_, i) => {
        const viewLink = setContent({ id: i.toString(), view: "broadcast" });
        return (
          <Flex
            key={i}
            align='center'
            className='flex items-center border-b border-b-gray-3 py-4 px-4 lg:px-8 gap-2'
            mih={130}
          >
            <Flex gap={12} align='center' miw={110} w={350}>
              <Checkbox size='xs' />
              {true ? (
                <ArrowBack width={14} className='text-red-5 rotate-90' />
              ) : (
                <ArrowBack className='text-green-5' />
              )}
              <Text className='prose-base/bold sm:prose-lg/semi-bold'>H10</Text>
            </Flex>

            <Stack className='flex-grow' gap={12}>
              <Text lineClamp={2} fz={14}>
                <span className='font-bold mr-1'>Meeting Minutes Review.</span>
                <span className='text-gray-800'>
                  Lorem ipsum dolor sit amet consectetur. Semper id lacus
                  pretium tellus feugiat pretium tellus. Lorem ipsum dolor sit
                  amet consectetur. Semper id lacus pretium tellus feugiat
                  pretium tellus
                </span>
              </Text>
              <Flex align='center' gap={4}>
                <ClockIcon width={14} height={14} />
                <Text className='text-gray-300 space-x-1' fz={12}>
                  <span>24/07/2024</span>
                  <span>at</span>
                  <span>9:00AM</span>
                </Text>
              </Flex>
            </Stack>

            <FlowMenu position='bottom-end'>
              <FlowMenuTarget />
              <FlowMenuDropdown>
                <Menu.Item leftSection={<DoubleMarkIcon width={14} />}>
                  Mark as read
                </Menu.Item>
                <Menu.Item leftSection={<EditIcon width={14} />}>
                  Edit
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item
                  color='#CC0404'
                  leftSection={<TrashIcon width={15} />}
                >
                  Delete
                </Menu.Item>
              </FlowMenuDropdown>
            </FlowMenu>
          </Flex>
        );
      })}
    </FlowContentContainer>
  );
}
