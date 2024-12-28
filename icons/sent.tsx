import { SVGProps } from "react";

export function SentIcon({ ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="16"
      viewBox="0 0 20 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9 12H11V7.85L12.6 9.425L14.025 8L10 4L6 8L7.425 9.4L9 7.825V12ZM2 16C1.45 16 0.979333 15.8043 0.588 15.413C0.196667 15.0217 0.000666667 14.5507 0 14L0 2C0 1.45 0.196 0.979333 0.588 0.588C0.98 0.196666 1.45067 0.000666667 2 0L18 0C18.55 0 19.021 0.196 19.413 0.588C19.805 0.98 20.0007 1.45067 20 2V14C20 14.55 19.8043 15.021 19.413 15.413C19.0217 15.805 18.5507 16.0007 18 16H2ZM2 14H18V2H2V14Z"
        fill="#CC0404"
      />
    </svg>
  );
}
