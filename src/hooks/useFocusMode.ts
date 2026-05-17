"use client";
import { useEffect, useRef, useState } from "react";

export function useFocusMode(isPaused: boolean): { showControls: boolean } {
  const [showControls, setShowControls] = useState(true);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasStarted = useRef(false);

  const scheduleHide = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setShowControls(false), 2000);
  };

  useEffect(() => {
    if (isPaused) {
      if (hideTimer.current) clearTimeout(hideTimer.current);
      setShowControls(true);
      return;
    }

    if (!hasStarted.current) {
      hasStarted.current = true;
      scheduleHide();
    }

    const reveal = () => {
      setShowControls(true);
      scheduleHide();
    };

    document.addEventListener("mousemove", reveal);
    document.addEventListener("pointerdown", reveal);
    return () => {
      document.removeEventListener("mousemove", reveal);
      document.removeEventListener("pointerdown", reveal);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused]);

  useEffect(() => {
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  return { showControls };
}
