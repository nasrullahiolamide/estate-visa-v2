"use client";

import { HouseCodeValidator } from "@/components/gateman/house-validator";
import { FlowContainer, FlowContentContainer } from "@/components/layout";
import { AppShellHeader } from "@/components/shared/interface/app-shell";
import { Stack } from "@mantine/core";
import { Fragment } from "react";

export default function HouseValidator() {
  return (
    <Fragment>
      <AppShellHeader title='House Validation' withSearch={false} />

      <FlowContainer type='plain' className='lg:~p-1/8 h-full'>
        <FlowContentContainer
          classNames={{
            root: "rounded-none lg:rounded-2xl bg-primary-background-white",
          }}
        >
          <Stack
            gap={24}
            className='items-center justify-center min-h-[calc(100vh-200px)]'
          >
            <HouseCodeValidator />
          </Stack>
        </FlowContentContainer>
      </FlowContainer>
    </Fragment>
  );
}
