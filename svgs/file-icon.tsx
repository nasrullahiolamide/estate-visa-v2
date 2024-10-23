import { SVGProps } from "react";

export function FileIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 16 16"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.333"
        d="M9.333 1.513v2.754c0 .373 0 .56.073.702a.667.667 0 00.291.292c.143.072.33.072.703.072h2.754m.18 1.326v4.808c0 1.12 0 1.68-.219 2.108a2 2 0 01-.874.874c-.427.218-.987.218-2.108.218H5.867c-1.12 0-1.68 0-2.108-.218a2 2 0 01-.874-.874c-.218-.428-.218-.988-.218-2.108V4.533c0-1.12 0-1.68.218-2.107a2 2 0 01.874-.875c.428-.218.988-.218 2.108-.218h2.14c.49 0 .735 0 .965.056a2 2 0 01.578.24c.202.123.375.296.72.642l2.126 2.125c.346.346.519.52.643.72.11.18.19.375.24.579.054.23.054.475.054.964z"
      />
    </svg>
  );
}
