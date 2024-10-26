import { Progress } from "@mantine/core";

interface FlowProgressProps {
  active: number;
  total: number;
}

export function FlowProgress({ active, total }: FlowProgressProps) {
  return (
    <Progress
      radius='xs'
      size={4}
      value={Math.max(25, (active / total) * 100)}
      bg='transparent'
      color={"var(--green-9)"}
      animated
      transitionDuration={200}
    />
  );
}
