import { SVGProps } from "react";

export function CalenderIcon({ ...props }: SVGProps<SVGSVGElement>) {
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
        d='M10.6667 1.33398V4.00065M5.33333 1.33398V4.00065M2 6.66732H14M3.33333 2.66732H12.6667C13.403 2.66732 14 3.26427 14 4.00065V13.334C14 14.0704 13.403 14.6673 12.6667 14.6673H3.33333C2.59695 14.6673 2 14.0704 2 13.334V4.00065C2 3.26427 2.59695 2.66732 3.33333 2.66732Z'
        stroke='currenctColor'
        strokeWidth='1.6'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
