import { MouseEventHandler } from "react";

export const handleClickPropagation: MouseEventHandler<HTMLDivElement> = (
  event,
) => {
  event.stopPropagation();
};
