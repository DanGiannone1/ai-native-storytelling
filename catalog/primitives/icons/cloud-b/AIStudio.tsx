import type { SVGProps } from "react";
const SvgAIStudio = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    role="img"
    {...props}
  >
    <path fill="#4285f4" d="M12 2 2 7v10l10 5 10-5V7Z" />
    <path fill="#669df6" d="M12 2v20l10-5V7Z" />
    <path
      fill="#fff"
      d="M12 8a4 4 0 1 0 4 4 4 4 0 0 0-4-4m0 6a2 2 0 1 1 2-2 2 2 0 0 1-2 2"
    />
    <circle cx={12} cy={12} r={1} fill="#aecbfa" />
  </svg>
);
export default SvgAIStudio;
