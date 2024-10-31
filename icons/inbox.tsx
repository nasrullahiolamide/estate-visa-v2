import { SVGProps } from "react";

export function Inbox({ ...props }: SVGProps<SVGSVGElement>) {
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
        d='M14.6666 2.99935C14.6666 2.26602 14.0666 1.66602 13.3333 1.66602H2.66665C1.93331 1.66602 1.33331 2.26602 1.33331 2.99935M14.6666 2.99935V10.9993C14.6666 11.7327 14.0666 12.3327 13.3333 12.3327H2.66665C1.93331 12.3327 1.33331 11.7327 1.33331 10.9993V2.99935M14.6666 2.99935L7.99998 7.66601L1.33331 2.99935'
        stroke='currentColor'
        strokeWidth='1.6'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
