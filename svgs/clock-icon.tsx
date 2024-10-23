import { SVGProps } from "react";

export function ClockIcon({ ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <g clip-path='url(#clip0_2439_3782)'>
        <path
          d='M7.99992 4.00065V8.00065L10.6666 9.33398M14.6666 8.00065C14.6666 11.6825 11.6818 14.6673 7.99992 14.6673C4.31802 14.6673 1.33325 11.6825 1.33325 8.00065C1.33325 4.31875 4.31802 1.33398 7.99992 1.33398C11.6818 1.33398 14.6666 4.31875 14.6666 8.00065Z'
          stroke='currentColor'
          strokeWidth='1.6'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
      <defs>
        <clipPath id='clip0_2439_3782'>
          <rect width='16' height='16' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
}
