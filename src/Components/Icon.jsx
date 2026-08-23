// A small, hand-authored line-icon set — used for structural/page-header
// spots (nav brand, page titles, crisis banner). Expressive emoji (mood
// options, checklist items, per-issue icons) stay as emoji on purpose.
const PATHS = {
  leaf: (
    <>
      <path d="M5 20c8-1 12-6 13-14-8 1-13 6-13 14Z" />
      <path d="M5 20c1-5 4-9 9-11" />
    </>
  ),
  heart: (
    <path d="M12 20s-7-4.35-9.5-8.5C.8 8.1 2.2 5 5.4 5c1.9 0 3.3 1 4.6 2.6C11.3 6 12.7 5 14.6 5c3.2 0 4.6 3.1 2.9 6.5C19 15.65 12 20 12 20Z" />
  ),
  brain: (
    <>
      <path d="M9 4a3 3 0 0 0-3 3v.3A3 3 0 0 0 4 10v1a3 3 0 0 0 1.5 5.6A3 3 0 0 0 9 20a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3Z" />
      <path d="M15 4a3 3 0 0 1 3 3v.3A3 3 0 0 1 20 10v1a3 3 0 0 1-1.5 5.6A3 3 0 0 1 15 20a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3Z" />
    </>
  ),
  book: (
    <path d="M4 5.5C4 4.7 4.7 4 6 4h5.5v16H6c-1.3 0-2-.7-2-1.5v-13ZM20 5.5c0-.8-.7-1.5-2-1.5h-5.5v16H18c1.3 0 2-.7 2-1.5v-13Z" />
  ),
  planner: (
    <>
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M4 9.5h16M8 3v3M16 3v3" />
      <path d="m8.5 14 2 2 4-4.5" />
    </>
  ),
  sprout: (
    <>
      <path d="M12 20v-7" />
      <path d="M12 13c0-3.5-2.5-6-6-6 0 3.5 2.5 6 6 6Z" />
      <path d="M12 13c0-4 3-7 7-7 0 4-3 7-7 7Z" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m14.5 9.5-1.7 5-5 1.7 1.7-5z" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8.5" r="3" />
      <path d="M3.5 19c0-3 2.5-5.5 5.5-5.5s5.5 2.5 5.5 5.5" />
      <path d="M16 8.8a2.6 2.6 0 1 0 0-5.2" />
      <path d="M20.5 19c0-2.5-1.8-4.6-4-5.3" />
    </>
  ),
  alert: (
    <>
      <path d="M12 4 3 19h18Z" />
      <path d="M12 10v4" />
      <circle cx="12" cy="16.6" r="0.6" fill="currentColor" stroke="none" />
    </>
  ),
  home: (
    <path d="M4 11 12 4l8 7v8a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1Z" />
  ),
  shield: (
    <>
      <path d="M12 3 5 6v5.5c0 4.5 3 8 7 9 4-1 7-4.5 7-9V6l-7-3Z" />
      <path d="m9 12.2 2 2 4-4.4" />
    </>
  )
};

function Icon({ name, size = 20, className, style, strokeWidth = 1.8 }) {
  const path = PATHS[name];
  if (!path) return null;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {path}
    </svg>
  );
}

export default Icon;
