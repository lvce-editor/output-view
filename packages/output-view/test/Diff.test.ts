import { test, expect } from '@jest/globals'
import { diff } from '../src/parts/Diff/Diff.ts'

test('diff returns an array (default behavior)', () => {
  const oldState = {}
  const newState = {}
  const result = diff(oldState as any, newState as any)
  expect(Array.isArray(result)).toBe(true)
})
