"use client";
import { useCallback, useEffect, useRef } from "react";

interface UseWordTimerProps {
  isPlaying: boolean;
  wpm: number;
  onAdvance: () => void;
}

export function useWordTimer({ isPlaying, wpm, onAdvance }: UseWordTimerProps) {
  const isPlayingRef = useRef(isPlaying);
  const wpmRef = useRef(wpm);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onAdvanceRef = useRef(onAdvance);

  useEffect(() => { isPlayingRef.current = isPlaying; }, [isPlaying]);
  useEffect(() => { wpmRef.current = wpm; }, [wpm]);
  useEffect(() => { onAdvanceRef.current = onAdvance; }, [onAdvance]);

  const tick = useCallback(() => {
    if (!isPlayingRef.current) return;
    onAdvanceRef.current();
    const delay = Math.round(60000 / wpmRef.current);
    timerRef.current = setTimeout(tick, delay);
  }, []);

  useEffect(() => {
    if (isPlaying) {
      const delay = Math.round(60000 / wpmRef.current);
      timerRef.current = setTimeout(tick, delay);
    } else {
      if (timerRef.current) clearTimeout(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, tick]);
}
