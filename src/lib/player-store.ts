import { useEffect, useState } from "react";

export type Avatar = "bunty" | "meera" | "arjun";

export interface PlayerState {
  name: string;
  avatar: Avatar;
  xp: number;
  streak: number;
  badges: string[];
  subjects: { stories: number; math: number; science: number };
}

const KEY = "pebble-quest-player";

const defaultState: PlayerState = {
  name: "",
  avatar: "bunty",
  xp: 240,
  streak: 5,
  badges: ["first-step", "math-whiz", "story-teller"],
  subjects: { stories: 60, math: 35, science: 80 },
};

export function loadPlayer(): PlayerState {
  if (typeof window === "undefined") return defaultState;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultState;
    return { ...defaultState, ...JSON.parse(raw) };
  } catch {
    return defaultState;
  }
}

export function savePlayer(p: PlayerState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(p));
}

export function usePlayer() {
  const [player, setPlayer] = useState<PlayerState>(defaultState);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setPlayer(loadPlayer());
    setReady(true);
  }, []);

  const update = (patch: Partial<PlayerState>) => {
    setPlayer((prev) => {
      const next = { ...prev, ...patch };
      savePlayer(next);
      return next;
    });
  };

  return { player, update, ready };
}

export function xpToLevel(xp: number) {
  const level = Math.floor(xp / 100) + 1;
  const progressInLevel = xp % 100;
  return { level, progressInLevel, nextLevelXp: 100 };
}

export const levelTitles = ["Pebble", "Sprout", "Explorer", "Adventurer", "Hero", "Legend"];
