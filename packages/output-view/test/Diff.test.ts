import { test, expect } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { diff } from '../src/parts/Diff/Diff.ts'

test('diff returns an array (default behavior)', () => {
  const oldState = createDefaultState()
  const newState = createDefaultState()
  const result = diff(oldState, newState)
  expect(Array.isArray(result)).toBe(true)
})
