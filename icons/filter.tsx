import { SVGProps } from "react";

export function FilterIcon({ ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width='16'
      height='14'
      viewBox='0 0 16 14'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M14.6667 1H1.33333L6.66666 7.30667V11.6667L9.33333 13V7.30667L14.6667 1Z'
        stroke='currentColor'
        strokeWidth='1.6'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
