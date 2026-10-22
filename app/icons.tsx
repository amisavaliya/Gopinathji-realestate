import type { ReactNode } from 'react'

const PATHS: Record<string, ReactNode> = {
  gate: (
    <>
      <path d="M4 20V9l8-5 8 5v11" />
      <path d="M9 20v-7h6v7" />
    </>
  ),
  tree: (
    <>
      <circle cx="12" cy="9" r="6" />
      <path d="M12 15v6" />
    </>
  ),
  camera: (
    <>
      <rect x="3" y="7" width="13" height="10" rx="2" />
      <path d="M16 10.5 21 7v10l-5-3.5" />
    </>
  ),
  droplet: <path d="M12 2s7 7.58 7 12a7 7 0 0 1-14 0c0-4.42 7-12 7-12Z" />,
  road: (
    <>
      <path d="M5 21 9 3h6l4 18" />
      <path d="M12 3v18" strokeDasharray="2 3" />
    </>
  ),
  lamp: (
    <>
      <circle cx="12" cy="6" r="3" />
      <path d="M12 9v12" />
      <path d="M8 21h8" />
    </>
  ),
  temple: (
    <>
      <path d="M12 2 3 9h18L12 2Z" />
      <path d="M5 9v12h14V9" />
      <path d="M10 21v-6h4v6" />
    </>
  ),
  swing: (
    <>
      <path d="M4 4v16M20 4v16M4 4h16" />
      <path d="M9 4v6a3 3 0 0 0 6 0V4" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-7.58 7-12a7 7 0 1 0-14 0c0 4.42 7 12 7 12Z" />
      <circle cx="12" cy="9" r="2.5" />
    </>
  ),
  ruler: (
    <>
      <rect x="3" y="8" width="18" height="8" rx="1" />
      <path d="M7 8v3M11 8v3M15 8v3M19 8v3" />
    </>
  ),
  'arrow-right': (
    <>
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </>
  ),
  default: <circle cx="12" cy="12" r="9" />,
}

export function Icon({ name, className }: { name: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {PATHS[name] ?? PATHS.default}
    </svg>
  )
}

export const AmenityIcon = Icon
