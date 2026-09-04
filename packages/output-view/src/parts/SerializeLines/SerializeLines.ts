import type { Line } from '../Line/Line.ts'
import type { LinePart } from '../LinePart/LinePart.ts'
import * as LinePartType from '../LinePartType/LinePartType.ts'

const serializeLinePart = (part: LinePart): string => {
  if (part.type === LinePartType.LogLevel || part.type === LinePartType.RepeatCount) {
    return ''
  }
  return part.type === LinePartType.Link ? part.label || part.value : part.value
}

const serializeLineParts = (parts: readonly LinePart[]): string => {
  return parts.map(serializeLinePart).join('')
}

export const serializeLines = (lines: readonly Line[]): string => {
  return lines.map(serializeLineParts).join('\n')
}
