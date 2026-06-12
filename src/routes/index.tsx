import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PhoneFrame } from "@/components/pq/PhoneFrame";
import { RangoliBorders } from "@/components/pq/Rangoli";
import { Mascot } from "@/components/pq/Mascot";
import { loadPlayer, savePlayer, type Avatar } from "@/lib/player-store";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pebble Quest — A magical learning adventure for kids" },
      { name: "description", content: "Gamified learning for ages 6–12. Stories, math, and science with Bunty the mascot." },
      { property: "og:title", content: "Pebble Quest" },
      { property: "og:description", content: "A magical learning adventure for kids ages 6–12." },
    ],
  }),
  component: Onboarding,
});

const avatars: { id: Avatar; name: string; bg: string }[] = [
  { id: "bunty", name: "Bunty", bg: "bg-gradient-teal" },
  { id: "meera", name: "Meera", bg: "bg-gradient-coral" },
  { id: "arjun", name: "Arjun", bg: "bg-gradient-warm" },
];

function Onboarding() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState<Avatar>("bunty");

  useEffect(() => {
    const p = loadPlayer();
    if (p.name) {
      void navigate({ to: "/home" });
    }
  }, [navigate]);

  const start = () => {
    const trimmed = name.trim() || "Friend";
    const p = loadPlayer();
    savePlayer({ ...p, name: trimmed, avatar });
    void navigate({ to: "/home" });
  };

  return (
    <PhoneFrame gradient>
      <div className="relative min-h-dvh sm:min-h-[820px] px-6 pt-10 pb-8 flex flex-col">
        <RangoliBorders tone="white" />

        <div className="relative z-10 text-center text-white">
          <p className="text-sm font-bold tracking-widest uppercase opacity-90">Welcome to</p>
          <h1 className="text-5xl font-black mt-1 drop-shadow-[0_2px_0_rgba(0,0,0,0.15)]">Pebble Quest</h1>
          <p className="text-sm mt-2 opacity-95 font-semibold">Adventure awaits, little explorer ✨</p>
        </div>

        <div className="relative z-10 flex justify-center mt-6">
          <div className="relative">
            <div className="absolute inset-0 -m-4 bg-white/30 rounded-full blur-2xl" />
            <Mascot variant={avatar} size={180} />
          </div>
        </div>

        <div className="relative z-10 mt-6 bg-card rounded-[2rem] p-5 shadow-card flex-1 flex flex-col">
          <label htmlFor="name" className="text-base font-extrabold">What's your name?</label>
          <p className="text-xs text-muted-foreground mb-3">Bunty wants to know who's joining the quest!</p>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Type your name..."
            maxLength={20}
            className="w-full bg-muted rounded-2xl px-5 py-4 text-lg font-bold placeholder:text-muted-foreground/60 focus:outline-none focus:ring-4 focus:ring-marigold/40 min-h-[56px]"
          />

          <p className="text-base font-extrabold mt-5 mb-1">Pick your buddy</p>
          <p className="text-xs text-muted-foreground mb-3">Who will join you on the quest?</p>
          <div className="grid grid-cols-3 gap-3">
            {avatars.map((a) => {
              const selected = avatar === a.id;
              return (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => setAvatar(a.id)}
                  aria-pressed={selected}
                  aria-label={`Choose ${a.name}`}
                  className={`relative rounded-2xl p-2 min-h-[110px] flex flex-col items-center justify-end transition-all active:scale-95 ${
                    a.bg
                  } ${selected ? "ring-4 ring-marigold scale-105 shadow-pop" : "opacity-80"}`}
                >
                  <div className="absolute inset-x-0 top-1 flex justify-center">
                    <Mascot variant={a.id} size={84} animate={false} />
                  </div>
                  <span className="relative bg-white/95 rounded-full px-3 py-0.5 text-xs font-extrabold text-foreground">
                    {a.name}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={start}
            className="mt-auto bg-gradient-warm text-white font-extrabold text-lg rounded-2xl py-4 min-h-[56px] shadow-pop active:scale-[0.98] transition-transform flex items-center justify-center gap-2 mt-6"
          >
            Start my Quest <ArrowRight size={22} strokeWidth={3} />
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}
