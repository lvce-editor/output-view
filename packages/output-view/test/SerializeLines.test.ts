import { test, expect } from '@jest/globals'
import { serializeLines } from '../src/parts/SerializeLines/SerializeLines.ts'
import * as LinePartType from '../src/parts/LinePartType/LinePartType.ts'

test('serializeLines - empty', () => {
  expect(serializeLines([])).toBe('')
})

test('serializeLines - single line text', () => {
  const lines = [[{ type: LinePartType.Text, value: 'hello' }]]
  expect(serializeLines(lines)).toBe('hello')
})

test('serializeLines - multiple lines and link', () => {
  const lines = [
    [{ type: LinePartType.Text, value: 'see ' }, { type: LinePartType.Link, value: 'https://example.com' }],
    [{ type: LinePartType.Text, value: 'bye' }],
  ]
  expect(serializeLines(lines)).toBe('see https://example.com\nbye')
})
