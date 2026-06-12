import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { PhoneFrame } from "@/components/pq/PhoneFrame";
import { BottomNav } from "@/components/pq/BottomNav";
import { Mascot } from "@/components/pq/Mascot";
import { XPBar } from "@/components/pq/XPBar";
import { SubjectCard } from "@/components/pq/SubjectCard";
import { usePlayer } from "@/lib/player-store";
import { Flame, Bell } from "lucide-react";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "Home — Pebble Quest" },
      { name: "description", content: "Your daily learning dashboard. Pick a subject and continue the quest." },
    ],
  }),
  component: Home,
});

function Home() {
  const navigate = useNavigate();
  const { player, ready } = usePlayer();

  useEffect(() => {
    if (ready && !player.name) void navigate({ to: "/" });
  }, [ready, player.name, navigate]);

  return (
    <PhoneFrame>
      <div className="flex flex-col min-h-dvh sm:min-h-[820px]">
        {/* Header */}
        <header className="relative bg-gradient-saffron text-white px-5 pt-8 pb-16 rounded-b-[2.5rem]">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="bg-white/25 rounded-full p-1 ring-2 ring-white/60 backdrop-blur">
                <Mascot variant={player.avatar} size={52} animate={false} />
              </div>
              <div>
                <p className="text-xs font-bold opacity-90">Namaste,</p>
                <h1 className="text-2xl font-black leading-tight">{player.name || "Friend"} 👋</h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-white/25 backdrop-blur rounded-full px-3 py-1.5 min-h-[36px]">
                <Flame size={16} className="text-white" fill="currentColor" />
                <span className="font-extrabold text-sm">{player.streak}</span>
              </div>
              <button
                aria-label="Notifications"
                className="bg-white/25 backdrop-blur rounded-full h-11 w-11 flex items-center justify-center active:scale-95"
              >
                <Bell size={18} />
              </button>
            </div>
          </div>
        </header>

        {/* XP card overlap */}
        <div className="px-5 -mt-10">
          <div className="bg-card rounded-3xl p-4 shadow-card">
            <XPBar xp={player.xp} />
          </div>
        </div>

        <main className="px-5 pt-6 pb-6 flex-1 space-y-5">
          {/* Daily streak banner */}
          <div className="bg-gradient-coral text-white rounded-3xl p-4 flex items-center gap-3 shadow-card">
            <div className="bg-white/25 rounded-2xl h-12 w-12 flex items-center justify-center text-2xl">🔥</div>
            <div className="flex-1">
              <p className="font-extrabold leading-tight">{player.streak} day streak!</p>
              <p className="text-xs opacity-95">Play today to keep your fire burning</p>
            </div>
            <div className="text-xs font-extrabold bg-white/25 rounded-full px-2.5 py-1">+20 XP</div>
          </div>

          <div>
            <div className="flex items-baseline justify-between mb-3 px-1">
              <h2 className="text-xl font-extrabold">Today's Quests</h2>
              <span className="text-xs font-bold text-muted-foreground">3 subjects</span>
            </div>
            <div className="space-y-3">
              <SubjectCard
                title="Story Garden"
                subtitle="Tales from across India"
                progress={player.subjects.stories}
                tone="teal"
                emoji="📖"
              />
              <SubjectCard
                title="Math Mountain"
                subtitle="Climb with numbers"
                progress={player.subjects.math}
                tone="coral"
                emoji="🧮"
              />
              <SubjectCard
                title="Science Safari"
                subtitle="Discover the world"
                progress={player.subjects.science}
                tone="marigold"
                emoji="🔬"
              />
            </div>
          </div>

          {/* Daily mission */}
          <div className="bg-card border-2 border-dashed border-marigold rounded-3xl p-4 flex items-center gap-3">
            <span className="text-3xl" aria-hidden>🪔</span>
            <div className="flex-1">
              <p className="text-xs font-bold text-marigold uppercase tracking-wider">Daily Diya</p>
              <p className="text-sm font-extrabold leading-tight">Finish 1 lesson to light a diya</p>
            </div>
          </div>
        </main>

        <BottomNav />
      </div>
    </PhoneFrame>
  );
}
