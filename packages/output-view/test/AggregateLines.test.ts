import { expect, test } from '@jest/globals'
import type { Line } from '../src/parts/Line/Line.ts'
import { aggregateLines } from '../src/parts/AggregateLines/AggregateLines.ts'
import * as LinePartType from '../src/parts/LinePartType/LinePartType.ts'

const infoLine: Line = [
  { type: LinePartType.LogLevel, value: 'info' },
  { type: LinePartType.Text, value: 'cannot execute viewlet command' },
]

test('aggregateLines - aggregates adjacent identical messages', () => {
  expect(aggregateLines([infoLine, infoLine, infoLine, infoLine])).toEqual([
    [
      { type: LinePartType.RepeatCount, value: '4' },
      { type: LinePartType.LogLevel, value: 'info' },
      { type: LinePartType.Text, value: 'cannot execute viewlet command' },
    ],
  ])
})

test('aggregateLines - does not aggregate different levels', () => {
  const warningLine: Line = [
    { type: LinePartType.LogLevel, value: 'warning' },
    { type: LinePartType.Text, value: 'cannot execute viewlet command' },
  ]
  expect(aggregateLines([infoLine, warningLine])).toEqual([infoLine, warningLine])
})

test('aggregateLines - preserves ordering around non-adjacent duplicates', () => {
  const otherLine: Line = [{ type: LinePartType.Text, value: 'other' }]
  expect(aggregateLines([infoLine, otherLine, infoLine])).toEqual([infoLine, otherLine, infoLine])
})

test('aggregateLines - returns an empty list unchanged', () => {
  expect(aggregateLines([])).toEqual([])
})
