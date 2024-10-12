import { SVGProps } from "react";

export function UploadIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M9 6l3-3m0 0l3 3m-3-3v12M7.5 9H7a4 4 0 00-4 4v4a4 4 0 004 4h10a4 4 0 004-4v-4a4 4 0 00-4-4h-.5"
      />
    </svg>
  );
}
