import { Box, Flex, Stack, StackProps, Text, Title } from "@mantine/core";
import Link from "next/link";

import clsx from "clsx";
import { IconType } from "@/icons";
import { pass } from "@/packages/libraries";

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
  const [numerator, denominator] = pass.string(value)?.split("/");

  return (
    <Flex
      p={24}
      align='center'
      justify='space-between'
      component='article'
      bg='white'
      className={clsx("rounded-lg shadow-md items-start w-full", {
        skeleton: skeleton,
      })}
    >
      <Stack>
        <Box
          bg='blue.7'
          c='white'
          p={18}
          className='rounded-full w-fit'
          component='figure'
        >
          <Icon height={30} width={30} />
        </Box>

        <Title component='h3' order={3} className='prose-lg/medium text-end'>
          {title}
        </Title>
        {href && (
          <Link href={href} className='text-accent-6 text-sm mt-auto underline'>
            {label}
          </Link>
        )}
      </Stack>
      <Text fz={40} fw={500}>
        {numerator}

        {denominator && (
          <Text span fw={500} fz={24} c='gray.7'>
            /{denominator}
          </Text>
        )}
      </Text>
    </Flex>
  );
}
