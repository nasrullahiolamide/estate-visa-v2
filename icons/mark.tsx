import { SVGProps } from "react";

export function Mark({ ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="19"
      height="14"
      viewBox="0 0 19 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M18.3333 2.00003L6.33325 14L0.833252 8.50003L2.24325 7.09003L6.33325 11.17L16.9233 0.590027L18.3333 2.00003Z"
        fill="currentCOlor"
      />
    </svg>
  );
}
