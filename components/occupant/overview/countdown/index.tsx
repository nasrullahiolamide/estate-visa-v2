"use client";

import clsx from "clsx";
import Countdown, { CountdownRendererFn } from "react-countdown";
import { Button, Stack, Text, Title } from "@mantine/core";

import { TimePad } from "./time-pad";
import { FlowContainer } from "@/components/layout";
import { formatDate } from "@/packages/libraries";

const renderer: CountdownRendererFn = ({ days, hours, minutes, seconds }) => {
  return (
    <div
      className={clsx(
        "flex flex-wrap items-center justify-center gap-3 sm:gap-5 ",
        "clump:text-[clamp(4rem,6vw,5rem)] text-6xl"
      )}
    >
      <TimePad moment={days} period='Days' />
      <TimePad moment={hours} period='Hours' />
      <TimePad moment={minutes} period='Minutes' />
      <TimePad moment={seconds} period='Seconds' />
    </div>
  );
};

export function CountDown({ ...props }) {
  const deadline = new Date("November 24, 2024 22:00:00");
  let millisecondsTillDeadline = Date.parse(String(deadline));

  return (
    <FlowContainer py={84} px={16} type='plain' gap={15} {...props} bg='white'>
      <Title
        order={2}
        fw={600}
        ta='center'
        mb={24}
        className='clump:text-[clamp(4rem,6vw,5rem)] text-2xl'
      >
        Subscription Validty
      </Title>
      <Countdown renderer={renderer} date={millisecondsTillDeadline} />
      <Stack mx='auto' mt={24} gap={24} ta='center' px={24}>
        {millisecondsTillDeadline > Date.now() ? (
          <Text c='gray.8'>
            Renew subscription by {formatDate(deadline, "LL")}.
          </Text>
        ) : (
          <Text c='red.8'>
            Your subscription has expired since {formatDate(deadline, "LL")}.
          </Text>
        )}
        <Button>Renew Now</Button>
      </Stack>
    </FlowContainer>
  );
}
