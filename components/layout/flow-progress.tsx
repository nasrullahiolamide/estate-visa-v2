import { Progress } from "@mantine/core";

interface FlowProgressProps {
  step: number;
  active: number;
}

export function FlowProgress({ step, active }: FlowProgressProps) {
  return (
    <Progress
      value={active === step ? 100 : 0}
      bg={active === step ? "var(--accent-9)" : "var(--accent-3)"}
    />
  );
}
