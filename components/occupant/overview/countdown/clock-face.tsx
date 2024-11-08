import { HTMLMotionProps, motion } from "framer-motion";
import { ForwardedRef, forwardRef } from "react";

import clsx from "clsx";

interface ClockFaceProps extends HTMLMotionProps<"span"> {
  value: string;
}

function _ClockFace(
  { value, className, style, ...props }: ClockFaceProps,
  ref: ForwardedRef<HTMLSpanElement>
) {
  return (
    <motion.span
      ref={ref}
      className={clsx(
        "clump:py-[clamp(0.3rem,3vw,1rem)] py-4",
        "bg-blue-8",
        className
      )}
      style={{
        gridArea: "1/1",
        width: "100%",
        height: "50%",
        display: "grid",
        overflow: "hidden",
        backfaceVisibility: "hidden",
        overflowBlock: "hidden",
        ...style,
      }}
      {...props}
    >
      {value}
    </motion.span>
  );
}

export const ClockFace = forwardRef<HTMLSpanElement, ClockFaceProps>(
  _ClockFace
);
