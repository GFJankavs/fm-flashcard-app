import type { FC, SVGAttributes } from "react";

const PatternStarYellow: FC<SVGAttributes<SVGSVGElement>> = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="31"
    viewBox="0 0 30 31"
    fill="none"
  >
    <g filter="url(#filter0_d_533_677)">
      <path
        d="M7.74877 -2.86102e-06C11.8728 7.56796 20.9814 10.888 29.008 7.74876C21.44 11.8728 18.1201 20.9813 21.2593 29.008C17.1353 21.44 8.02665 18.1201 2.86102e-06 21.2593C7.56798 17.1353 10.888 8.02663 7.74877 -2.86102e-06Z"
        fill="#F8CB46"
      />
      <path
        d="M8.59359 1.81388C12.7587 7.7298 20.1982 10.4418 27.1933 8.594C21.2779 12.7592 18.5663 20.1985 20.414 27.1933C16.2486 21.2776 8.80893 18.5663 1.81389 20.4144C7.73007 16.2492 10.4418 8.80923 8.59359 1.81388Z"
        stroke="#2E1401"
        strokeWidth="0.481481"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_533_677"
        x="0"
        y="0"
        width="29.408"
        height="30.5081"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx="0.4" dy="1.5" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.180392 0 0 0 0 0.0784314 0 0 0 0 0.00392157 0 0 0 1 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_533_677"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_533_677"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export default PatternStarYellow;
