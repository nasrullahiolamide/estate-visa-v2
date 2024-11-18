"use client";

import clsx from "clsx";
import Link from "next/link";
import { Fragment } from "react";
import { Flex, Stack, Text } from "@mantine/core";

import { makePath, PAGES } from "@/packages/libraries";
import { useMessagesValue } from "@/packages/hooks/use-messages-value";

import { AppShellHeader } from "@/components/shared/interface/app-shell";
import { FilterDropdown } from "@/components/shared/interface/dropdowns/filter";
import { FlowContainer } from "@/components/layout/flow-container";
import { FlowContentContainer } from "@/components/layout/flow-content-container";
import { ClockIcon } from "@/icons";
import {
  FlowEntriesPerPage,
  FlowFooter,
  FlowPagination,
} from "@/components/layout";

export default function NoticeBoard() {
  const { setContent } = useMessagesValue();

  return (
    <Fragment>
      <AppShellHeader title='Notice Board' options={<HeaderOptions />} />
      <FlowContainer type='plain' justify='space-between' className='lg:~p-1/8'>
        <FlowContentContainer
          mah={665}
          classNames={{
            root: "rounded-none bg-white",
          }}
        >
          {Array.from({ length: 10 }).map((_, i) => {
            const viewLink = setContent({
              id: i.toString(),
              view: "broadcast",
            });
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

                <Stack className='flex-grow py-4 sm:px-4' gap={12}>
                  <Text fw={500} fz={14}>
                    Content
                  </Text>
                  <Text lineClamp={2} fz={14} c='gray.8'>
                    Lorem ipsum dolor sit amet consectetur. Semper id lacus
                    pretium tellus feugiat pretium tellus. Lorem ipsum dolor sit
                    amet consectetur. Semper id lacus pretium tellus feugiat
                    pretium tellus
                  </Text>

                  <Link
                    href={makePath(
                      PAGES.DASHBOARD,
                      PAGES.NOTICE_BOARD,
                      viewLink
                    )}
                    className='underline ml-auto text-blue-5 text-sm '
                  >
                    View More
                  </Link>
                </Stack>
              </Flex>
            );
          })}
        </FlowContentContainer>
        <FlowFooter
          className={clsx(
            "flex bg-white justify-between lg:rounded-b-2xl mt-2",
            {
              hidden: false,
            }
          )}
        >
          <FlowPagination />
          <FlowEntriesPerPage />
        </FlowFooter>
      </FlowContainer>
    </Fragment>
  );
}

function HeaderOptions() {
  return (
    <Flex gap={14} wrap='wrap'>
      <FilterDropdown
        label='Filter'
        data={[
          { label: "Recently Added", value: "recent" },
          { label: "Street Name(A-Z)", value: "a-z" },
          { label: "Street Name(Z-A)", value: "z-a" },
          { label: "Date", value: "date" },
        ]}
      />
    </Flex>
  );
}
