"use client";
import { useState } from "react";
import { parseWords } from "@/lib/parseWords";
import { ThemeToggle } from "./ThemeToggle";

interface InputScreenProps {
  onStart: (words: string[]) => void;
}

const SAMPLES: { label: string; text: string }[] = [
  {
    label: "Woolf",
    text: "Mrs Dalloway said she would buy the flowers herself. For Lucy had her work cut out for her. The doors would be taken off their hinges; Rumpelmayer's men were coming. And then, thought Clarissa Dalloway, what a morning — fresh as if issued to children on a beach.",
  },
  {
    label: "Borges",
    text: "I have always imagined that Paradise will be a kind of library. Others see it as a garden, others, as a palace. I have always been arriving at it. Already I have written a few lines of which I am not entirely ashamed.",
  },
  {
    label: "Didion",
    text: "We tell ourselves stories in order to live. The princess is caged in the consulate. The man with the candy will lead the children into the sea. We look for the sermon in the suicide, for the social or moral lesson in the murder of five.",
  },
];

function estimateReadingTime(wordCount: number, wpm = 300): string {
  const minutes = wordCount / wpm;
  if (minutes < 1) return "under a minute";
  if (minutes < 1.5) return "about a minute";
  return `about ${Math.round(minutes)} minutes`;
}

export default function InputScreen({ onStart }: InputScreenProps) {
  const [text, setText] = useState("");

  const handleStart = () => {
    const words = parseWords(text);
    if (words.length === 0) return;
    onStart(words);
  };

  const wordCount = parseWords(text).length;

  return (
    <div className="min-h-screen relative grain" style={{ background: "var(--bg)" }}>
      <div className="absolute top-6 right-6 z-10">
        <ThemeToggle />
      </div>

      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16">
        <div className="w-full max-w-2xl flex flex-col gap-12">

          {/* Masthead */}
          <header className="flex flex-col items-center text-center gap-3">
            <div
              className="font-mono uppercase tracking-[0.42em]"
              style={{ fontSize: "10px", color: "var(--muted)" }}
            >
              ❦ &nbsp;Vol. I &nbsp;·&nbsp; No. 01&nbsp; ❦
            </div>

            <h1
              className="font-serif leading-none"
              style={{
                fontSize: "clamp(3rem, 8vw, 5.5rem)",
                fontVariationSettings: '"opsz" 144, "SOFT" 100, "WONK" 1',
                letterSpacing: "-0.025em",
              }}
            >
              The Reader
              <span style={{ color: "var(--accent)" }}>.</span>
            </h1>

            <div className="flex items-center gap-3 mt-1" style={{ color: "var(--muted)" }}>
              <span className="h-px w-10" style={{ background: "var(--hairline-strong)" }} />
              <span
                className="font-serif italic text-sm"
                style={{ fontVariationSettings: '"opsz" 18' }}
              >
                a studio for rapid reading
              </span>
              <span className="h-px w-10" style={{ background: "var(--hairline-strong)" }} />
            </div>
          </header>

          {/* Sample texts */}
          <div className="flex items-center justify-center gap-1 -mt-4">
            <span
              className="font-mono uppercase tracking-[0.3em] pr-2"
              style={{ fontSize: "9px", color: "var(--muted)" }}
            >
              try
            </span>
            {SAMPLES.map((s, i) => (
              <button
                key={s.label}
                onClick={() => setText(s.text)}
                className="font-serif italic text-sm hover:underline underline-offset-4 px-2"
                style={{ color: "var(--ink-soft)" }}
              >
                {s.label}
                {i < SAMPLES.length - 1 && (
                  <span className="ml-3" style={{ color: "var(--hairline-strong)" }}>·</span>
                )}
              </button>
            ))}
          </div>

          {/* Textarea with editorial label */}
          <div className="relative">
            <div
              className="absolute -top-2.5 left-5 px-2 font-mono uppercase tracking-[0.32em] z-10"
              style={{
                fontSize: "9px",
                color: "var(--muted)",
                background: "var(--bg)",
              }}
            >
              Manuscript
            </div>
            <textarea
              className="w-full h-64 bg-transparent text-base font-serif leading-relaxed p-6 pt-5 resize-none focus:outline-none placeholder:italic transition-colors"
              style={{
                border: "1px solid var(--hairline)",
                color: "var(--ink)",
                fontVariationSettings: '"opsz" 16',
              }}
              placeholder="…paste your passage, an essay, a chapter."
              value={text}
              onChange={(e) => setText(e.target.value)}
              autoFocus
            />
          </div>

          {/* Footer rule */}
          <div className="flex items-end justify-between gap-6">
            {/* Stats column */}
            <div className="flex flex-col gap-1.5" style={{ color: "var(--muted)" }}>
              {wordCount > 0 ? (
                <>
                  <div className="flex items-baseline gap-2">
                    <span
                      className="font-mono tabular-nums"
                      style={{ fontSize: "11px", letterSpacing: "0.08em", color: "var(--ink)" }}
                    >
                      {wordCount.toLocaleString()}
                    </span>
                    <span
                      className="font-mono uppercase tracking-[0.3em]"
                      style={{ fontSize: "9px" }}
                    >
                      words
                    </span>
                  </div>
                  <div
                    className="font-serif italic"
                    style={{ fontSize: "12px" }}
                  >
                    {estimateReadingTime(wordCount)} at 300 wpm
                  </div>
                </>
              ) : (
                <span
                  className="font-mono uppercase tracking-[0.3em]"
                  style={{ fontSize: "9px" }}
                >
                  awaiting text
                </span>
              )}
            </div>

            {/* Right cluster: kbd + begin */}
            <div className="flex flex-col items-end gap-3">
              <div className="flex items-center gap-2 font-mono uppercase tracking-[0.2em]" style={{ fontSize: "9px", color: "var(--muted)" }}>
                <kbd>SPACE</kbd>
                <span>play</span>
                <span style={{ color: "var(--hairline-strong)" }}>·</span>
                <kbd>↑</kbd>
                <kbd>↓</kbd>
                <span>tempo</span>
              </div>
              <button
                onClick={handleStart}
                disabled={wordCount === 0}
                className="group inline-flex items-baseline gap-3 font-serif italic transition-colors disabled:opacity-30"
                style={{
                  fontSize: "1.5rem",
                  color: wordCount === 0 ? "var(--muted)" : "var(--accent)",
                  fontVariationSettings: '"opsz" 36, "WONK" 1',
                }}
              >
                Begin reading
                <span
                  className="not-italic font-serif"
                  style={{ fontSize: "1.25rem", color: "var(--accent)" }}
                >
                  ⟶
                </span>
              </button>
            </div>
          </div>

          {/* Colophon */}
          <div
            className="text-center font-mono uppercase tracking-[0.4em] mt-4"
            style={{ fontSize: "9px", color: "var(--hairline-strong)" }}
          >
            — set in Fraunces &amp; JetBrains Mono —
          </div>
        </div>
      </div>
    </div>
  );
}
