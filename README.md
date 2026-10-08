# Chinese Flashcards

A Quizlet-style flashcard app for studying Chinese vocabulary, organized by
unit.

## Running it

```
npm install
npm run dev
```

Then open the printed local URL in your browser.

## Adding vocabulary

Cards live in `src/units/unitN.js`, one file per unit. Each file
default-exports an array of `{ char, pinyin, def }` objects:

```js
export default [
  { char: '你好', pinyin: 'nǐ hǎo', def: 'hello' },
]
```

To add a new unit:

1. Create `src/units/unit5.js` (copy the shape above).
2. Register it in `src/units/index.js` by importing it and adding one line to
   the exported map, e.g. `5: unit5`.

That's it — the new unit will automatically show up as a selectable option on
the home screen.

## How studying works

- On the home screen, tap the unit buttons you want to study (or **Select
  all**), then hit **Start**.
- Pick a **study mode**:
  - **Character → Meaning** (default) — shows the character, flips to reveal
    pinyin + definition.
  - **Meaning → Character** (reverse) — shows pinyin + definition first,
    flips to reveal the character.
  - **Writing** — shows only the pinyin *or* the meaning (toggle which),
    a prompt to write the character by hand (on paper, an iPad, wherever —
    the app doesn't see or check your handwriting), then flip to reveal the
    character plus the other piece of info for a quick self-check.
- After flipping, mark it with ✓ (got it) or ✕ (review again), same as any
  mode. Cards marked ✕ go to the back of the queue and keep coming back
  until you get them right.
- Toggle **Learning mode** to study in growing batches instead of the whole
  selection at once: the first 4 cards, then the next 5, then 6, then 7, and
  so on. Each batch has to be fully cleared (every card gotten right at
  least once) before the next, larger batch is introduced.
  - Combined with **Writing** mode, known compound pairs (什么, 老师, 电视,
    喜欢, etc. — see `src/lib/pairs.js`) are kept in the same batch instead
    of being split across two, so you write both halves of a word together.
- The progress bar tracks how many cards you've cleared out of the whole
  selection, regardless of mode. Use **Reset** to restart the current
  session, or the home icon to change your unit selection.
