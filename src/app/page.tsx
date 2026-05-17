"use client";
import { useState } from "react";
import InputScreen from "@/components/InputScreen";
import ReaderScreen from "@/components/ReaderScreen";

export default function Home() {
  const [words, setWords] = useState<string[] | null>(null);

  if (words) {
    return <ReaderScreen words={words} onExit={() => setWords(null)} />;
  }

  return <InputScreen onStart={setWords} />;
}
