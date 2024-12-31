import { usePrevious } from "@/packages/hooks/use-previous";
import { motion } from "framer-motion";
import { ClockFace } from "./clock-face";

import clsx from "clsx";

interface FlipProps {
  time: string;
}

export function Flip({ time }: FlipProps) {
  const previous = usePrevious(time);

  return (
    <motion.div
      key={time}
      style={{
        display: "grid",
        position: "relative",
        perspectiveOrigin: "50% 50%",
        perspective: "300px",
      }}
      className={clsx(
        "text-jet text-white",
        "will-change-transform", // use to avoid layout shift
        "clump:rounded-[clamp(.4rem,2vw,.75rem)] rounded-xl",
        "clump:w-[clamp(2rem,7rem,5rem)] w-16 font-bold"
      )}
    >
      <ClockFace
        className='clump:rounded-t-[clamp(.4rem,2vw,.75rem)] rounded-t-xl'
        style={{
          // borderBlockEnd: "1.5px solid #353535",
          transformOrigin: "center bottom",
          alignContent: "start",
          alignSelf: "start",
        }}
        value={time}
      />
      <ClockFace
        className='clump:rounded-t-[clamp(.4rem,2vw,.75rem)] rounded-t-xl'
        animate={{
          rotateX: -90,
          transition: {
            duration: 0.5,
          },
        }}
        initial={{
          rotateX: 0,
        }}
        style={{
          // borderBlockEnd: "1.5px solid #353535",
          boxShadow: "0 -2px 2px -2px black",
          transformOrigin: "center bottom",
          alignContent: "start",
          alignSelf: "start",
        }}
        value={previous}
      />
      <ClockFace
        className='clump:rounded-b-[clamp(.4rem,2vw,.75rem)] rounded-b-xl'
        style={{
          // borderBlockStart: "1.5px solid #353535",
          transformOrigin: "center top",
          alignContent: "end",
          alignSelf: "end",
        }}
        value={previous}
      />

      <ClockFace
        className='clump:rounded-b-[clamp(.4rem,2vw,.75rem)] rounded-b-xl'
        animate={{
          rotateX: 0,
          transition: {
            duration: 0.5,
            delay: 0.5,
          },
        }}
        initial={{
          rotateX: 90,
        }}
        style={{
          // borderBlockStart: "1.5px solid #353535",
          boxShadow: "0 2px 2px -2px black",
          alignSelf: "end",
          transformOrigin: "center top",
          alignContent: "end",
        }}
        value={time}
      />
    </motion.div>
  );
}
