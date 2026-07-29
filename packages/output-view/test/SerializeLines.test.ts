import { test, expect } from '@jest/globals'
import type { Line } from '../src/parts/Line/Line.ts'
import * as LinePartType from '../src/parts/LinePartType/LinePartType.ts'
import { serializeLines } from '../src/parts/SerializeLines/SerializeLines.ts'

test('serializeLines - empty', () => {
  expect(serializeLines([])).toBe('')
})

test('serializeLines - single line text', () => {
  const lines: readonly Line[] = [[{ type: LinePartType.Text, value: 'hello' }]]
  expect(serializeLines(lines)).toBe('hello')
})

test('serializeLines - multiple lines and link', () => {
  const lines: readonly Line[] = [
    [
      { type: LinePartType.Text, value: 'see ' },
      { type: LinePartType.Link, value: 'https://example.com' },
    ],
    [{ type: LinePartType.Text, value: 'bye' }],
  ]
  expect(serializeLines(lines)).toBe('see https://example.com\nbye')
})

test('serializeLines - omits presentation metadata and uses shortened link label', () => {
  const lines: readonly Line[] = [
    [
      { type: LinePartType.RepeatCount, value: '4' },
      { type: LinePartType.LogLevel, value: 'warning' },
      { type: LinePartType.Text, value: 'warning ' },
      { label: 'main.js:7', type: LinePartType.Link, value: 'file:///workspace/main.js:7' },
    ],
  ]
  expect(serializeLines(lines)).toBe('warning main.js:7')
})
