"use client";
import { useEffect } from "react";

export function useKeyboard(togglePlay: () => void, adjustWpm: (delta: number) => void) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.code === "Space") {
        e.preventDefault();
        togglePlay();
      } else if (e.code === "ArrowUp" || e.key === "+") {
        e.preventDefault();
        adjustWpm(10);
      } else if (e.code === "ArrowDown" || e.key === "-") {
        e.preventDefault();
        adjustWpm(-10);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [togglePlay, adjustWpm]);
}
