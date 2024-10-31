import { Box, Flex, Stack, Text, Title } from "@mantine/core";
import Link from "next/link";

import { StatItem } from "../../data/statistics";

interface StatisticsCardProps extends StatItem {}

export function StatisticsCard({
  icon: Icon,
  value,
  total,
  label,
  title,
  href,
}: StatisticsCardProps) {
  return (
    <Stack
      component='article'
      bg='white'
      p={24}
      className='rounded-lg shadow-md flex flex-col items-start'
    >
      <Box
        bg='blue.7'
        c='white'
        p={18}
        className='rounded-full'
        component='figure'
      >
        <Icon height={30} width={30} />
      </Box>
      <Flex align='flex-end' justify='space-between' className='w-full'>
        <Title component='h3' order={3} className='prose-lg/medium text-end'>
          {title}
        </Title>
        <Text fz={40} fw={500}>
          {value}
          {total && (
            <Text span fw={500} fz={24} c='gray.7'>
              /{total}
            </Text>
          )}
        </Text>
      </Flex>
      {href && (
        <Link href={href} className='text-accent-6 text-sm mt-auto underline'>
          {label}
        </Link>
      )}
    </Stack>
  );
}
