import { SVGProps } from "react";

export function DeactivateIcon({ ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width='19'
      height='18'
      viewBox='0 0 19 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M6.30002 14L9.90002 10.4L13.5 14L14.9 12.6L11.3 9L14.9 5.4L13.5 4L9.90002 7.6L6.30002 4L4.90002 5.4L8.50002 9L4.90002 12.6L6.30002 14ZM2.90002 18C2.35002 18 1.87936 17.8043 1.48802 17.413C1.09669 17.0217 0.900691 16.5507 0.900024 16V2C0.900024 1.45 1.09602 0.979333 1.48802 0.588C1.88002 0.196667 2.35069 0.000666667 2.90002 0H16.9C17.45 0 17.921 0.196 18.313 0.588C18.705 0.98 18.9007 1.45067 18.9 2V16C18.9 16.55 18.7044 17.021 18.313 17.413C17.9217 17.805 17.4507 18.0007 16.9 18H2.90002ZM2.90002 16H16.9V2H2.90002V16Z'
        fill='#969921'
      />
    </svg>
  );
}