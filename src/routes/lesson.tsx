import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PhoneFrame } from "@/components/pq/PhoneFrame";
import { ArrowLeft, Heart, Check, X } from "lucide-react";

export const Route = createFileRoute("/lesson")({
  head: () => ({
    meta: [
      { title: "Lesson — Pebble Quest" },
      { name: "description", content: "Answer questions and earn XP." },
    ],
  }),
  component: Lesson,
});

interface Question {
  q: string;
  options: string[];
  correct: number;
  hint?: string;
}

const questions: Question[] = [
  { q: "A peacock has beautiful tail feathers. How many legs does it have?", options: ["2", "4", "6", "8"], correct: 0 },
  { q: "12 + 9 = ?", options: ["19", "20", "21", "22"], correct: 2 },
  { q: "Which festival uses diyas to light up homes?", options: ["Holi", "Diwali", "Eid", "Pongal"], correct: 1 },
  { q: "Which planet is closest to the Sun?", options: ["Earth", "Mars", "Venus", "Mercury"], correct: 3 },
  { q: "Tigers live in jungles. What do they eat?", options: ["Grass", "Fruit", "Meat", "Leaves"], correct: 2 },
];

function Lesson() {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [state, setState] = useState<"idle" | "correct" | "wrong">("idle");
  const [hearts, setHearts] = useState(3);
  const [done, setDone] = useState(false);

  const q = questions[idx];
  const progress = ((idx + (state !== "idle" ? 1 : 0)) / questions.length) * 100;

  const choose = (i: number) => {
    if (state !== "idle") return;
    setSelected(i);
    const correct = i === q.correct;
    setState(correct ? "correct" : "wrong");
    if (!correct) setHearts((h) => Math.max(0, h - 1));
    setTimeout(() => {
      if (idx + 1 >= questions.length) {
        setDone(true);
      } else {
        setIdx(idx + 1);
        setSelected(null);
        setState("idle");
      }
    }, 1200);
  };

  if (done) {
    return (
      <PhoneFrame>
        <div className="flex flex-col items-center justify-center min-h-dvh sm:min-h-[820px] p-6 text-center bg-gradient-saffron text-white">
          <div className="text-7xl animate-bounce-in">🎉</div>
          <h2 className="text-3xl font-black mt-4">Lesson Complete!</h2>
          <p className="opacity-95 mt-2">You earned 50 XP and a new badge</p>
          <Link
            to="/rewards"
            className="mt-8 bg-white text-marigold font-extrabold px-8 py-4 rounded-2xl shadow-pop min-h-[56px] flex items-center"
          >
            See Rewards
          </Link>
          <Link to="/home" className="mt-3 text-white/90 font-bold underline-offset-4 underline min-h-[44px] flex items-center">
            Back to Home
          </Link>
        </div>
      </PhoneFrame>
    );
  }

  return (
    <PhoneFrame>
      <div className="flex flex-col min-h-dvh sm:min-h-[820px]">
        {/* Top bar */}
        <div className="px-5 pt-6 pb-3 flex items-center gap-3">
          <Link
            to="/home"
            aria-label="Back"
            className="h-11 w-11 rounded-2xl bg-muted flex items-center justify-center active:scale-95"
          >
            <ArrowLeft size={20} strokeWidth={3} />
          </Link>
          <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-warm rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center gap-1 bg-coral/15 text-coral rounded-full px-3 py-1.5 min-h-[36px]">
            <Heart size={16} fill="currentColor" />
            <span className="font-extrabold text-sm">{hearts}</span>
          </div>
        </div>

        {/* Illustrated header */}
        <div className="mx-5 mt-2 rounded-3xl bg-gradient-teal h-40 relative overflow-hidden flex items-center justify-center shadow-card">
          <div className="absolute inset-0 opacity-30" aria-hidden>
            <svg viewBox="0 0 400 200" className="w-full h-full">
              <circle cx="60" cy="40" r="18" fill="#FFD56B" />
              <path d="M0 160 Q 100 120 200 150 T 400 140 L400 200 L0 200 Z" fill="#FFF8F0" opacity="0.4" />
              <path d="M0 180 Q 120 150 240 175 T 400 170 L400 200 L0 200 Z" fill="#FFF8F0" opacity="0.5" />
            </svg>
          </div>
          <div className="text-7xl relative animate-float" aria-hidden>
            {state === "correct" ? "🌟" : state === "wrong" ? "💧" : "🦚"}
          </div>
          <div className="absolute bottom-2 left-3 bg-white/90 rounded-full px-3 py-1 text-[11px] font-extrabold">
            Question {idx + 1} of {questions.length}
          </div>
        </div>

        {/* Question */}
        <main className="px-5 mt-5 flex-1 flex flex-col">
          <h2 className="text-xl font-extrabold leading-snug">{q.q}</h2>

          <div className="mt-5 space-y-3">
            {q.options.map((opt, i) => {
              const isSelected = selected === i;
              const isCorrect = state !== "idle" && i === q.correct;
              const isWrong = state === "wrong" && isSelected;
              const letter = String.fromCharCode(65 + i);
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => choose(i)}
                  disabled={state !== "idle"}
                  className={`w-full min-h-[64px] rounded-2xl px-4 py-3 flex items-center gap-3 text-left font-extrabold transition-all border-2 active:scale-[0.98] ${
                    isCorrect
                      ? "bg-green-100 border-green-400 text-green-900 animate-burst"
                      : isWrong
                        ? "bg-red-50 border-red-400 text-red-900 animate-shake"
                        : "bg-card border-border hover:border-marigold"
                  }`}
                >
                  <span
                    className={`h-10 w-10 rounded-xl flex items-center justify-center text-base font-black shrink-0 ${
                      isCorrect
                        ? "bg-green-500 text-white"
                        : isWrong
                          ? "bg-red-500 text-white"
                          : "bg-muted text-foreground"
                    }`}
                  >
                    {isCorrect ? <Check size={20} strokeWidth={3} /> : isWrong ? <X size={20} strokeWidth={3} /> : letter}
                  </span>
                  <span className="text-base">{opt}</span>
                </button>
              );
            })}
          </div>

          {state !== "idle" && (
            <div
              className={`mt-5 rounded-2xl p-4 font-extrabold text-center animate-bounce-in ${
                state === "correct"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-50 text-red-800"
              }`}
            >
              {state === "correct" ? "🎉 Shabaash! That's correct!" : "💛 Not quite — keep trying!"}
            </div>
          )}
        </main>

        <div className="h-6" />
      </div>
    </PhoneFrame>
  );
}
