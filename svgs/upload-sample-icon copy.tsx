import { SVGProps } from "react";

export function UploadSampleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='15'
      height='14'
      fill='none'
      viewBox='0 0 15 14'
      {...props}
    >
      <path
        stroke='var(--white)'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='0.841'
        d='M5.209 4.549l2.208-2.207 2.207 2.207M7.418 8.229V2.343M12.042 8.229v2.943a.42.42 0 01-.42.42h-8.41a.42.42 0 01-.421-.42V8.229'
      />
    </svg>
  );
}
