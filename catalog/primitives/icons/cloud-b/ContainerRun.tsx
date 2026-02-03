import type { SVGProps } from "react";
const SvgContainerRun = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    role="img"
    {...props}
  >
    <path fill="#4285f4" d="M20 8h-6l-2-4-2 4H4l6 4-2 8 4-3 4 3-2-8Z" />
    <path fill="#669df6" d="m12 4 2 4h6l-6 4 2 8-4-3z" />
  </svg>
);
export default SvgContainerRun;
