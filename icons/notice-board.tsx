import { SVGProps } from "react";

export function NoticeBoardIcon({ ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M12.04 2.5L9.53 5H14.53L12.04 2.5ZM4 7V20H20V7H4ZM12 0L17 5H20C20.5304 5 21.0391 5.21071 21.4142 5.58579C21.7893 5.96086 22 6.46957 22 7V20C22 20.5304 21.7893 21.0391 21.4142 21.4142C21.0391 21.7893 20.5304 22 20 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V7C2 6.46957 2.21071 5.96086 2.58579 5.58579C2.96086 5.21071 3.46957 5 4 5H7L12 0ZM7 18V14H12V18H7ZM14 17V10H18V17H14ZM6 12V9H11V12H6Z'
        fill='currentColor'
      />
    </svg>
  );
}
