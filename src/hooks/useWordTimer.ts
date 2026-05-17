"use client";
import { useCallback, useEffect, useRef } from "react";
import { getWordDelay } from "@/lib/timing";

interface UseWordTimerProps {
  words: string[];
  currentIndex: number;
  isPlaying: boolean;
  wpm: number;
  onAdvance: () => void;
}

export function useWordTimer({ words, currentIndex, isPlaying, wpm, onAdvance }: UseWordTimerProps) {
  const isPlayingRef = useRef(isPlaying);
  const wpmRef = useRef(wpm);
  const wordsRef = useRef(words);
  const indexRef = useRef(currentIndex);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onAdvanceRef = useRef(onAdvance);

  useEffect(() => { isPlayingRef.current = isPlaying; }, [isPlaying]);
  useEffect(() => { wpmRef.current = wpm; }, [wpm]);
  useEffect(() => { wordsRef.current = words; }, [words]);
  useEffect(() => { indexRef.current = currentIndex; }, [currentIndex]);
  useEffect(() => { onAdvanceRef.current = onAdvance; }, [onAdvance]);

  const tick = useCallback(() => {
    if (!isPlayingRef.current) return;
    onAdvanceRef.current();
    // After advance, the displayed word is at old index + 1
    const nextDisplayedIndex = indexRef.current + 1;
    const nextWord = wordsRef.current[nextDisplayedIndex] ?? "";
    const delay = getWordDelay(nextWord, wpmRef.current);
    timerRef.current = setTimeout(tick, delay);
  }, []);

  useEffect(() => {
    if (isPlaying) {
      const currentWord = wordsRef.current[indexRef.current] ?? "";
      const delay = getWordDelay(currentWord, wpmRef.current);
      timerRef.current = setTimeout(tick, delay);
    } else if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, tick]);
}
