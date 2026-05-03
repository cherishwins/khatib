// MK monogram inside an isometric cube outline.
// Inline SVG so it ships without an extra request.

interface MonogramProps {
  size?: number;
  className?: string;
  ariaLabel?: string;
}

export function Monogram({ size = 48, className, ariaLabel = 'MK monogram' }: MonogramProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label={ariaLabel}
    >
      <rect fill="#0A0E17" x="0" y="0" width="512" height="512" />
      <rect fill="#C8A44E" x="176" y="74" width="160" height="2" />
      <g
        stroke="#C8A44E"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M 256 168 L 369 233 L 256 298 L 143 233 Z" />
        <path d="M 143 233 L 256 298 L 256 428 L 143 363 Z" />
        <path d="M 369 233 L 256 298 L 256 428 L 369 363 Z" />
      </g>
      <text
        fill="#FFFFFF"
        fontFamily="Cormorant Garamond, Georgia, serif"
        fontWeight="700"
        fontSize="160"
        letterSpacing="-4"
        x="256"
        y="370"
        textAnchor="middle"
      >
        MK
      </text>
      <text
        fill="#C8A44E"
        fontFamily="IBM Plex Mono, monospace"
        fontWeight="500"
        fontSize="20"
        letterSpacing="6"
        x="256"
        y="468"
        textAnchor="middle"
      >
        ENG · LB
      </text>
    </svg>
  );
}

// Simplified favicon variant — MK + gold rules, no cube.
export function MonogramFavicon({ size = 32, className }: { size?: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="MK"
    >
      <rect fill="#0A0E17" x="0" y="0" width="64" height="64" />
      <rect fill="#C8A44E" x="14" y="12" width="36" height="1.5" />
      <text
        fontFamily="Cormorant Garamond, Georgia, serif"
        fontWeight="700"
        fontSize="34"
        fill="#FFFFFF"
        textAnchor="middle"
        letterSpacing="-1"
        x="32"
        y="46"
      >
        MK
      </text>
      <rect fill="#C8A44E" x="14" y="52" width="36" height="1.5" />
    </svg>
  );
}
