import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/pq/PhoneFrame";
import { BottomNav } from "@/components/pq/BottomNav";
import { Lock, Star, Play } from "lucide-react";

export const Route = createFileRoute("/quest-map")({
  head: () => ({
    meta: [
      { title: "Quest Map — Pebble Quest" },
      { name: "description", content: "Travel the learning path stone by stone." },
    ],
  }),
  component: QuestMap,
});

const stones = [
  { name: "Village Start", emoji: "🏡", status: "done" as const },
  { name: "Peacock Pond", emoji: "🦚", status: "done" as const },
  { name: "Diya Bridge", emoji: "🪔", status: "current" as const },
  { name: "Spice Bazaar", emoji: "🌶️", status: "locked" as const },
  { name: "Tiger Forest", emoji: "🐯", status: "locked" as const },
  { name: "Star Temple", emoji: "⭐", status: "locked" as const },
];

function QuestMap() {
  return (
    <PhoneFrame>
      <div className="flex flex-col min-h-dvh sm:min-h-[820px] bg-gradient-to-b from-teal/20 via-background to-marigold/20">
        <header className="px-5 pt-8 pb-3 text-center">
          <h1 className="text-3xl font-black">Quest Map 🗺️</h1>
          <p className="text-sm text-muted-foreground font-semibold mt-1">Step by step, you'll get there!</p>
        </header>

        <main className="px-5 pb-6 flex-1">
          <div className="relative">
            {stones.map((s, i) => {
              const align = i % 2 === 0 ? "self-start" : "self-end";
              const isCurrent = s.status === "current";
              return (
                <div key={i} className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"} mb-4`}>
                  <div className={`${align} flex items-center gap-3 max-w-[80%]`}>
                    {i % 2 !== 0 && (
                      <div className="bg-card rounded-2xl shadow-card px-3 py-2">
                        <p className="text-sm font-extrabold leading-tight">{s.name}</p>
                        <p className="text-[11px] text-muted-foreground capitalize">{s.status}</p>
                      </div>
                    )}
                    <div
                      className={`relative h-20 w-20 rounded-3xl flex items-center justify-center text-4xl shadow-pop ${
                        s.status === "done"
                          ? "bg-gradient-teal"
                          : isCurrent
                            ? "bg-gradient-warm animate-float"
                            : "bg-muted"
                      }`}
                    >
                      {s.status === "locked" ? (
                        <Lock className="text-muted-foreground" size={28} strokeWidth={3} />
                      ) : (
                        <span>{s.emoji}</span>
                      )}
                      {s.status === "done" && (
                        <span className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-card">
                          <Star size={14} className="text-marigold" fill="currentColor" />
                        </span>
                      )}
                      {isCurrent && (
                        <Link
                          to="/lesson"
                          className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-coral text-white rounded-full px-3 py-1 text-[11px] font-extrabold shadow-pop flex items-center gap-1 min-h-[28px]"
                        >
                          <Play size={10} fill="currentColor" /> Play
                        </Link>
                      )}
                    </div>
                    {i % 2 === 0 && (
                      <div className="bg-card rounded-2xl shadow-card px-3 py-2">
                        <p className="text-sm font-extrabold leading-tight">{s.name}</p>
                        <p className="text-[11px] text-muted-foreground capitalize">{s.status}</p>
                      </div>
                    )}
                  </div>
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
