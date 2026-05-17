export function parseWords(text: string): string[] {
  return text.split(/\s+/).filter((w) => w.length > 0);
}
