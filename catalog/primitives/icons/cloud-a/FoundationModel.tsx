import type { SVGProps } from "react";
const SvgFoundationModel = (props: SVGProps<SVGSVGElement>) => (
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
        y1={15.83}
        y2={5.79}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0} stopColor="#0078d4" />
        <stop offset={1} stopColor="#5ea0ef" />
      </linearGradient>
    </defs>
    <path fill="url(#a)" d="M16.5 9A7.5 7.5 0 1 1 9 1.5 7.5 7.5 0 0 1 16.5 9" />
    <path
      fill="#fff"
      d="M9 4.5A4.5 4.5 0 1 0 13.5 9 4.5 4.5 0 0 0 9 4.5M9 12a3 3 0 1 1 3-3 3 3 0 0 1-3 3"
    />
    <circle cx={9} cy={9} r={1.5} fill="#fff" />
  </svg>
);
export default SvgFoundationModel;
