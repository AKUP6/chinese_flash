import { KNOWN_PAIRS } from './pairs'

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

// Merges cards into "units" of one card, or two cards when they form a
// known pair (e.g. 什 + 么) and both are present in this deck — keeping
// each pair adjacent and never letting a group boundary fall between them.
function buildPairUnits(cards) {
  const byChar = new Map()
  for (const card of cards) {
    if (!byChar.has(card.char)) byChar.set(card.char, [])
    byChar.get(card.char).push(card)
  }

  const used = new Set()
  const units = []

  for (const card of cards) {
    if (used.has(card.id)) continue

    const pairEntry = KNOWN_PAIRS.find(([a, b]) => a === card.char || b === card.char)
    const partnerChar = pairEntry && (pairEntry[0] === card.char ? pairEntry[1] : pairEntry[0])
    const partner = partnerChar && (byChar.get(partnerChar) || []).find((c) => !used.has(c.id))

    if (partner) {
      used.add(card.id)
      used.add(partner.id)
      units.push([card, partner])
    } else {
      used.add(card.id)
      units.push([card])
    }
  }

  return units
}

// Same increasing-size grouping as chunkIncreasing, but built from pair
// units so a compound like 老师 or 电视 never gets split across two
// batches. Group sizes are the target, not exact — adding a pair can push
// a group one card over when only one slot was left.
export function chunkIncreasingWithPairs(cards, startSize = 4) {
  const units = buildPairUnits(cards)
  const groups = []
  let i = 0
  let size = startSize

  while (i < units.length) {
    const group = []
    while (i < units.length && group.length < size) {
      group.push(...units[i])
      i += 1
    }
    groups.push(group)
    size += 1
  }

  return groups
}
