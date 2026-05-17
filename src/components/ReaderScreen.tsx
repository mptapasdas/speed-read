"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import WordDisplay from "./WordDisplay";
import ControlBar from "./ControlBar";
import { useWordTimer } from "@/hooks/useWordTimer";
import { useFocusMode } from "@/hooks/useFocusMode";
import { useKeyboard } from "@/hooks/useKeyboard";
import { getOrpIndex } from "@/lib/orp";

interface ReaderScreenProps {
  words: string[];
  onExit: () => void;
}

export default function ReaderScreen({ words, onExit }: ReaderScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wpm, setWpm] = useState(300);
  const [isPlaying, setIsPlaying] = useState(false);

  const wpmRef = useRef(wpm);
  useEffect(() => { wpmRef.current = wpm; }, [wpm]);

  const isComplete = currentIndex >= words.length - 1;

  const advance = useCallback(() => {
    setCurrentIndex((i) => {
      if (i >= words.length - 1) {
        setIsPlaying(false);
        return i;
      }
      return i + 1;
    });
  }, [words.length]);

  const togglePlay = useCallback(() => {
    setIsPlaying((p) => {
      if (isComplete) return false;
      return !p;
    });
  }, [isComplete]);

  const adjustWpm = useCallback((delta: number) => {
    setWpm((w) => Math.min(1000, Math.max(50, w + delta)));
  }, []);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === "hidden") setIsPlaying(false);
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  useWordTimer({ isPlaying, wpm, onAdvance: advance });
  const { showControls } = useFocusMode(!isPlaying);
  useKeyboard(togglePlay, adjustWpm);

  const word = words[currentIndex] ?? "";
  const pivotIndex = getOrpIndex(word);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden grain vignette"
      style={{ background: "var(--bg)" }}
    >
      {/* Top folio plate — index and total in editorial style */}
      <div
        className={`absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-3 transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
        style={{ color: "var(--muted)" }}
      >
        <span className="h-px w-8" style={{ background: "var(--hairline-strong)" }} />
        <span
          className="font-mono uppercase tracking-[0.4em] tabular-nums"
          style={{ fontSize: "10px" }}
        >
          §&nbsp; folio {currentIndex + 1} / {words.length}
        </span>
        <span className="h-px w-8" style={{ background: "var(--hairline-strong)" }} />
      </div>

      {/* Completion mark */}
      {isComplete && !isPlaying && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span
            className="font-serif italic"
            style={{
              fontSize: "1.25rem",
              color: "var(--accent)",
              fontVariationSettings: '"opsz" 30, "WONK" 1',
            }}
          >
            Finis.
          </span>
          <span
            className="font-mono uppercase tracking-[0.32em]"
            style={{ fontSize: "9px", color: "var(--muted)" }}
          >
            {words.length.toLocaleString()} words read
          </span>
        </div>
      )}

      <WordDisplay word={word} pivotIndex={pivotIndex} />

      <ControlBar
        wpm={wpm}
        setWpm={setWpm}
        isPlaying={isPlaying}
        togglePlay={togglePlay}
        currentIndex={currentIndex}
        totalWords={words.length}
        onExit={onExit}
        visible={showControls}
      />
    </div>
  );
}
