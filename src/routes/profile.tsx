import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/pq/PhoneFrame";
import { BottomNav } from "@/components/pq/BottomNav";
import { Mascot } from "@/components/pq/Mascot";
import { XPBar } from "@/components/pq/XPBar";
import { usePlayer } from "@/lib/player-store";
import { Flame, Trophy, BookOpen, LogOut } from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile — Pebble Quest" },
      { name: "description", content: "Your quest stats and settings." },
    ],
  }),
  component: Profile,
});

function Profile() {
  const navigate = useNavigate();
  const { player, update } = usePlayer();

  const reset = () => {
    update({ name: "" });
    void navigate({ to: "/" });
  };

  const stats = [
    { icon: Flame, label: "Streak", value: `${player.streak}d`, tone: "bg-gradient-coral" },
    { icon: Trophy, label: "Badges", value: player.badges.length, tone: "bg-gradient-warm" },
    { icon: BookOpen, label: "Lessons", value: 12, tone: "bg-gradient-teal" },
  ];

  return (
    <PhoneFrame>
      <div className="flex flex-col min-h-dvh sm:min-h-[820px]">
        <header className="bg-gradient-saffron text-white px-5 pt-8 pb-20 rounded-b-[2.5rem] text-center">
          <div className="inline-block bg-white/25 rounded-full p-2 ring-4 ring-white/50 backdrop-blur">
            <Mascot variant={player.avatar} size={96} />
          </div>
          <h1 className="text-2xl font-black mt-3">{player.name || "Friend"}</h1>
          <p className="text-sm opacity-95 font-semibold">Quest Buddy: {player.avatar}</p>
        </header>

        <div className="px-5 -mt-12">
          <div className="bg-card rounded-3xl p-4 shadow-card">
            <XPBar xp={player.xp} />
          </div>
        </div>

        <main className="px-5 pt-5 pb-6 flex-1 space-y-5">
          <div className="grid grid-cols-3 gap-3">
            {stats.map((s) => (
              <div key={s.label} className="bg-card rounded-2xl p-3 shadow-card text-center">
                <div className={`${s.tone} h-12 w-12 rounded-2xl mx-auto flex items-center justify-center text-white shadow-pop`}>
                  <s.icon size={20} strokeWidth={3} />
                </div>
                <p className="text-lg font-black mt-2 leading-none">{s.value}</p>
                <p className="text-[11px] font-bold text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="bg-card rounded-3xl p-4 shadow-card">
            <h2 className="text-lg font-extrabold mb-3">Subject Progress</h2>
            <div className="space-y-3">
              {([
                ["Stories", player.subjects.stories, "bg-gradient-teal"],
                ["Math", player.subjects.math, "bg-gradient-coral"],
                ["Science", player.subjects.science, "bg-gradient-warm"],
              ] as const).map(([label, val, tone]) => (
                <div key={label}>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span>{label}</span>
                    <span className="text-muted-foreground">{val}%</span>
                  </div>
                  <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${tone}`} style={{ width: `${val}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={reset}
            className="w-full min-h-[56px] rounded-2xl bg-muted font-extrabold text-foreground flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <LogOut size={18} strokeWidth={3} /> Start Over
          </button>
        </main>

        <BottomNav />
      </div>
    </PhoneFrame>
  );
}
