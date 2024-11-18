import { Box, Flex, Stack, StackProps, Text, Title } from "@mantine/core";
import Link from "next/link";

import clsx from "clsx";
import { IconType } from "@/icons";

export type StatItem = {
  icon: IconType;
  title: string;
  value?: number;
  total?: number;
  label: string;
  href?: string;
};
interface StatisticsCardProps extends StatItem {
  skeleton?: boolean;
}

export function StatisticsCard({
  icon: Icon,
  value,
  total,
  label,
  title,
  href,
  skeleton,
}: StatisticsCardProps) {
  return (
    <Stack
      component='article'
      bg='white'
      p={24}
      className={clsx("rounded-lg shadow-md flex flex-col items-start", {
        skeleton: skeleton,
      })}
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
