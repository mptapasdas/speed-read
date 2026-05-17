function getLengthMultiplier(strippedLen: number): number {
  if (strippedLen <= 3) return 0.85;
  if (strippedLen <= 6) return 1.0;
  if (strippedLen <= 8) return 1.15;
  if (strippedLen <= 11) return 1.3;
  if (strippedLen <= 14) return 1.5;
  return 1.7;
}

function getPunctuationPause(word: string): number {
  // Peel off trailing closing quotes/parens to reveal real terminal punctuation
  const trimmed = word.replace(/[)\]"'»›”’]+$/u, "");
  const last = trimmed[trimmed.length - 1];

  if (last === "." || last === "!" || last === "?" || last === "…") {
    return 1.0;
  }
  if (last === "," || last === ";" || last === ":" || last === "—" || last === "–") {
    return 0.4;
  }
  return 0;
}

export function getWordDelay(word: string, wpm: number): number {
  const baseDelay = 60000 / wpm;
  if (!word) return Math.round(baseDelay);

  const stripped = word.replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, "") || word;
  const lengthMult = getLengthMultiplier(stripped.length);
  const punctPause = getPunctuationPause(word);

  return Math.round(baseDelay * (lengthMult + punctPause));
}
