import { SVGProps } from "react";

export function CopyIcon({ ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2.5 7.5H2C1.73478 7.5 1.48043 7.39464 1.29289 7.20711C1.10536 7.01957 1 6.76522 1 6.5V2C1 1.73478 1.10536 1.48043 1.29289 1.29289C1.48043 1.10536 1.73478 1 2 1H6.5C6.76522 1 7.01957 1.10536 7.20711 1.29289C7.39464 1.48043 7.5 1.73478 7.5 2V2.5M5.5 4.5H10C10.5523 4.5 11 4.94772 11 5.5V10C11 10.5523 10.5523 11 10 11H5.5C4.94772 11 4.5 10.5523 4.5 10V5.5C4.5 4.94772 4.94772 4.5 5.5 4.5Z"
        stroke="#3944BC"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
