import { SVGProps } from "react";

export function BreadCrumbsArrowIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="17"
      fill="none"
      viewBox="0 0 16 17"
      {...props}
    >
      <path
        stroke="#CECECE"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M6.667 11.584L9.333 8.25 6.667 4.917"
      />
    </svg>
  );
}
