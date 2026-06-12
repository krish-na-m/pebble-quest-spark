export function RangoliCorner({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={`${className} ${flip ? "scale-x-[-1]" : ""}`}
      fill="none"
      aria-hidden
    >
      <g opacity="0.55" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <circle cx="10" cy="10" r="3" fill="currentColor" />
        <circle cx="30" cy="10" r="2" fill="currentColor" />
        <circle cx="50" cy="10" r="2" fill="currentColor" />
        <circle cx="10" cy="30" r="2" fill="currentColor" />
        <circle cx="10" cy="50" r="2" fill="currentColor" />
        <path d="M10 10 Q 40 20 50 50 Q 20 40 10 10 Z" fill="currentColor" opacity="0.4" />
        <path d="M30 30 Q 60 30 60 60 Q 30 60 30 30 Z" />
        <path d="M70 10 C 90 30, 90 30, 70 50 C 50 30, 50 30, 70 10 Z" fill="currentColor" opacity="0.3" />
        <path d="M10 70 C 30 90, 30 90, 50 70 C 30 50, 30 50, 10 70 Z" fill="currentColor" opacity="0.3" />
        <circle cx="80" cy="80" r="6" />
        <circle cx="80" cy="80" r="2" fill="currentColor" />
        <path d="M80 65 L80 95 M65 80 L95 80 M70 70 L90 90 M90 70 L70 90" />
      </g>
    </svg>
  );
}

export function RangoliBorders({ tone = "white" }: { tone?: "white" | "marigold" | "teal" }) {
  const color = tone === "white" ? "text-white" : tone === "teal" ? "text-teal" : "text-marigold";
  return (
    <>
      <RangoliCorner className={`absolute top-2 left-2 w-24 h-24 ${color} pointer-events-none`} />
      <RangoliCorner className={`absolute top-2 right-2 w-24 h-24 ${color} pointer-events-none`} flip />
      <RangoliCorner className={`absolute bottom-2 left-2 w-24 h-24 ${color} pointer-events-none rotate-[-90deg]`} />
      <RangoliCorner className={`absolute bottom-2 right-2 w-24 h-24 ${color} pointer-events-none rotate-180`} />
    </>
  );
}
