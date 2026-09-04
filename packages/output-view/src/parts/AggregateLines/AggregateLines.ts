import type { Line } from '../Line/Line.ts'
import * as LinePartType from '../LinePartType/LinePartType.ts'

const getAggregationKey = (line: Line): string => {
  return JSON.stringify(line.filter((part) => part.type !== LinePartType.RepeatCount))
}

const withRepeatCount = (line: Line, count: number): Line => {
  const parts = line.filter((part) => part.type !== LinePartType.RepeatCount)
  return [{ type: LinePartType.RepeatCount, value: String(count) }, ...parts]
}

export const aggregateLines = (lines: readonly Line[]): readonly Line[] => {
  const result: Line[] = []
  let previousKey = ''
  let repeatCount = 0
  for (const line of lines) {
    const key = getAggregationKey(line)
    if (result.length > 0 && key === previousKey) {
      repeatCount++
      const previousIndex = result.length - 1
      result[previousIndex] = withRepeatCount(result.at(-1)!, repeatCount)
      continue
    }
    result.push(line)
    previousKey = key
    repeatCount = 1
  }
  return result
}
