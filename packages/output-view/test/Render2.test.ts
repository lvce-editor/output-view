import { test, expect } from '@jest/globals'
import type { OutputState } from '../src/parts/OutputState/OutputState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { render2 } from '../src/parts/Render2/Render2.ts'

test('should throw error when uid not found in OutputStates', () => {
  const uid = 999_999 // Use a uid that definitely doesn't exist
  const diffResult = [1, 2, 3]

  // The function should throw when trying to get a non-existent uid
  expect(() => render2(uid, diffResult)).toThrow()
})

test('should throw error with invalid diff result', () => {
  const uid = 888_888 // Use another uid that doesn't exist
  const diffResult = [999] // Use an invalid diff type

  // The function should throw when trying to get a non-existent uid
  expect(() => render2(uid, diffResult)).toThrow()
})

test('should throw error with empty diff result', () => {
  const uid = 777_777 // Use another uid that doesn't exist
  const diffResult: readonly number[] = []

  // The function should throw when trying to get a non-existent uid
  expect(() => render2(uid, diffResult)).toThrow()
})
