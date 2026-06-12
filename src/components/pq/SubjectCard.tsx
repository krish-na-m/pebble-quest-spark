import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

type Tone = "teal" | "coral" | "marigold";

const tones: Record<Tone, { bg: string; ring: string; emoji: string }> = {
  teal: { bg: "bg-gradient-teal", ring: "stroke-teal", emoji: "📖" },
  coral: { bg: "bg-gradient-coral", ring: "stroke-coral", emoji: "🔢" },
  marigold: { bg: "bg-gradient-warm", ring: "stroke-marigold", emoji: "🔬" },
};

export function SubjectCard({
  title,
  subtitle,
  progress,
  tone,
  emoji,
  to = "/lesson",
}: {
  title: string;
  subtitle: string;
  progress: number;
  tone: Tone;
  emoji?: string;
  to?: string;
}) {
  const t = tones[tone];
  const r = 26;
  const c = 2 * Math.PI * r;
  const offset = c - (progress / 100) * c;
  return (
    <div className="bg-card rounded-3xl p-4 shadow-card flex items-center gap-4 active:scale-[0.98] transition-transform">
      <div className={`${t.bg} rounded-2xl h-16 w-16 flex items-center justify-center shadow-pop shrink-0`}>
        <span className="text-3xl" aria-hidden>{emoji ?? t.emoji}</span>
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-extrabold leading-tight">{title}</h3>
        <p className="text-xs text-muted-foreground mb-2">{subtitle}</p>
        <Link
          to={to}
          className="inline-flex items-center gap-1 text-xs font-bold text-foreground bg-muted rounded-full px-3 py-1.5 min-h-[36px] active:scale-95"
        >
          Continue <ChevronRight size={14} strokeWidth={3} />
        </Link>
      </div>
      <div className="relative shrink-0">
        <svg width="64" height="64" viewBox="0 0 64 64" className="-rotate-90">
          <circle cx="32" cy="32" r={r} className="stroke-muted" strokeWidth="6" fill="none" />
          <circle
            cx="32"
            cy="32"
            r={r}
            className={t.ring}
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 0.8s ease" }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-xs font-extrabold">
          {progress}%
        </span>
      </div>
    </div>
  );
}
