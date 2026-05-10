import type { SVGProps } from 'react';

export default function MaterialUiLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 100 100"
      {...props}
    >
      <g clipPath="url(#material-ui-logo-clip)">
        <path
          fill="#42a5f5"
          fillOpacity=".8"
          d="M25.399 65.395 10 49.996 60 0h30.794zm65.395-19.259H60L48.465 57.671l15.399 15.4"
        />
        <path fill="#0d47a1" d="M48.465 88.465 60 100h30.794l-26.93-26.93" />
        <path
          fill="#42a5f5"
          d="M33.103 73.078 48.477 57.7l15.375 15.375-15.375 15.379z"
        />
        <path
          fill="url(#material-ui-logo-gradient-shadow)"
          d="m48.477 88.453 15.375-15.375 2.146 2.146L50.623 90.6z"
        />
        <path
          fill="url(#material-ui-logo-gradient-base)"
          d="m48.465 88.465 22.848-7.894-7.449-7.505"
        />
      </g>
      <defs>
        <linearGradient
          id="material-ui-logo-gradient-shadow"
          x1="56.167"
          x2="58.314"
          y1="80.763"
          y2="82.909"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".2" stopOpacity=".15" />
          <stop offset=".85" stopColor="#616161" stopOpacity=".01" />
        </linearGradient>
        <linearGradient
          id="material-ui-logo-gradient-base"
          x1="48.471"
          x2="71.318"
          y1="80.766"
          y2="80.766"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".2" stopOpacity=".55" />
          <stop offset=".85" stopColor="#616161" stopOpacity=".01" />
        </linearGradient>
        <clipPath id="material-ui-logo-clip">
          <path fill="#fff" d="M0 0h100v100H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
