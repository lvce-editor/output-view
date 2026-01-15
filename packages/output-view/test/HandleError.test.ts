import { test, expect } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleError } from '../src/parts/HandleError/HandleError.ts'

test('handleError returns the same state with all properties preserved', async () => {
  const state = createDefaultState()
  const result = await handleError(state)

  expect(result).toEqual(state)
  expect(result).not.toBe(state) // Should be a new object
})

test('handleError preserves state properties with custom values', async () => {
  const state = {
    ...createDefaultState(),
    error: 'Detailed error message',
    errorCode: 404,
    filterValue: 'error',
    focusedIndex: 3,
    height: 150,
    message: 'Error occurred',
    uri: 'file:///error.log',
    watchId: 456,
    width: 250,
  }
  const result = await handleError(state)

  expect(result).toEqual(state)
  expect(result).not.toBe(state)
})

test('handleError preserves error-related properties', async () => {
  const state = {
    ...createDefaultState(),
    error: 'File not found',
    errorCode: 404,
    message: 'Failed to load file',
  }
  const result = await handleError(state)

  expect(result).toEqual(state)
  expect(result.error).toBe('File not found')
  expect(result.errorCode).toBe(404)
  expect(result.message).toBe('Failed to load file')
  expect(result).not.toBe(state)
})

test('handleError preserves array properties', async () => {
  const state = {
    ...createDefaultState(),
    collapsedUris: ['file:///error1.log', 'file:///error2.log'],
  }
  const result = await handleError(state)

  expect(result).toEqual(state)
  expect(result.collapsedUris).toEqual(['file:///error1.log', 'file:///error2.log'])
  expect(result).not.toBe(state)
})

test('handleError handles state with all properties set', async () => {
  const state = {
    ...createDefaultState(),
    error: 'Critical error',
    errorCode: 500,
    filterValue: 'critical',
    focusedIndex: 1,
    height: 400,
    inputSource: 2,
    itemHeight: 26,
    logLevel: 3,
    maxLineY: 200,
    message: 'Critical error occurred',
    minLineY: 50,
    parentId: 789,
    platform: 2,
    scrollLockEnabled: false,
    selectedOption: 'error',
    smallWidthBreakPoint: 700,
    uid: 101_112,
    uri: 'file:///critical.log',
    watchId: 131_415,
    width: 600,
    workspaceUri: 'file:///error-workspace',
    x: 25,
    y: 35,
  }
  const result = await handleError(state)

  expect(result).toEqual(state)
  expect(result).not.toBe(state)
})

test('handleError returns a promise', async () => {
  const state = createDefaultState()
  const result = handleError(state)

  expect(result).toBeInstanceOf(Promise)
  const resolved = await result
  expect(resolved).toEqual(state)
})

test('handleError handles state with no error', async () => {
  const state = {
    ...createDefaultState(),
    error: '',
    errorCode: 0,
    message: '',
  }
  const result = await handleError(state)

  expect(result).toEqual(state)
  expect(result.error).toBe('')
  expect(result.errorCode).toBe(0)
  expect(result.message).toBe('')
  expect(result).not.toBe(state)
})

test('handleError handles state with network error', async () => {
  const state = {
    ...createDefaultState(),
    error: 'Network error: ECONNREFUSED',
    errorCode: -1,
    message: 'Unable to connect to server',
  }
  const result = await handleError(state)

  expect(result).toEqual(state)
  expect(result.error).toBe('Network error: ECONNREFUSED')
  expect(result.errorCode).toBe(-1)
  expect(result.message).toBe('Unable to connect to server')
  expect(result).not.toBe(state)
})

test('handleError handles state with permission error', async () => {
  const state = {
    ...createDefaultState(),
    error: 'Permission denied: EACCES',
    errorCode: -2,
    message: 'Insufficient permissions to read file',
  }
  const result = await handleError(state)

  expect(result).toEqual(state)
  expect(result.error).toBe('Permission denied: EACCES')
  expect(result.errorCode).toBe(-2)
  expect(result.message).toBe('Insufficient permissions to read file')
  expect(result).not.toBe(state)
})
