import { SVGProps } from "react";

export function Bull(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={5}
      height={5}
      viewBox="0 0 5 5"
      fill="none"
      {...props}
    >
      <circle cx={2.3721} cy={2.41427} r={2.12783} fill="currentColor" />
    </svg>
  );
}
