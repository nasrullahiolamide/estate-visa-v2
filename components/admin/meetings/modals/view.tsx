"use client";

import { FlowContainer } from "@/components/layout";
import {
  Divider,
  Drawer,
  ScrollAreaAutosize,
  Stack,
  Title,
} from "@mantine/core";

interface ViewMeetingProps {
  open: boolean;
  close: () => void;
}
export function ViewMeeting({ open, close }: ViewMeetingProps) {
  return (
    <Drawer
      scrollAreaComponent={ScrollAreaAutosize}
      title='Shedule meeting'
      onClose={close}
      opened={open}
    >
      <FlowContainer
        className='bg-primary-background-white sm:overflow-scroll'
        type='plain'
        bg='white'
        h={{
          base: "auto",
          sm: 720,
        }}
      >
        <Stack gap='lg'>
          <Title order={2} c='plum.5' fz={20} fw={500}>
            Meeting Details
          </Title>
        </Stack>
        <Divider my={30} />
        <Stack gap='lg'>{/* <Markdown content={meeting?.note} /> */}</Stack>
      </FlowContainer>
    </Drawer>
  );
}
