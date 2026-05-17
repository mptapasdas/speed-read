"use client";
import React, { memo } from "react";

interface WordDisplayProps {
  word: string;
  pivotIndex: number;
}

const WordDisplay = memo(function WordDisplay({ word, pivotIndex }: WordDisplayProps) {
  const pre = word.slice(0, pivotIndex);
  const pivot = word[pivotIndex] ?? "";
  const post = word.slice(pivotIndex + 1);

  return (
    <div className="relative flex items-center justify-center w-full select-none">
      {/* Reading zone — corner brackets */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "min(640px, 80vw)",
          height: "min(220px, 38vh)",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* TL */}
        <span className="absolute top-0 left-0 w-3 h-3 border-t border-l" style={{ borderColor: "var(--hairline-strong)" }} />
        {/* TR */}
        <span className="absolute top-0 right-0 w-3 h-3 border-t border-r" style={{ borderColor: "var(--hairline-strong)" }} />
        {/* BL */}
        <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l" style={{ borderColor: "var(--hairline-strong)" }} />
        {/* BR */}
        <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r" style={{ borderColor: "var(--hairline-strong)" }} />
      </div>

      {/* ORP vertical tick — runs through the reading zone */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "calc(50% - min(110px, 19vh))",
          height: "min(220px, 38vh)",
          left: "50%",
          width: "1px",
          transform: "translateX(-50%)",
          background: "linear-gradient(to bottom, transparent 0%, var(--accent) 30%, var(--accent) 70%, transparent 100%)",
          opacity: 0.18,
        }}
      />

      {/* ORP top mark */}
      <div
        className="absolute pointer-events-none flex items-center justify-center"
        style={{
          top: "calc(50% - min(110px, 19vh) - 14px)",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <span
          className="font-mono"
          style={{
            fontSize: "10px",
            color: "var(--accent)",
            letterSpacing: 0,
          }}
        >
          ▾
        </span>
      </div>

      {/* The word */}
      <div
        className="relative flex items-baseline font-mono"
        style={{
          fontSize: "clamp(2.75rem, 6.5vw, 5rem)",
          minWidth: "20ch",
          letterSpacing: "-0.01em",
        }}
      >
        <span
          className="text-right"
          style={{
            width: "10ch",
            display: "inline-block",
            color: "var(--ink)",
          }}
        >
          {pre}
        </span>

        <span
          style={{
            width: "1ch",
            display: "inline-block",
            textAlign: "center",
            color: "var(--accent)",
          }}
        >
          {pivot}
        </span>

        <span
          className="text-left"
          style={{
            width: "10ch",
            display: "inline-block",
            color: "var(--ink)",
          }}
        >
          {post}
        </span>
      </div>
    </div>
  );
});

export default WordDisplay;
