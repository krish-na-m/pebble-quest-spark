type Variant = "bunty" | "meera" | "arjun";

const palette: Record<Variant, { skin: string; cheek: string; outfit: string }> = {
  bunty: { skin: "#E8B58A", cheek: "#FF9DA5", outfit: "#00A896" },
  meera: { skin: "#C68763", cheek: "#FF8898", outfit: "#FF6B6B" },
  arjun: { skin: "#9B6240", cheek: "#FF9080", outfit: "#F5A623" },
};

export function Mascot({ variant = "bunty", size = 160, animate = true }: { variant?: Variant; size?: number; animate?: boolean }) {
  const c = palette[variant];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className={animate ? "animate-float" : ""}
      aria-hidden
    >
      {/* Glow */}
      <circle cx="100" cy="110" r="80" fill="#FFD56B" opacity="0.4" />
      {/* Body / kurta */}
      <ellipse cx="100" cy="170" rx="55" ry="22" fill={c.outfit} />
      <path d={`M55 170 Q 60 130 100 130 Q 140 130 145 170 Z`} fill={c.outfit} />
      {/* Head */}
      <circle cx="100" cy="95" r="55" fill={c.skin} />
      {/* Hair */}
      <path d="M50 85 Q 55 50 100 45 Q 145 50 150 85 Q 140 65 100 65 Q 60 65 50 85 Z" fill="#2B1810" />
      {/* Tikka */}
      <circle cx="100" cy="68" r="3" fill="#FF6B6B" />
      {/* Cheeks */}
      <circle cx="72" cy="108" r="9" fill={c.cheek} opacity="0.7" />
      <circle cx="128" cy="108" r="9" fill={c.cheek} opacity="0.7" />
      {/* Eyes */}
      <g>
        <circle cx="80" cy="93" r="8" fill="white" />
        <circle cx="120" cy="93" r="8" fill="white" />
        <circle cx="82" cy="95" r="5" fill="#2B1810" />
        <circle cx="122" cy="95" r="5" fill="#2B1810" />
        <circle cx="84" cy="93" r="1.6" fill="white" />
        <circle cx="124" cy="93" r="1.6" fill="white" />
      </g>
      {/* Smile */}
      <path d="M85 118 Q 100 132 115 118" stroke="#2B1810" strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* Arms */}
      <circle cx="55" cy="155" r="10" fill={c.skin} />
      <circle cx="145" cy="155" r="10" fill={c.skin} />
    </svg>
  );
}
