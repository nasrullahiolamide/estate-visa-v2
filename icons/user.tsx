import { SVGProps } from "react";

export function UserIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20"
      {...props}
    >
      <path
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeWidth="1.189"
        d="M6.537 12.01a3.863 3.863 0 100-7.726 3.863 3.863 0 000 7.727z"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.189"
        d="M11.547 4.428a3.863 3.863 0 111.048 7.583M1.19 14.789a6.54 6.54 0 0110.698 0M12.594 12.01a6.529 6.529 0 015.349 2.778"
      />
    </svg>
  );
}
