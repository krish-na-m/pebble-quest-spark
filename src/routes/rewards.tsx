import { createFileRoute } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/pq/PhoneFrame";
import { BottomNav } from "@/components/pq/BottomNav";
import { Confetti } from "@/components/pq/Confetti";
import { usePlayer } from "@/lib/player-store";
import { Lock } from "lucide-react";

export const Route = createFileRoute("/rewards")({
  head: () => ({
    meta: [
      { title: "Rewards — Pebble Quest" },
      { name: "description", content: "Your badge collection and recent achievements." },
    ],
  }),
  component: Rewards,
});

interface Badge {
  id: string;
  name: string;
  emoji: string;
  tone: string;
}

const allBadges: Badge[] = [
  { id: "first-step", name: "First Step", emoji: "👣", tone: "bg-gradient-teal" },
  { id: "math-whiz", name: "Math Whiz", emoji: "🧮", tone: "bg-gradient-coral" },
  { id: "story-teller", name: "Storyteller", emoji: "📖", tone: "bg-gradient-warm" },
  { id: "streak-5", name: "5-Day Fire", emoji: "🔥", tone: "bg-gradient-coral" },
  { id: "explorer", name: "Explorer", emoji: "🧭", tone: "bg-gradient-teal" },
  { id: "diya-lighter", name: "Diya Light", emoji: "🪔", tone: "bg-gradient-warm" },
  { id: "peacock", name: "Peacock Pro", emoji: "🦚", tone: "bg-gradient-teal" },
  { id: "science-star", name: "Science Star", emoji: "⭐", tone: "bg-gradient-warm" },
  { id: "champion", name: "Champion", emoji: "🏆", tone: "bg-gradient-coral" },
];

function Rewards() {
  const { player } = usePlayer();
  const earned = new Set(player.badges);
  const today = allBadges.find((b) => earned.has(b.id)) ?? allBadges[0];

  return (
    <PhoneFrame>
      <div className="flex flex-col min-h-dvh sm:min-h-[820px] relative">
        <Confetti />

        <header className="px-5 pt-8 pb-2 text-center relative z-10">
          <h1 className="text-3xl font-black">Your Rewards 🏆</h1>
          <p className="text-sm text-muted-foreground font-semibold mt-1">
            {earned.size} of {allBadges.length} badges unlocked
          </p>
        </header>

        <main className="px-5 pt-4 pb-6 flex-1 relative z-10">
          {/* Today's earned */}
          <div className="bg-gradient-warm text-white rounded-3xl p-5 shadow-pop relative overflow-hidden">
            <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full bg-white/20 blur-2xl" />
            <p className="text-xs font-extrabold uppercase tracking-widest opacity-90">You earned this today!</p>
            <div className="flex items-center gap-4 mt-3">
              <div className="bg-white/95 rounded-2xl h-20 w-20 flex items-center justify-center text-5xl shadow-pop animate-bounce-in">
                {today.emoji}
              </div>
              <div>
                <p className="text-2xl font-black leading-tight">{today.name}</p>
                <p className="text-sm opacity-95">+50 XP added to your level</p>
              </div>
            </div>
          </div>

          <h2 className="text-lg font-extrabold mt-6 mb-3 px-1">Badge Collection</h2>
          <div className="grid grid-cols-3 gap-3">
            {allBadges.map((b) => {
              const unlocked = earned.has(b.id);
              return (
                <div
                  key={b.id}
                  className="bg-card rounded-2xl p-3 flex flex-col items-center shadow-card aspect-square justify-center"
                >
                  <div
                    className={`h-14 w-14 rounded-2xl flex items-center justify-center text-3xl ${
                      unlocked ? b.tone + " shadow-pop" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {unlocked ? b.emoji : <Lock size={20} strokeWidth={3} />}
                  </div>
                  <p
                    className={`text-[11px] font-extrabold mt-2 text-center leading-tight ${
                      unlocked ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {unlocked ? b.name : "Locked"}
                  </p>
                </div>
              );
            })}
          </div>
        </main>

        <BottomNav />
      </div>
    </PhoneFrame>
  );
}
