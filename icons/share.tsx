import { SVGProps } from "react";

export function ShareIcon({ ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M5.72667 9.00671L10.28 11.66M10.2733 4.34004L5.72667 6.99337M14 3.33337C14 4.43794 13.1046 5.33337 12 5.33337C10.8954 5.33337 10 4.43794 10 3.33337C10 2.2288 10.8954 1.33337 12 1.33337C13.1046 1.33337 14 2.2288 14 3.33337ZM6 8.00004C6 9.10461 5.10457 10 4 10C2.89543 10 2 9.10461 2 8.00004C2 6.89547 2.89543 6.00004 4 6.00004C5.10457 6.00004 6 6.89547 6 8.00004ZM14 12.6667C14 13.7713 13.1046 14.6667 12 14.6667C10.8954 14.6667 10 13.7713 10 12.6667C10 11.5621 10.8954 10.6667 12 10.6667C13.1046 10.6667 14 11.5621 14 12.6667Z'
        stroke='currentColor'
        strokeWidth='1.6'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
