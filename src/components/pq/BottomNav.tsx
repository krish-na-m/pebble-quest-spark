import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Map, Trophy, User } from "lucide-react";

const items = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/quest-map", label: "Quest", icon: Map },
  { to: "/rewards", label: "Rewards", icon: Trophy },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav
      className="sticky bottom-0 left-0 right-0 bg-card/95 backdrop-blur border-t border-border px-2 pt-2 pb-3 z-30"
      aria-label="Main navigation"
    >
      <ul className="flex items-end justify-around">
        {items.map(({ to, label, icon: Icon }) => {
          const active = pathname === to;
          return (
            <li key={to}>
              <Link
                to={to}
                className="flex flex-col items-center justify-center min-w-[64px] min-h-[56px] gap-1 rounded-2xl px-2 py-1 transition-transform active:scale-95"
                aria-label={label}
              >
                <span
                  className={`flex items-center justify-center h-11 w-11 rounded-2xl transition-all ${
                    active ? "bg-gradient-warm shadow-pop -translate-y-3 text-white" : "text-muted-foreground"
                  }`}
                >
                  <Icon size={active ? 24 : 22} strokeWidth={2.5} />
                </span>
                <span className={`text-[11px] font-bold ${active ? "text-foreground" : "text-muted-foreground"}`}>
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
