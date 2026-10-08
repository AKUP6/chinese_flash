// Splits cards into increasingly larger groups: 4, then 5, then 6, etc.
// The last group may be smaller if the cards run out mid-group.
export function chunkIncreasing(cards, startSize = 4) {
  const groups = []
  let i = 0
  let size = startSize
  while (i < cards.length) {
    groups.push(cards.slice(i, i + size))
    i += size
    size += 1
  }
  return groups
}
