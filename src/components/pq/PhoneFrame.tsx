import type { ReactNode } from "react";

export function PhoneFrame({ children, gradient = false }: { children: ReactNode; gradient?: boolean }) {
  return (
    <div className="min-h-dvh w-full bg-muted flex items-start sm:items-center justify-center sm:p-6">
      <div
        className={`relative w-full max-w-[420px] min-h-dvh sm:min-h-[820px] sm:rounded-[2.5rem] overflow-hidden sm:shadow-card ${
          gradient ? "bg-gradient-saffron" : "bg-background"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
