import { Flex, Avatar, Stack, Text } from "@mantine/core";

interface NotificationItemProps {
  user: { name: string; avatar: string | null };
  message: string;
  time: string;
}

export function NotificationItem({
  user,
  message,
  time,
}: NotificationItemProps) {
  return (
    <Flex
      flex={1}
      gap={18}
      wrap='nowrap'
      align='center'
      className='border-t border-gray-2 h-full '
      py={16}
    >
      {user.avatar ? (
        <Avatar src={user.avatar} radius='xl' size={45} />
      ) : (
        <Avatar color='blue.4' radius='xl' size={45}>
          {user.name[0]}
        </Avatar>
      )}
      <Stack gap={4}>
        <Text fz={14}>
          <Text fw={500} span>
            {user.name}
          </Text>{" "}
          {message}
        </Text>
        <Text fz={12} c='gray'>
          {time}
        </Text>
      </Stack>
    </Flex>
  );
}
