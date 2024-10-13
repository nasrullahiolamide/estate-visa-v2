import { Mark } from "@/svgs";
import { Flex, Text } from "@mantine/core";

const data = [
  "Access Request",
  "Service Request",
  "Market Place",
  "Residence Management",
];

export function Features() {
  return (
    <Flex
      className='border-t border-t-gray-4 py-8 lg:px-16 md:px-8 px-4 overflow-scroll w-full'
      gap={20}
    >
      {data.map((item, index) => (
        <Flex
          key={index}
          p={8}
          gap={12}
          className='min-w-fit'
          align='center'
          justify='center'
          c='blue.6'
          flex={1}
        >
          <Mark /> <Text className='prose-base sm:prose-lg'>{item}</Text>
        </Flex>
      ))}
    </Flex>
  );
}
