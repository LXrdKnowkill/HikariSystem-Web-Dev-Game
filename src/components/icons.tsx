import type { SVGProps } from "react";

export const Icons = {
  logo: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M10 20.5 3.5 18V6l6.5 2.5V20.5z" />
      <path d="M14 3.5 20.5 6v12l-6.5-2.5V3.5z" />
      <path d="m9 18-6-3" />
      <path d="M13.5 6.5 17 8" />
      <path d="m3.5 6 7 2.5" />
      <path d="m14 3.5 6.5 2.5" />
    </svg>
  ),
};
