"use client";

import clsx from "clsx";
import Countdown, { CountdownRendererFn } from "react-countdown";
import { Button, Stack, StackProps, Text, Title } from "@mantine/core";

import { TimePad } from "./time-pad";
import { FlowContainer } from "@/components/layout";
import { formatDate } from "@/packages/libraries";
import { HouseData } from "@/builders/types/houses";
import dayjs, { ManipulateType } from "dayjs";
import { Fragment } from "react";

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
  const months = Math.floor(days / 30);
  const remainingDays = days % 30;
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  const weeks = Math.floor(remainingDays / 7);
  const remainingDaysAfterWeeks = remainingDays % 7;
  console.log({
    years,
    months,
    remainingDays,
    hours,
    minutes,
    seconds,
  });

  if (years === 0 && months === 0) {
    return (
      <div
        className={clsx(
          "flex flex-wrap items-center justify-center gap-3 sm:gap-5 ",
          "clump:text-[clamp(4rem,6vw,5rem)] text-6xl"
        )}
      >
        <TimePad moment={remainingDays} period='Days' />
        <TimePad moment={hours} period='Hours' />
        <TimePad moment={minutes} period='Minutes' />
        <TimePad moment={seconds} period='Seconds' />
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
      {years > 0 && <TimePad moment={years} period='Years' />}
      {months > 0 && <TimePad moment={months} period='Months' />}
      <TimePad moment={remainingDays} period='Days' />
      <TimePad moment={hours} period='Hours' />
    </div>
  );
};

export function CountDown({ house, skeleton, ...props }: CountDownProps) {
  const deadline = calculateDeadline(house?.validityPeriod ?? "");

  console.log(deadline);
  let millisecondsTillDeadline = Date.parse(String(deadline));

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
