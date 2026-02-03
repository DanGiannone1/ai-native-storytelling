import type { SVGProps } from "react";
const SvgStorageService = (props: SVGProps<SVGSVGElement>) => (
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
        y2={2.17}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0} stopColor="#0078d4" />
        <stop offset={1} stopColor="#5ea0ef" />
      </linearGradient>
    </defs>
    <rect width={16} height={14} x={1} y={2} fill="url(#a)" rx={1} />
    <rect width={12} height={3} x={3} y={4} fill="#fff" rx={0.5} />
    <rect width={12} height={3} x={3} y={8} fill="#fff" rx={0.5} />
    <rect width={12} height={2} x={3} y={12} fill="#fff" rx={0.5} />
    <circle cx={5} cy={5.5} r={0.75} fill="#50e6ff" />
    <circle cx={5} cy={9.5} r={0.75} fill="#50e6ff" />
    <circle cx={5} cy={13} r={0.75} fill="#50e6ff" />
  </svg>
);
export default SvgStorageService;
