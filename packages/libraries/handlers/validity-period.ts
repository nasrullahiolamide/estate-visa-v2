import dayjs, { ManipulateType } from "dayjs";

interface CalculateDeadlineProps {
  validityPeriod: string;
  dayCreated: string;
}

export function calculateDeadline({
  validityPeriod,
  dayCreated,
}: CalculateDeadlineProps): Date {
  const [value, unit] = validityPeriod.split(" ");
  const duration = parseInt(value, 10);

  if (isNaN(duration)) throw new Error("Invalid validity period format.");

  const deadline = dayjs(dayCreated)
    .add(duration, unit as ManipulateType)
    .startOf("day");

  return deadline.toDate();
}
