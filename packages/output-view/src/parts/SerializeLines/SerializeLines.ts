import type { Line } from '../Line/Line.ts'
import type { LinePart } from '../LinePart/LinePart.ts'

const serializeLinePart = (part: LinePart): string => {
  return part.value
}

const serializeLineParts = (parts: readonly LinePart[]): string => {
  return parts.map(serializeLinePart).join('')
}

export const serializeLines = (lines: readonly Line[]): string => {
  return lines.map(serializeLineParts).join('\n')
}
