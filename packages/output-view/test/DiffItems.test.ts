import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { isEqual } from '../src/parts/DiffItems/DiffItems.ts'
import type { OutputState } from '../src/parts/OutputState/OutputState.ts'

test('isEqual returns true when problems arrays are the same reference', () => {
  const oldState: OutputState = { ...createDefaultState() }
  const newState: OutputState = { ...createDefaultState() }
  expect(isEqual(oldState, newState)).toBe(true)
})

test('isEqual returns false when problems arrays are different', () => {
  const oldState: OutputState = { ...createDefaultState() }
  const newState: OutputState = { ...createDefaultState() }
  expect(isEqual(oldState, newState)).toBe(false)
})
