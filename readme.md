# Pebble Quest 🪨✨
A gamified, mobile-first learning adventure for kids ages 6–12. Built with warm Indian-inspired visuals, friendly mascots, and bite-sized lessons across Stories, Math, and Science.
## Features
- **Onboarding** — Pick a name and choose a buddy mascot (Bunty, Meera, or Arjun).
- **Home Dashboard** — XP bar, level, daily streak, and subject cards with progress rings.
- **Lessons** — Interactive Q&A with celebratory bursts for correct answers and gentle shake feedback for mistakes. Heart-based health system.
- **Quest Map** — Visual stone-by-stone progression path showing completed, current, and locked milestones.
- **Rewards** — Badge collection grid with unlock animations and confetti.
- **Profile** — View player stats and progress.
## Design
- **Palette:** marigold `#F5A623`, teal `#00A896`, coral `#FF6B6B`, cream `#FFF8F0`
- **Typography:** Fredoka (display) + Nunito (body) — large, rounded, friendly
- **Cultural details:** Rangoli/kolam-inspired corner borders, diya motifs, regional names
- **Mobile-first:** designed for 375px width, min 44px tap targets, fully rounded UI
## Tech Stack
- **Framework:** TanStack Start (React 19 + Vite 7)
- **Styling:** Tailwind CSS v4 with custom design tokens in `src/styles.css`
- **Routing:** TanStack Router (file-based, in `src/routes/`)
- **State:** Local player state persisted to `localStorage` via `src/lib/player-store.ts`
## Project Structure
```
src/
├── components/pq/      # Reusable game components
│   ├── BottomNav.tsx
│   ├── Confetti.tsx
│   ├── Mascot.tsx
│   ├── PhoneFrame.tsx
│   ├── Rangoli.tsx
│   ├── SubjectCard.tsx
│   └── XPBar.tsx
├── components/ui/      # shadcn primitives
├── lib/
│   └── player-store.ts # Player state + XP/level helpers
├── routes/
│   ├── __root.tsx      # Root layout, fonts, meta
│   ├── index.tsx       # Onboarding
│   ├── home.tsx        # Dashboard
│   ├── lesson.tsx      # Interactive Q&A
│   ├── quest-map.tsx   # Progression path
│   ├── rewards.tsx     # Badges
│   └── profile.tsx     # Player profile
└── styles.css          # Theme tokens, animations, utilities
```
## Getting Started
```bash
bun install
bun run dev
```
Open the preview and start your quest!
## Accessibility
- Minimum 44px tap targets across all interactive elements
- High-contrast text on warm backgrounds
- `aria-pressed` / `aria-label` on selection controls
- Semantic headings and landmarks
