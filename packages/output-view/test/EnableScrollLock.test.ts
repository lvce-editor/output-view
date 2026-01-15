import { test, expect } from '@jest/globals'
import type { OutputState } from '../src/parts/OutputState/OutputState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { enableScrollLock } from '../src/parts/EnableScrollLock/EnableScrollLock.ts'

test('should enable scroll lock when disabled', async () => {
  const state = createDefaultState()
  const result = await enableScrollLock(state)

  expect(result.scrollLockEnabled).toBe(true)
  expect(result).not.toBe(state)
  expect(result).toEqual({
    ...state,
    scrollLockEnabled: true,
  })
})

test('should return same state when scroll lock already enabled', async () => {
  const state: OutputState = {
    ...createDefaultState(),
    scrollLockEnabled: true,
  }

  const result = await enableScrollLock(state)

  expect(result).toBe(state)
  expect(result.scrollLockEnabled).toBe(true)
})

test('should preserve all other state properties when enabling scroll lock', async () => {
  const state: OutputState = {
    ...createDefaultState(),
    error: 'test error',
    filterValue: 'test filter',
    focusedIndex: 5,
    scrollLockEnabled: false,
  }

  const result = await enableScrollLock(state)

  expect(result.scrollLockEnabled).toBe(true)
  expect(result.error).toBe('test error')
  expect(result.focusedIndex).toBe(5)
  expect(result.filterValue).toBe('test filter')
  expect(result).not.toBe(state)
})
