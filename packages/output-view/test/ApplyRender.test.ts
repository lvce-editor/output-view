import { test, expect } from '@jest/globals'
import { applyRender } from '../src/parts/ApplyRender/ApplyRender.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'

test('applyRender with empty diff result', () => {
  const oldState = createDefaultState()
  const newState = createDefaultState()
  const diffResult: readonly number[] = []

  const result = applyRender(oldState, newState, diffResult)

  expect(result).toEqual([])
})

test('applyRender with single diff result', () => {
  const oldState = createDefaultState()
  const newState = createDefaultState()
  const diffResult: readonly number[] = [1]

  const result = applyRender(oldState, newState, diffResult)

  expect(result).toHaveLength(1)
  expect(typeof result[0]).toBe('object')
})

test('applyRender with multiple diff results', () => {
  const oldState = createDefaultState()
  const newState = createDefaultState()
  const diffResult: readonly number[] = [1, 1, 1]

  const result = applyRender(oldState, newState, diffResult)

  expect(result).toHaveLength(3)
  expect(typeof result[0]).toBe('object')
  expect(typeof result[1]).toBe('object')
  expect(typeof result[2]).toBe('object')
})
