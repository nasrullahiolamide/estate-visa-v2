"use client";

import { useQuery } from "@tanstack/react-query";
import { builder } from "@/builders";
import { FlowContainer } from "@/components/layout";
import { Markdown } from "@/components/shared/markdown";
import {
  Divider,
  Drawer,
  Flex,
  ScrollAreaAutosize,
  Stack,
  Title,
  Text,
  Center,
} from "@mantine/core";
import { Fragment } from "react";
import { formatDate } from "@/packages/libraries";
import { DATE_FORMAT } from "@/packages/constants/time";
import { DownloadIcon, FileIcon } from "@/icons";

interface ViewMeetingProps {
  id: string;
  open: boolean;
  close: () => void;
}
export function ViewMeeting({ open, close, id }: ViewMeetingProps) {
  const { data, isLoading } = useQuery({
    queryKey: builder.meetings.get.id.get(),
    queryFn: () => builder.use().meetings.get.id(id),
    select: (data) => data,
  });

  return (
    <Drawer
      scrollAreaComponent={ScrollAreaAutosize}
      title='Meeting Minutes'
      onClose={close}
      opened={open}
    >
      <Stack gap='lg'>
        <Flex align='center' gap={24}>
          <Title order={2} c='plum.5' fz={20} fw={500}>
            Meeting Title
          </Title>
          <Text fw={500}>{data?.title}</Text>
        </Flex>
        <Flex align='center' gap={24}>
          <Title order={2} c='plum.5' fz={20} fw={500}>
            Meeting Details
          </Title>
          <Text fw={500}>
            {formatDate(data?.date, DATE_FORMAT)} at {data?.time},{" "}
            {data?.platform ?? `${data?.platform} &`}
            {data?.venue}
          </Text>
        </Flex>
      </Stack>
      <Divider my={30} />
      <FlowContainer
        className='bg-primary-background-white sm:overflow-scroll'
        type='plain'
        bg='white'
        h={520}
      >
        <Markdown children={data?.minutes} />
      </FlowContainer>

      {data?.file && (
        <Fragment>
          <Divider my={30} />
          <Stack gap='lg'>
            <Title order={2} c='plum.5' fz={20} fw={500}>
              Attachments
            </Title>

            <Stack
              gap={3}
              p={12}
              className='border rounded-xl border-primary-border-light'
            >
              <Flex gap={30} align='center' justify='space-between'>
                <Flex align='center' gap={8}>
                  <Center
                    p={6}
                    c='gray.12'
                    className='border-4 rounded-full border-accent-2 size-8'
                  >
                    <FileIcon />
                  </Center>

                  <Text fz={14} className='text-primary-text-body'>
                    Sanitation_Review.pdf
                  </Text>
                </Flex>
                <DownloadIcon width={20} className='cursor-pointer' />
              </Flex>
            </Stack>
          </Stack>
        </Fragment>
      )}
    </Drawer>
  );
}
