"use client";

import { builder } from "@/builders";
import { useFakeMeetingData } from "@/builders/types/meetings";
import { FlowContainer } from "@/components/layout";
import { Markdown } from "@/components/shared/markdown";
import { DownloadIcon, FileIcon } from "@/icons";
import { DATE_FORMAT } from "@/packages/constants/time";
import { formatDate } from "@/packages/libraries";
import { getDownloadableUrl } from "@/packages/libraries/formatters";
import {
  Center,
  Divider,
  Drawer,
  Flex,
  ScrollAreaAutosize,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { Fragment, useMemo } from "react";

interface ViewMeetingProps {
  id: string;
  open: boolean;
  close: () => void;
}
export function ViewMeeting({ open, close, id }: ViewMeetingProps) {
  const initialMeetingData = useMemo(() => useFakeMeetingData(), []);

  const { data, isPlaceholderData } = useQuery({
    queryKey: builder.meetings.get.id.$get(id),
    queryFn: () => builder.$use.meetings.get.id(id),
    placeholderData: initialMeetingData,
    select: (data) => data,
    enabled: open,
  });

  return (
    <Drawer
      scrollAreaComponent={ScrollAreaAutosize}
      title='Meeting Minutes'
      onClose={close}
      opened={open}
      classNames={{
        body: "my-4",
      }}
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
        className={clsx(
          "bg-primary-background-white sm:overflow-scroll h-full sm:h-[520px]",
          {
            skeleton: isPlaceholderData,
          }
        )}
        type='plain'
        bg='white'
      >
        <Markdown
          children={data?.minutes}
          classNames={{
            h1: "text-plum-5",
            h2: "text-plum-5",
            h3: "text-plum-5",
            p: "text-primary-text-body",
          }}
        />
      </FlowContainer>

      {data?.file && (
        <Fragment>
          <Divider my={30} />
          <Stack gap='lg' className={clsx({ skeleton: isPlaceholderData })}>
            <Title order={2} c='plum.5' fz={20} fw={500}>
              Attachments
            </Title>

            <Stack
              gap={3}
              p={12}
              className={clsx("border rounded-xl border-primary-border-light", {
                skeleton: isPlaceholderData,
              })}
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
                <a
                  href={!isPlaceholderData ? getDownloadableUrl(data.file) : ""}
                  download={true}
                >
                  <DownloadIcon width={20} className='cursor-pointer' />
                </a>
              </Flex>
            </Stack>
          </Stack>
        </Fragment>
      )}
    </Drawer>
  );
}
