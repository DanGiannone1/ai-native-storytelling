import type { SVGProps } from "react";
const SvgFunctionService = (props: SVGProps<SVGSVGElement>) => (
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
        y1={16}
        y2={2}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0} stopColor="#faa21d" />
        <stop offset={1} stopColor="#ffd70a" />
      </linearGradient>
    </defs>
    <path
      fill="url(#a)"
      d="M14.5 2h-11A1.5 1.5 0 0 0 2 3.5v11A1.5 1.5 0 0 0 3.5 16h11a1.5 1.5 0 0 0 1.5-1.5v-11A1.5 1.5 0 0 0 14.5 2"
    />
    <path
      fill="#fff"
      d="M11.17 5H9.56L8.17 8.46 6.5 5H4.83l2.5 4.5-2.5 4.5H6.5l1.67-3.54L9.83 14h1.67L9 9.5Z"
    />
  </svg>
);
export default SvgFunctionService;
