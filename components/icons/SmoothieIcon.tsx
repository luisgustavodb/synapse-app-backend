import React from 'react';

export const SmoothieIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M12 22a2 2 0 0 0 2-2V12h-4v8a2 2 0 0 0 2 2Z" />
    <path d="M12 12V4" />
    <path d="M16 4H8" />
    <path d="M14 8h-4" />
    <path d="m14 2-2 2-2-2" />
  </svg>
);
