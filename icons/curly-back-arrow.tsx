import { SVGProps } from "react";

export function CurlyBackArrrow({ ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width='12'
      height='10'
      viewBox='0 0 12 10'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M10.6667 9.66732V7.00065C10.6667 6.4451 10.4722 5.97287 10.0833 5.58398C9.69444 5.1951 9.22222 5.00065 8.66667 5.00065H2.55L4.95 7.40065L4 8.33398L0 4.33398L4 0.333984L4.95 1.26732L2.55 3.66732H8.66667C9.58889 3.66732 10.3751 3.99243 11.0253 4.64265C11.6756 5.29287 12.0004 6.07887 12 7.00065V9.66732H10.6667Z'
        fill='currentColor'
      />
    </svg>
  );
}
