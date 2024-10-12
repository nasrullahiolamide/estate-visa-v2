import { MantineColor } from "@mantine/core";
import { useMemo } from "react";

export function useRandomColor(
  colors: MantineColor[] = ["orange", "blue", "green", "purple", "tomato"],
) {
  const randomIndex = useMemo(() => {
    return Math.floor(Math.random() * colors.length);
  }, []);
  return colors[randomIndex];
}
