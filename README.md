# Chinese Flashcards

A Quizlet-style flashcard app for studying Chinese vocabulary, organized by week.

## Running it

```
npm install
npm run dev
```

Then open the printed local URL in your browser.

## Adding vocabulary

Cards live in `src/weeks/weekN.js`, one file per week. Each file default-exports
an array of `{ char, pinyin, def }` objects:

```js
export default [
  { char: '你好', pinyin: 'nǐ hǎo', def: 'hello' },
]
```

To add a new week:

1. Create `src/weeks/week3.js` (copy the shape above).
2. Register it in `src/weeks/index.js` by importing it and adding one line to
   the exported map, e.g. `3: week3`.

That's it — the new week will automatically show up as a selectable option on
the home screen.

## How studying works

- On the home screen, pick weeks by typing a number/range (e.g. `2` or `1-3`)
  or by tapping the week buttons, then hit **Start**.
- Cards are shuffled and shown character-side up. Tap a card to flip it and
  reveal the pinyin + English definition.
- After flipping, mark it with ✓ (got it) or ✕ (review again). Cards marked ✕
  go to the back of the queue and keep coming back until you get them right.
- The progress bar tracks how many cards you've cleared. Use **Reset** to
  restart the current session, or the home icon to change your week
  selection.
