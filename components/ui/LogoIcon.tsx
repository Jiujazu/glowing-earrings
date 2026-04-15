interface LogoIconProps {
  className?: string;
  strokeWidth?: number;
}

export default function LogoIcon({ className = "w-6 h-6", strokeWidth = 2.5 }: LogoIconProps) {
  return (
    <svg
      viewBox="0 0 24 26"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Earring hook — small arc at top */}
      <path
        d="M10 4 C10 1.5, 14 1.5, 14 4"
        fill="none"
      />

      {/* Pearl body — teardrop / pear shape, hanging from hook */}
      <path
        d="M12 4
           C8 4, 3.5 9.5, 3.5 14
           C3.5 20, 7.5 24.5, 12 24.5
           C16.5 24.5, 20.5 20, 20.5 14
           C20.5 9.5, 16 4, 12 4Z"
        fill="none"
      />

      {/* Glow sparkle — 4-pointed star at Vermeer highlight position (upper-left of pearl) */}
      <path
        d="M8.5 10
           L9.1 11.5
           L10.5 12
           L9.1 12.5
           L8.5 14
           L7.9 12.5
           L6.5 12
           L7.9 11.5
           Z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}
