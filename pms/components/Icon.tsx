'use client';
import React from 'react';

type IconProps = { className?: string; size?: number };

const wrap =
  (path: React.ReactNode, viewBox = '0 0 24 24'): React.FC<IconProps> =>
  ({ className = '', size = 18 }) =>
    (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox={viewBox}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        {path}
      </svg>
    );

export const Icon = {
  Anchor: wrap(
    <>
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v15M5 12H2a10 10 0 0 0 20 0h-3M8 22a10 10 0 0 1-3-3" />
    </>
  ),
  Wave: wrap(<path d="M2 12c2-2 4-2 6 0s4 2 6 0 4-2 6 0M2 18c2-2 4-2 6 0s4 2 6 0 4-2 6 0M2 6c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />),
  Bolt: wrap(<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />),
  Wrench: wrap(<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.4 2.4-2.6-.4-.4-2.6 2.4-2.4z" />),
  Alert: wrap(
    <>
      <path d="M10.3 3.7 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.7a2 2 0 0 0-3.4 0z" />
      <path d="M12 9v4M12 17h.01" />
    </>
  ),
  Check: wrap(<path d="m5 12 5 5L20 7" />),
  Clock: wrap(
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  Calendar: wrap(
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M3 11h18" />
    </>
  ),
  Activity: wrap(<path d="M3 12h4l2-7 4 14 2-7h6" />),
  Filter: wrap(<path d="M3 5h18l-7 9v6l-4-2v-4L3 5z" />),
  Plus: wrap(<path d="M12 5v14M5 12h14" />),
  Minus: wrap(<path d="M5 12h14" />),
  Arrow: wrap(<path d="M5 12h14M13 6l6 6-6 6" />),
  ArrowLeft: wrap(<path d="M19 12H5M11 6l-6 6 6 6" />),
  ArrowUp: wrap(<path d="M12 19V5M6 11l6-6 6 6" />),
  ArrowDown: wrap(<path d="M12 5v14M6 13l6 6 6-6" />),
  Wifi: wrap(
    <>
      <path d="M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0" />
      <circle cx="12" cy="20" r="1" />
    </>
  ),
  WifiOff: wrap(
    <>
      <path d="M2 2l20 20M5 12.5a10 10 0 0 1 4-2.5M15 10a10 10 0 0 1 4 2.5M8.5 16a5 5 0 0 1 7 0" />
      <circle cx="12" cy="20" r="1" />
    </>
  ),
  Sync: wrap(<path d="M21 12a9 9 0 1 1-3-6.7L21 8M21 3v5h-5" />),
  Compass: wrap(
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15 9-2 6-4 0 2-6z" />
    </>
  ),
  Ship: wrap(
    <>
      <path d="M3 18a9 9 0 0 0 18 0M5 14l7-3 7 3M12 4v7M9 7h6" />
    </>
  ),
  Fuel: wrap(
    <>
      <path d="M3 21h12V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v16zM7 10h6" />
      <path d="M15 9h2a2 2 0 0 1 2 2v6a2 2 0 0 0 2 2v-9l-3-3" />
    </>
  ),
  Cloud: wrap(<path d="M7 18a5 5 0 1 1 1-9.9A6 6 0 0 1 19.5 12 4.5 4.5 0 0 1 18.5 21H7z" />),
  Engine: wrap(
    <>
      <path d="M14 4v3h4l2 2v6l-2 2h-4v3h-4v-3H6l-2-2v-6l2-2h4V4z" />
      <circle cx="12" cy="12" r="2" />
    </>
  ),
  Spark: wrap(<path d="M12 2v6m0 8v6M4.2 4.2l4.3 4.3m7 7 4.3 4.3M2 12h6m8 0h6M4.2 19.8l4.3-4.3m7-7 4.3-4.3" />),
  Doc: wrap(
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6M8 13h8M8 17h6" />
    </>
  ),
  Shield: wrap(<path d="M12 2 4 6v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V6l-8-4z" />),
  Pin: wrap(
    <>
      <path d="M12 22s7-7.5 7-13a7 7 0 1 0-14 0c0 5.5 7 13 7 13z" />
      <circle cx="12" cy="9" r="2.5" />
    </>
  ),
  ChevronR: wrap(<path d="m9 6 6 6-6 6" />),
  Sparkles: wrap(<path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.5 5.5l2 2M16.5 16.5l2 2M5.5 18.5l2-2M16.5 7.5l2-2" />),
  Pulse: wrap(<path d="M3 12h4l2-7 4 14 2-7h6" />),
};
