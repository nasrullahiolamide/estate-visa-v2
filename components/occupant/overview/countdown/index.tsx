"use client";

import clsx from "clsx";
import { toString } from "lodash";
import dayjs, { ManipulateType } from "dayjs";
import Countdown, { CountdownRendererFn } from "react-countdown";
import { Button, Stack, StackProps, Text, Title } from "@mantine/core";

import { TimePad } from "./time-pad";
import { FlowContainer } from "@/components/layout";
import { formatDate } from "@/packages/libraries";
import { HouseData } from "@/builders/types/houses";

interface CountDownProps extends StackProps {
  house: HouseData | undefined;
  skeleton?: boolean;
}

function calculateDeadline(validityPeriod: string): Date {
  const [value, unit] = validityPeriod.split(" ");
  const duration = parseInt(value, 10);

  if (isNaN(duration)) throw new Error("Invalid validity period format.");

  const deadline = dayjs()
    .add(duration, unit as ManipulateType)
    .set("hour", 21)
    .set("minute", 0)
    .set("second", 0);

  return new Date(deadline.format("MMMM DD, YYYY HH:mm:ss"));
}

const renderer: CountdownRendererFn = ({ days, hours, minutes, seconds }) => {
  const years = Math.floor(days / 365);
  const months = Math.floor((days % 365) / 30);
  const weeks = Math.floor((days % 365) / 7);
  const remainingDays = days % 365;

  if (years > 0 || months > 0 || weeks > 0) {
    return (
      <div
        className={clsx(
          "flex flex-wrap items-center justify-center gap-3 sm:gap-5 ",
          "clump:text-[clamp(4rem,6vw,5rem)] text-6xl"
        )}
      >
        <TimePad moment={years} period='Year(s)' />
        <TimePad moment={months} period='Month(s)' />
        <TimePad moment={weeks} period='Week(s)' />
        <TimePad moment={remainingDays} period='Day(s)' />
      </div>
    );
  }
  return (
    <div
      className={clsx(
        "flex flex-wrap items-center justify-center gap-3 sm:gap-5 ",
        "clump:text-[clamp(4rem,6vw,5rem)] text-6xl"
      )}
    >
      <TimePad moment={remainingDays} period='Day(s)' />
      <TimePad moment={hours} period='Hour(s)' />
      <TimePad moment={minutes} period='Minute(s)' />
      <TimePad moment={seconds} period='Second(s)' />
    </div>
  );
};

export function CountDown({ house, skeleton, ...props }: CountDownProps) {
  const deadline = calculateDeadline(toString(house?.validityPeriod));
  let millisecondsTillDeadline = Date.parse(toString(deadline));

  return (
    <FlowContainer
      py={84}
      px={16}
      type='plain'
      gap={15}
      bg='white'
      {...props}
      className={clsx({ skeleton })}
    >
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
