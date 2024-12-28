import { SVGProps } from "react";

export function ReceivedIcon({ ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="16"
      viewBox="0 0 20 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11 4H9V8.15L7.4 6.575L5.975 8L10 12L14 8L12.575 6.6L11 8.175V4ZM18 0C18.55 0 19.0207 0.195666 19.412 0.587C19.8033 0.978333 19.9993 1.44933 20 2V14C20 14.55 19.804 15.0207 19.412 15.412C19.02 15.8033 18.5493 15.9993 18 16L2 16C1.45 16 0.979 15.804 0.587 15.412C0.195 15.02 -0.000667572 14.5493 0 14V2C0 1.45 0.195667 0.979 0.587 0.587C0.978333 0.195 1.44933 -0.000667572 2 0L18 0ZM18 2L2 2V14L18 14V2Z"
        fill="#11A506"
      />
    </svg>
  );
}
