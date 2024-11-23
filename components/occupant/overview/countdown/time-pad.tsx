import { ComponentPropsWithoutRef } from "react";
import { zeroPad } from "react-countdown";
import { Stack, Title } from "@mantine/core";

import { Flip } from "./flip";

interface TimePadProps extends ComponentPropsWithoutRef<"div"> {
  moment: number;
  period: string;
}
export function TimePad({ moment, period }: TimePadProps) {
  const time = zeroPad(moment);

  return (
    <Stack align='center' ta='center' gap={10}>
      <div
        className='grid grid-flow-col gap-[3px]'
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${time.length}, auto)`,
        }}
      >
        {time.split("").map((digit: string, idx) => (
          <Flip key={idx} time={digit} />
        ))}
      </div>

      <Title
        className='text-center text-sm font-semibold leading-snug sm:text-lg'
        order={5}
      >
        {period}
      </Title>
    </Stack>
  );
}
