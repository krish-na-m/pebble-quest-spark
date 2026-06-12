import { xpToLevel, levelTitles } from "@/lib/player-store";

export function XPBar({ xp, compact = false }: { xp: number; compact?: boolean }) {
  const { level, progressInLevel, nextLevelXp } = xpToLevel(xp);
  const title = levelTitles[Math.min(level - 1, levelTitles.length - 1)];
  const pct = (progressInLevel / nextLevelXp) * 100;
  return (
    <div className={`flex items-center gap-3 ${compact ? "" : "w-full"}`}>
      <div className="flex items-center gap-1.5 bg-gradient-warm text-white rounded-full px-3 py-1.5 shadow-pop">
        <span className="text-base">🌟</span>
        <span className="text-xs font-extrabold whitespace-nowrap">L{level}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between mb-1">
          <span className="text-[11px] font-bold text-foreground truncate">{title}</span>
          <span className="text-[10px] font-bold text-muted-foreground">{progressInLevel}/{nextLevelXp} XP</span>
        </div>
        <div className="h-2.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-warm rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  );
}
