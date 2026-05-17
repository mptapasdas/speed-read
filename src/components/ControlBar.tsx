"use client";
import { ThemeToggle } from "./ThemeToggle";

interface ControlBarProps {
  wpm: number;
  setWpm: (wpm: number) => void;
  isPlaying: boolean;
  togglePlay: () => void;
  currentIndex: number;
  totalWords: number;
  onExit: () => void;
  visible: boolean;
}

const PRESETS = [200, 300, 400, 500, 700];

export default function ControlBar({
  wpm,
  setWpm,
  isPlaying,
  togglePlay,
  currentIndex,
  totalWords,
  onExit,
  visible,
}: ControlBarProps) {
  const percent = totalWords > 0 ? Math.min(100, ((currentIndex + 1) / totalWords) * 100) : 0;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-30 transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Progress bar — single hairline */}
      <div className="w-full h-px" style={{ background: "var(--hairline)" }}>
        <div
          className="h-full transition-all duration-200"
          style={{ width: `${percent}%`, background: "var(--accent)" }}
        />
      </div>

      <div
        className="backdrop-blur-md px-6 py-5"
        style={{
          background: "color-mix(in srgb, var(--bg) 88%, transparent)",
          borderTop: "1px solid var(--hairline)",
        }}
      >
        <div className="max-w-3xl mx-auto flex flex-col gap-4">

          {/* Top row: editorial header */}
          <div className="flex items-baseline justify-between">
            {/* Exit (left) */}
            <button
              onClick={onExit}
              className="font-mono uppercase tracking-[0.32em] transition-opacity hover:opacity-100"
              style={{ fontSize: "9px", color: "var(--muted)", opacity: 0.8 }}
            >
              ← &nbsp;Library
            </button>

            {/* Folio (center) */}
            <div className="flex items-center gap-2.5 font-mono tabular-nums" style={{ fontSize: "10px", color: "var(--muted)" }}>
              <span style={{ color: "var(--ink)" }}>{String(currentIndex + 1).padStart(String(totalWords).length, "0")}</span>
              <span style={{ color: "var(--hairline-strong)" }}>—</span>
              <span>{totalWords}</span>
            </div>

            {/* Theme (right) */}
            <ThemeToggle />
          </div>

          {/* Tempo: slider with labels */}
          <div className="flex items-center gap-4">
            <span
              className="font-mono uppercase tracking-[0.32em] shrink-0"
              style={{ fontSize: "9px", color: "var(--muted)" }}
            >
              Tempo
            </span>
            <span
              className="font-mono tabular-nums shrink-0"
              style={{ fontSize: "10px", color: "var(--muted)" }}
            >
              50
            </span>
            <input
              type="range"
              min={50}
              max={1000}
              step={10}
              value={wpm}
              onChange={(e) => setWpm(Number(e.target.value))}
              className="flex-1"
              aria-label="Words per minute"
            />
            <span
              className="font-mono tabular-nums shrink-0"
              style={{ fontSize: "10px", color: "var(--muted)" }}
            >
              1000
            </span>
            <div className="flex items-baseline gap-1 shrink-0" style={{ minWidth: 60 }}>
              <span
                className="font-mono tabular-nums"
                style={{ fontSize: "20px", fontWeight: 500, color: "var(--ink)" }}
              >
                {wpm}
              </span>
              <span
                className="font-mono uppercase tracking-[0.2em]"
                style={{ fontSize: "8px", color: "var(--muted)" }}
              >
                wpm
              </span>
            </div>
          </div>

          {/* Bottom row: presets + play */}
          <div className="flex items-center justify-between gap-6">
            {/* Preset chips */}
            <div
              className="flex items-center"
              style={{ border: "1px solid var(--hairline)" }}
            >
              {PRESETS.map((p, i) => {
                const active = wpm === p;
                return (
                  <button
                    key={p}
                    onClick={() => setWpm(p)}
                    className="font-mono tabular-nums px-3 py-1.5 transition-colors"
                    style={{
                      fontSize: "10px",
                      color: active ? "var(--bg)" : "var(--ink-soft)",
                      background: active ? "var(--ink)" : "transparent",
                      borderLeft: i === 0 ? "none" : "1px solid var(--hairline)",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {p}
                  </button>
                );
              })}
            </div>

            {/* Keyboard hints */}
            <div
              className="hidden sm:flex items-center gap-2 font-mono uppercase tracking-[0.2em]"
              style={{ fontSize: "9px", color: "var(--muted)" }}
            >
              <kbd>SPACE</kbd>
              <span>{isPlaying ? "pause" : "play"}</span>
            </div>

            {/* Play / Pause */}
            <button
              onClick={togglePlay}
              className="group inline-flex items-baseline gap-2.5 font-serif italic transition-colors"
              style={{
                fontSize: "1.125rem",
                color: "var(--accent)",
                fontVariationSettings: '"opsz" 30, "WONK" 1',
              }}
            >
              {isPlaying ? "Pause" : "Play"}
              <span className="not-italic font-mono" style={{ fontSize: "12px", color: "var(--accent)" }}>
                {isPlaying ? "❚❚" : "▸"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
