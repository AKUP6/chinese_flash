function parseToken(token) {
  const trimmed = token.trim()

  const range = trimmed.match(/^(\d+)\s*(?:-|to)\s*(\d+)$/i)
  if (range) {
    const start = parseInt(range[1], 10)
    const end = parseInt(range[2], 10)
    if (start > end) {
      return { error: `"${trimmed}" isn't a valid range (start is after end).` }
    }
    const weeks = []
    for (let i = start; i <= end; i++) weeks.push(i)
    return { weeks }
  }

  const single = trimmed.match(/^(\d+)$/)
  if (single) {
    return { weeks: [parseInt(single[1], 10)] }
  }

  return { error: `Couldn't understand "${trimmed}". Try "2" or "1-3".` }
}

// Parses free text like "2", "1-2", "1 to 3", or "1, 3-4" into a sorted
// list of week numbers, validated against the weeks that actually exist.
export function parseWeekInput(text, availableWeeks) {
  if (!text || !text.trim()) {
    return { error: 'Enter a week number or range, e.g. "2" or "1-3".' }
  }

  const tokens = text.split(/,|(?:\s+and\s+)/i).map((t) => t.trim()).filter(Boolean)
  const weeks = new Set()

  for (const token of tokens) {
    const result = parseToken(token)
    if (result.error) return { error: result.error }
    result.weeks.forEach((w) => weeks.add(w))
  }

  const sorted = [...weeks].sort((a, b) => a - b)
  const invalid = sorted.filter((w) => !availableWeeks.includes(w))

  if (invalid.length) {
    const plural = invalid.length > 1
    return {
      error: `Week${plural ? 's' : ''} ${invalid.join(', ')} ${plural ? "don't" : "doesn't"} exist. Available: ${availableWeeks.join(', ')}.`,
    }
  }

  return { weeks: sorted }
}
