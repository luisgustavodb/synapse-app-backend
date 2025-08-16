import React from 'react';

export const SaladIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M7 21h10" />
    <path d="M12 21V8" />
    <path d="M12 8a7.73 7.73 0 0 1-7-8" />
    <path d="M12 8a7.73 7.73 0 0 0 7-8" />
    <path d="M5 21c-1.1-3.3-1.1-6.7 0-10" />
    <path d="M19 21c1.1-3.3 1.1-6.7 0-10" />
  </svg>
);
