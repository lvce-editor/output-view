import { test, expect } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { disableScrollLock } from '../src/parts/DisableScrollLock/DisableScrollLock.ts'

test('disableScrollLock - when scrollLockEnabled is true, sets it to false', async () => {
  const state = {
    ...createDefaultState(),
    scrollLockEnabled: true,
  }
  const result = await disableScrollLock(state)
  expect(result.scrollLockEnabled).toBe(false)
  expect(result).not.toBe(state)
})

test('disableScrollLock - when scrollLockEnabled is false, returns same state', async () => {
  const state = {
    ...createDefaultState(),
    scrollLockEnabled: false,
  }
  const result = await disableScrollLock(state)
  expect(result.scrollLockEnabled).toBe(false)
  expect(result).toBe(state)
})

test('disableScrollLock - preserves other state properties', async () => {
  const state = {
    ...createDefaultState(),
    error: 'test error',
    filterValue: 'test filter',
    scrollLockEnabled: true,
  }
  const result = await disableScrollLock(state)
  expect(result.error).toBe('test error')
  expect(result.filterValue).toBe('test filter')
  expect(result.scrollLockEnabled).toBe(false)
})
