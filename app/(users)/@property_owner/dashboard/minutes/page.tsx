"use client";

import { Fragment } from "react";
import { Flex, Button, Title, Stack, Text, Center, Box } from "@mantine/core";

import { makePath, PAGES } from "@/packages/libraries";
import { AppShellHeader } from "@/components/admin/shared";
import { EmptySlot } from "@/components/shared/interface";

import {
  FlowContainer,
  FlowContentHorizontal,
  FlowEntriesPerPage,
  FlowFloatingButtons,
  FlowFooter,
  FlowPagination,
} from "@/components/layout";

import { filterOptions } from "@/components/occupant/meetings/table";
import { FilterDropdown } from "@/components/shared/interface/dropdowns";
import { DownloadIcon } from "@/icons";
import { SheduleMeeting } from "@/components/admin/meetings/modals/shedule";
import { useDisclosure } from "@mantine/hooks";

export default function MeetingMinutes() {
  const [opened, { open: openDrawer, close: closeDrawer }] =
    useDisclosure(false);

  return (
    <Fragment>
      <AppShellHeader
        title='Meetings Minutes'
        backHref={makePath(PAGES.DASHBOARD)}
        showLinks={false}
        options={<HeaderOptions />}
      />
      <FlowContainer
        type='plain'
        justify='space-between'
        className='lg:~p-1/8 bg-primary-text-normal bg-opacity-45'
      >
        <Fragment>
          <Stack className='overflow-auto h-full max-h-[720px] lg:max-h-[665px]'>
            {true ? (
              <FlowContentHorizontal className='p-4 sm:p-0'>
                {Array.from({ length: 18 }).map((_, i) => (
                  <FlowContainer
                    p={24}
                    gap={30}
                    h={230}
                    type='plain'
                    bg='white'
                    className='rounded-xl'
                  >
                    <Flex justify='space-between' align='center'>
                      <Stack gap={6}>
                        <Title order={2} fw={500}>
                          Meeting Minutes
                        </Title>
                        <Text fz={14}>21st of Aug., 2024 at 10:00 AM</Text>
                      </Stack>
                      <Flex
                        justify='center'
                        align='center'
                        w={40}
                        h={40}
                        className='rounded-full border border-blue-7 cursor-pointer hover:bg-blue-1 hover:bg-opacity-50'
                      >
                        <DownloadIcon color='var(--blue-7)' />
                      </Flex>
                    </Flex>
                    <Text lineClamp={3}>
                      Discussion on the current sanitation protocols and hygiene
                      practices within the estate.
                    </Text>
                    <Text
                      c='blue.7'
                      className='underline cursor-pointer'
                      mt={10}
                      onClick={openDrawer}
                    >
                      View Details
                    </Text>
                  </FlowContainer>
                ))}
              </FlowContentHorizontal>
            ) : (
              <EmptySlot
                title='No meetings scheduled yet. Check back soon for upcoming events!'
                src='meeting'
              />
            )}
          </Stack>

          <FlowFooter className='lg:rounded-b-2xl bg-white justify-between sm:mt-2'>
            <FlowPagination />
            <FlowEntriesPerPage />
          </FlowFooter>
        </Fragment>
        <FlowFloatingButtons
          buttons={[{ icon: "filter", filterData: filterOptions }]}
        />
        {/* <SheduleMeeting open={opened} close={closeDrawer} /> */}
      </FlowContainer>
    </Fragment>
  );
}

function HeaderOptions() {
  return (
    <Flex gap={14} wrap='wrap'>
      <FilterDropdown label='Filter' data={filterOptions} />
    </Flex>
  );
}
