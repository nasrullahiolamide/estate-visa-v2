import { SVGProps } from "react";

export function HousesIcon({ ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M17 16H15V22H12V17H8V22H5V16H3L10 10L17 16ZM6 2L10 6H9V9H7V6H5V9H3V6H2L6 2ZM18 3L23 8H22V12H19V9H17V12H15.34L14 10.87V8H13L18 3Z"
        fill="currentColor"
      />
    </svg>
  );
}
