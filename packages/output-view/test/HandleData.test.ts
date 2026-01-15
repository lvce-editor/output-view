import { test, expect } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleData } from '../src/parts/HandleData/HandleData.ts'

test('handleData returns the same state with all properties preserved', async () => {
  const state = createDefaultState()
  const result = await handleData(state)

  expect(result).toEqual(state)
  expect(result).not.toBe(state) // Should be a new object
})

test('handleData preserves state properties with custom values', async () => {
  const state = {
    ...createDefaultState(),
    error: 'Test error',
    errorCode: 404,
    filterValue: 'test',
    focusedIndex: 5,
    height: 100,
    message: 'Test message',
    uri: 'file:///test.log',
    watchId: 123,
    width: 200,
  }
  const result = await handleData(state)

  expect(result).toEqual(state)
  expect(result).not.toBe(state)
})

test('handleData preserves array properties', async () => {
  const state = {
    ...createDefaultState(),
    collapsedUris: ['uri1', 'uri2'],
  }
  const result = await handleData(state)

  expect(result).toEqual(state)
  expect(result).not.toBe(state)
  expect(result.collapsedUris).toEqual(['uri1', 'uri2'])
})

test('handleData handles state with all properties set', async () => {
  const state = {
    ...createDefaultState(),
    error: 'Sample error',
    errorCode: 500,
    filterValue: 'error',
    focusedIndex: 0,
    height: 300,
    inputSource: 1,
    itemHeight: 24,
    logLevel: 2,
    maxLineY: 100,
    message: 'Test message',
    minLineY: 0,
    parentId: 123,
    platform: 1,
    scrollLockEnabled: true,
    selectedOption: 'debug',
    smallWidthBreakPoint: 600,
    uid: 456,
    uri: 'file:///output.log',
    watchId: 789,
    width: 400,
    workspaceUri: 'file:///workspace',
    x: 10,
    y: 20,
  }
  const result = await handleData(state)

  expect(result).toEqual(state)
  expect(result).not.toBe(state)
})

test('handleData returns a promise', async () => {
  const state = createDefaultState()
  const result = handleData(state)

  expect(result).toBeInstanceOf(Promise)
  const resolved = await result
  expect(resolved).toEqual(state)
})

test('handleData handles empty state object', async () => {
  const state = createDefaultState()
  const result = await handleData(state)

  // All default properties should be preserved
  expect(result.buttons).toEqual([])
  expect(result.collapsedUris).toEqual([])
  expect(result.error).toBe('')
  expect(result.errorCode).toBe(0)
  expect(result.filteredItems).toEqual([])
  expect(result.filterValue).toBe('')
  expect(result.focusedIndex).toBe(-2)
  expect(result.height).toBe(0)
  expect(result.listItems).toEqual([])
  expect(result.message).toBe('')
  expect(result.options).toEqual([])
  expect(result.scrollLockEnabled).toBe(false)
  expect(result.uri).toBe('')
  expect(result.watchId).toBe(0)
})
