# The Reader.

*A studio for rapid reading.*

A Rapid Serial Visual Presentation (RSVP) speed reader with an editorial soul. Paste in a passage and read it one word at a time — at your own tempo — with the pivot letter highlighted to keep your eye anchored.

---

## Features

- **Adjustable tempo** — slider from 50 to 1,000 WPM, plus quick presets (200 · 300 · 400 · 500 · 700)
- **ORP highlighting** — the Optimal Recognition Point of every word is rendered in editorial red, so your eye doesn't have to hunt for the center
- **Focus mode** — controls fade away during playback and return when you pause or move the mouse
- **Light & dark themes** — warm paper by day, lamp-lit study by night
- **Keyboard-first**
  - `Space` — play / pause
  - `↑` / `↓` — nudge tempo ±10 WPM
- **Auto-pause** on tab blur, so you never lose your place
- **Three sample passages** to get going (Woolf, Borges, Didion)

---

## Stack

- [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [next-themes](https://github.com/pacocoursey/next-themes) for theme switching
- [Fraunces](https://fonts.google.com/specimen/Fraunces) + [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) via `next/font`
- TypeScript

No backend. Everything runs in the browser.

---

## Running locally

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

---

## How it works

The reader uses a recursive `setTimeout` loop that reads tempo and play-state from `useRef` mirrors — so adjusting WPM mid-session takes effect on the very next word with no restart, and stale closures can't drift the timer.

The ORP pivot index is computed as `Math.max(1, Math.floor(strippedLength / 4))` — roughly 25% into the word, which lands the pivot near the visual center for most English words.

---

*Set in Fraunces & JetBrains Mono.*
