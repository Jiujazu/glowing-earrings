interface LogoIconProps {
  className?: string;
  strokeWidth?: number;
}

export default function LogoIcon({ className = "w-6 h-6", strokeWidth = 2.5 }: LogoIconProps) {
  return (
    <svg
      viewBox="-10 -10 44 46"
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

      {/* Glow sparkle — massive 4-pointed star at Vermeer highlight position */}
      <path
        d="M8 -8
           L12 8
           L24 12
           L12 16
           L8 32
           L4 16
           L-8 12
           L4 8
           Z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}
