import { SVGProps } from "react";

export function Plane({ ...props }: SVGProps<SVGSVGElement>) {
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
        d='M14.6667 1.33398L7.33337 8.66732M14.6667 1.33398L10 14.6673L7.33337 8.66732M14.6667 1.33398L1.33337 6.00065L7.33337 8.66732'
        stroke='white'
        strokeWidth='1.6'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
