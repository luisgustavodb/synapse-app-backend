import React from 'react';

export const DumbbellIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M14.4 14.4 9.6 9.6" />
    <path d="M18.657 5.343a2 2 0 1 0-2.828-2.828" />
    <path d="M10.4 13.6a2 2 0 1 0-2.828-2.828" />
    <path d="M5.343 18.657a2 2 0 1 0 2.828 2.828" />
    <path d="M13.6 10.4a2 2 0 1 0 2.828 2.828" />
    <path d="m21.5 2.5-3.5 3.5" />
    <path d="m2.5 21.5 3.5-3.5" />
  </svg>
);