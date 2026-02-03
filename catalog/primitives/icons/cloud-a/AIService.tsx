import type { SVGProps } from "react";
const SvgAIService = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 18 18"
    width="1em"
    height="1em"
    role="img"
    {...props}
  >
    <defs>
      <linearGradient
        id="a"
        x1={9}
        x2={9}
        y1={16.97}
        y2={1.03}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0} stopColor="#0078d4" />
        <stop offset={1} stopColor="#5ea0ef" />
      </linearGradient>
    </defs>
    <path fill="url(#a)" d="M9 1a8 8 0 1 0 8 8 8 8 0 0 0-8-8" />
    <path
      fill="#fff"
      d="M9 3.5A5.5 5.5 0 1 0 14.5 9 5.5 5.5 0 0 0 9 3.5m0 9A3.5 3.5 0 1 1 12.5 9 3.5 3.5 0 0 1 9 12.5"
    />
    <path
      fill="#50e6ff"
      d="M9 6.5A2.5 2.5 0 1 0 11.5 9 2.5 2.5 0 0 0 9 6.5m0 4A1.5 1.5 0 1 1 10.5 9 1.5 1.5 0 0 1 9 10.5"
    />
  </svg>
);
export default SvgAIService;
