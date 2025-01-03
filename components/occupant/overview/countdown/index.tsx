"use client";

import { Button, Stack, StackProps, Text, Title } from "@mantine/core";
import clsx from "clsx";
import dayjs from "dayjs";
import Countdown, { CountdownRendererFn } from "react-countdown";

import { HouseData } from "@/builders/types/houses";
import { FlowContainer } from "@/components/layout";
import { calculateDeadline, formatDate } from "@/packages/libraries";
import { TimePad } from "./time-pad";

interface CountDownProps extends StackProps {
  house: HouseData | undefined;
  skeleton?: boolean;
}

let renderer: CountdownRendererFn = ({
  days,
  hours,
  minutes,
  seconds,
  total,
}) => {
  const now = dayjs();
  const targetDate = dayjs().add(total, "millisecond");

  const years = targetDate.diff(now, "year");
  const afterYears = now.add(years, "year");

  const months = targetDate.diff(afterYears, "month");
  const afterMonths = afterYears.add(months, "month");

  const weeks = targetDate.diff(afterMonths, "week");
  const afterWeeks = afterMonths.add(weeks, "week");

  const calc_days = targetDate.diff(afterWeeks, "day");

  if (months > 0 && weeks > 0) {
    return (
      <div
        className={clsx(
          "flex flex-wrap items-center justify-center gap-3 sm:gap-5 ",
          "clump:text-[clamp(4rem,6vw,5rem)] text-6xl"
        )}
      >
        {years > 0 && (
          <TimePad moment={years} period={years > 1 ? "Years" : "Year"} />
        )}
        <TimePad moment={months} period={months > 1 ? "Months" : "Month"} />
        <TimePad moment={weeks} period={weeks > 1 ? "Weeks" : "Week"} />
        <TimePad moment={calc_days} period={calc_days > 1 ? "Days" : "Day"} />
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
      <TimePad moment={days} period={days > 1 ? "Days" : "Day"} />
      <TimePad moment={hours} period={hours > 1 ? "Hours" : "Hour"} />
      <TimePad moment={minutes} period={minutes > 1 ? "Minutes" : "Minute"} />
      <TimePad moment={seconds} period={seconds > 1 ? "Seconds" : "Second"} />
    </div>
  );
};

export function CountDown({ house, skeleton, ...props }: CountDownProps) {
  const { validityPeriod = "", updatedAt = "" } = { ...house };
  let deadline = calculateDeadline({ validityPeriod, dayCreated: updatedAt });
  let millisecondsTillDeadline = deadline.getTime();

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
        Subscription Validity
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
        <Button>Renew now</Button>
      </Stack>
    </FlowContainer>
  );
}
