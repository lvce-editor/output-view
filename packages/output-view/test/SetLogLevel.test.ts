import { test, expect } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { setLogLevel } from '../src/parts/SetLogLevel/SetLogLevel.ts'

test('setLogLevel returns new state with updated logLevel', async () => {
  const state = createDefaultState()
  const newLogLevel = 5

  const result = await setLogLevel(state, newLogLevel)

  expect(result).not.toBe(state) // Should be a new object
  expect(result.logLevel).toBe(newLogLevel)
  expect(result.logLevel).not.toBe(state.logLevel)
})

test('setLogLevel preserves all other state properties', async () => {
  const state = createDefaultState()
  const newLogLevel = 10

  const result = await setLogLevel(state, newLogLevel)

  // Check that all other properties are preserved
  expect(result.message).toBe(state.message)
  expect(result.platform).toBe(state.platform)
  expect(result.watchId).toBe(state.watchId)
  expect(result.buttons).toBe(state.buttons)
  expect(result.collapsedUris).toBe(state.collapsedUris)
  expect(result.error).toBe(state.error)
  expect(result.errorCode).toBe(state.errorCode)
  expect(result.filteredItems).toBe(state.filteredItems)
  expect(result.filterValue).toBe(state.filterValue)
  expect(result.focusedIndex).toBe(state.focusedIndex)
  expect(result.inputSource).toBe(state.inputSource)
  expect(result.listItems).toBe(state.listItems)
  expect(result.options).toBe(state.options)
  expect(result.scrollLockEnabled).toBe(state.scrollLockEnabled)
  expect(result.selectedOption).toBe(state.selectedOption)
})

test('setLogLevel handles zero log level', async () => {
  const state = createDefaultState()
  const zeroLogLevel = 0

  const result = await setLogLevel(state, zeroLogLevel)

  expect(result.logLevel).toBe(zeroLogLevel)
})

test('setLogLevel handles negative log level', async () => {
  const state = createDefaultState()
  const negativeLogLevel = -1

  const result = await setLogLevel(state, negativeLogLevel)

  expect(result.logLevel).toBe(negativeLogLevel)
})

test('setLogLevel handles large log level', async () => {
  const state = createDefaultState()
  const largeLogLevel = 999

  const result = await setLogLevel(state, largeLogLevel)

  expect(result.logLevel).toBe(largeLogLevel)
})
