export function getOrpIndex(word: string): number {
  const stripped = word.replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, "");
  const len = stripped.length || word.length;
  return Math.max(1, Math.floor(len / 4));
}
