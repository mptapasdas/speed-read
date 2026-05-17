"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-7 h-7" />;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className={`w-7 h-7 flex items-center justify-center rounded-full transition-colors ${className}`}
      style={{
        color: "var(--muted)",
        border: "1px solid var(--hairline)",
      }}
    >
      {isDark ? (
        /* Sun — minimal */
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" className="w-3.5 h-3.5">
          <circle cx="8" cy="8" r="2.5" />
          <path d="M8 1.5v1.5M8 13v1.5M1.5 8h1.5M13 8h1.5M3.4 3.4l1 1M11.6 11.6l1 1M3.4 12.6l1-1M11.6 4.4l1-1" />
        </svg>
      ) : (
        /* Moon — crescent */
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
          <path d="M6.5 2.25C4 3 2 5.3 2 8.25A6 6 0 0 0 8 14.25c2.95 0 5.25-2 6-4.5A5 5 0 0 1 6.5 2.25Z" />
        </svg>
      )}
    </button>
  );
}
