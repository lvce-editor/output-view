import { test, expect } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { diff2 } from '../src/parts/Diff2/Diff2.ts'
import { set } from '../src/parts/OutputStates/OutputStates.ts'

test('diff2 returns an array (default behavior)', () => {
  const state = createDefaultState()
  set(1, state, state)
  const result = diff2(1)
  expect(Array.isArray(result)).toBe(true)
})
