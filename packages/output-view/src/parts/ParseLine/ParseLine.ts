import type { LinePart } from '../LinePart/LinePart.ts'
import { getLinkMatch } from '../GetLinkMatch/GetLinkMatch.ts'
import * as LinePartType from '../LinePartType/LinePartType.ts'

export const parseLine = (line: string): readonly LinePart[] => {
  const parts: LinePart[] = []
  let rest = line
  while (rest.length > 0) {
    const match = getLinkMatch(rest)
    if (!match) {
      if (rest) {
        parts.push({ type: LinePartType.Text, value: rest })
      }
      break
    }
    const index = rest.indexOf(match)
    if (index > 0) {
      parts.push({ type: LinePartType.Text, value: rest.slice(0, index) })
    }
    parts.push({ type: LinePartType.Link, value: match })
    rest = rest.slice(index + match.length)
  }
  if (parts.length === 0) {
    return [{ type: LinePartType.Text, value: '' }]
  }
  return parts
}
