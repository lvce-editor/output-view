import type { LinePart } from '../LinePart/LinePart.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { getLinkMatch } from '../GetLinkMatch/GetLinkMatch.ts'
import * as LinePartType from '../LinePartType/LinePartType.ts'
import { parseStructuredLogLine } from '../ParseStructuredLogLine/ParseStructuredLogLine.ts'

const RE_SOURCE_LINK = /^lvce(?:-oss)?:\/\//
const RE_SOURCE_LOCATION = /:\d+(?::\d+)?$/

const getLinkPart = (match: string): LinePart => {
  if (RE_SOURCE_LINK.test(match)) {
    return {
      className: ClassNames.OutputSourceLink,
      label: match,
      type: LinePartType.Link,
      value: match.replace(RE_SOURCE_LOCATION, ''),
    }
  }
  return { type: LinePartType.Link, value: match }
}

export const parseLine = (line: string): readonly LinePart[] => {
  const structuredLine = parseStructuredLogLine(line)
  if (structuredLine) {
    return structuredLine
  }
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
    parts.push(getLinkPart(match))
    rest = rest.slice(index + match.length)
  }
  if (parts.length === 0) {
    return [{ type: LinePartType.Text, value: '' }]
  }
  return parts
}
