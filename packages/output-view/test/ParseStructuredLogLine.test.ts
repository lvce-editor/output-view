import { expect, test } from '@jest/globals'
import * as LinePartType from '../src/parts/LinePartType/LinePartType.ts'
import { parseStructuredLogLine } from '../src/parts/ParseStructuredLogLine/ParseStructuredLogLine.ts'

test('parseStructuredLogLine - parses a Window NDJSON record', () => {
  const result = parseStructuredLogLine(
    JSON.stringify({
      category: 'Window',
      level: 'warning',
      line: 3455,
      message: 'cannot execute handleBlur instance not found 17',
      source: 'lvce://-/d13c194/packages/renderer-worker/dist/rendererWorkerMain.js',
      timestamp: '2026-07-29T06:45:24.529Z',
    }),
  )

  expect(result).toEqual([
    { type: LinePartType.LogLevel, value: 'warning' },
    { type: LinePartType.Text, value: 'cannot execute handleBlur instance not found 17' },
    { type: LinePartType.Text, value: ' ' },
    {
      className: 'OutputSourceLink',
      label: 'rendererWorkerMain.js:3455',
      type: LinePartType.Link,
      value: 'lvce://-/d13c194/packages/renderer-worker/dist/rendererWorkerMain.js:3455',
    },
  ])
})

test('parseStructuredLogLine - hides timestamp and empty source', () => {
  const result = parseStructuredLogLine(
    JSON.stringify({
      category: 'Window',
      level: 'info',
      line: 0,
      message: 'ready',
      source: '',
      timestamp: '2026-07-29T06:45:24.529Z',
    }),
  )

  expect(result).toEqual([
    { type: LinePartType.LogLevel, value: 'info' },
    { type: LinePartType.Text, value: 'ready' },
  ])
})

test('parseStructuredLogLine - normalizes warn level', () => {
  const result = parseStructuredLogLine(
    JSON.stringify({
      category: 'Window',
      level: 'warn',
      line: 0,
      message: 'deprecated',
      source: '',
      timestamp: '2026-07-29T06:45:24.529Z',
    }),
  )

  expect(result?.[0]).toEqual({ type: LinePartType.LogLevel, value: 'warning' })
})

test('parseStructuredLogLine - ignores unrelated JSON output', () => {
  expect(parseStructuredLogLine('{"message":"extension payload"}')).toBeUndefined()
})

test('parseStructuredLogLine - ignores malformed JSON', () => {
  expect(parseStructuredLogLine('{"category":"Window"')).toBeUndefined()
})

test('parseStructuredLogLine - ignores plain text without parsing JSON', () => {
  expect(parseStructuredLogLine('plain output')).toBeUndefined()
})
