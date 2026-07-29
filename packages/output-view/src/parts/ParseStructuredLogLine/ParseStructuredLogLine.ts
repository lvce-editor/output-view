import type { Line } from '../Line/Line.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as LinePartType from '../LinePartType/LinePartType.ts'

interface StructuredLogEntry {
  readonly category: string
  readonly level: string
  readonly line: number
  readonly message: string
  readonly source: string
  readonly timestamp: string
}

const isStructuredLogEntry = (value: any): value is StructuredLogEntry => {
  return (
    value?.category === 'Window' &&
    typeof value.level === 'string' &&
    typeof value.line === 'number' &&
    typeof value.message === 'string' &&
    typeof value.source === 'string' &&
    typeof value.timestamp === 'string'
  )
}

const getSourceLabel = (source: string, line: number): string => {
  const withoutQueryOrFragment = source.split(/[?#]/, 1)[0]
  const slashIndex = withoutQueryOrFragment.lastIndexOf('/')
  const name = slashIndex === -1 ? withoutQueryOrFragment : withoutQueryOrFragment.slice(slashIndex + 1)
  return line > 0 ? `${name}:${line}` : name
}

const normalizeLevel = (level: string): string => {
  return level === 'warn' ? 'warning' : level
}

export const parseStructuredLogLine = (line: string): Line | undefined => {
  if (!line.startsWith('{')) {
    return undefined
  }
  let parsed: unknown
  try {
    parsed = JSON.parse(line)
  } catch {
    return undefined
  }
  if (!isStructuredLogEntry(parsed)) {
    return undefined
  }
  const parts: Line = [
    { type: LinePartType.LogLevel, value: normalizeLevel(parsed.level) },
    { type: LinePartType.Text, value: parsed.message },
  ]
  if (!parsed.source) {
    return parts
  }
  const href = parsed.line > 0 ? `${parsed.source}:${parsed.line}` : parsed.source
  return [
    ...parts,
    { type: LinePartType.Text, value: ' ' },
    { className: ClassNames.OutputSourceLink, label: getSourceLabel(parsed.source, parsed.line), type: LinePartType.Link, value: href },
  ]
}
