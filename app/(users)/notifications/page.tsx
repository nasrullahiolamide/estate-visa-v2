import { FlowContainer } from "@/components/layout";
import { EmptySlot } from "@/components/shared/interface";
import { AppShellHeader } from "@mantine/core";
import { Fragment } from "react";

export default function Notifications() {
  return (
    <Fragment>
      <AppShellHeader title='Notifications' />
      <FlowContainer type='plain' className='lg:~p-1/8'>
        <EmptySlot
          title='No notifications yet'
          src='no-talk'
          text='Stay tuned for updates'
        />
      </FlowContainer>
    </Fragment>
  );
}
