import { test, expect } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleFileChange } from '../src/parts/HandleFileChange/HandleFileChange.ts'
import * as OutputStates from '../src/parts/OutputStates/OutputStates.ts'

test('should handle file change without throwing error', async () => {
  const mockRpc = RendererWorker.registerMockRpc({})
  // The function should complete without throwing an error
  // even if there are no matching watchIds
  await expect(handleFileChange(123)).resolves.toBeUndefined()
  expect(mockRpc.invocations).toEqual([])
})

test('should handle file change with different watchId', async () => {
  const mockRpc = RendererWorker.registerMockRpc({})
  // Test with a different watchId
  await expect(handleFileChange(999)).resolves.toBeUndefined()
  expect(mockRpc.invocations).toEqual([])
})

test('should handle file change with empty states', async () => {
  const mockRpc = RendererWorker.registerMockRpc({})
  // Test with no output states
  await expect(handleFileChange(123)).resolves.toBeUndefined()
  expect(mockRpc.invocations).toEqual([])
})

test('should handle file change with matching watchId', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Output.refresh': () => undefined,
  })

  // Create a state with a specific watchId
  const state = {
    ...createDefaultState(),
    watchId: 123,
  }

  // Register the state
  const key = 123
  OutputStates.set(key, state, state)

  await handleFileChange(123)

  expect(mockRpc.invocations).toEqual([['Output.refresh']])

  // Clean up
  OutputStates.dispose(key)
})

test('should handle file change with multiple states where one matches', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Output.refresh': () => undefined,
  })

  // Create multiple states with different watchIds
  const state1 = { ...createDefaultState(), watchId: 123 }
  const state2 = { ...createDefaultState(), watchId: 456 }
  const state3 = { ...createDefaultState(), watchId: 789 }

  // Register the states
  const key1 = 1
  const key2 = 2
  const key3 = 3

  OutputStates.set(key1, state1, state1)
  OutputStates.set(key2, state2, state2)
  OutputStates.set(key3, state3, state3)

  await handleFileChange(456)

  // Should only call refresh for the matching watchId
  expect(mockRpc.invocations).toEqual([['Output.refresh']])

  // Clean up
  OutputStates.dispose(key1)
  OutputStates.dispose(key2)
  OutputStates.dispose(key3)
})

test('should handle file change with multiple matching watchIds', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Output.refresh': () => undefined,
  })

  // Create multiple states with the same watchId
  const state1 = { ...createDefaultState(), watchId: 123 }
  const state2 = { ...createDefaultState(), watchId: 123 }
  const state3 = { ...createDefaultState(), watchId: 456 }

  // Register the states
  const key1 = 4
  const key2 = 5
  const key3 = 6

  OutputStates.set(key1, state1, state1)
  OutputStates.set(key2, state2, state2)
  OutputStates.set(key3, state3, state3)

  await handleFileChange(123)

  // Should call refresh twice for the two matching watchIds
  expect(mockRpc.invocations).toEqual([['Output.refresh'], ['Output.refresh']])

  // Clean up
  OutputStates.dispose(key1)
  OutputStates.dispose(key2)
  OutputStates.dispose(key3)
})

test('should handle file change with zero watchId', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Output.refresh': () => undefined,
  })

  // Create a state with watchId 0
  const state = {
    ...createDefaultState(),
    watchId: 0,
  }

  // Register the state
  const key = 8
  OutputStates.set(key, state, state)

  await handleFileChange(0)

  expect(mockRpc.invocations).toEqual([['Output.refresh']])

  // Clean up
  OutputStates.dispose(key)
})

test('should handle file change with negative watchId', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Output.refresh': () => undefined,
  })

  // Create a state with negative watchId
  const state = {
    ...createDefaultState(),
    watchId: -1,
  }

  // Register the state
  const key = 9
  OutputStates.set(key, state, state)

  await handleFileChange(-1)

  expect(mockRpc.invocations).toEqual([['Output.refresh']])

  // Clean up
  OutputStates.dispose(key)
})

test('should handle file change when refresh throws error', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Output.refresh': () => {
      throw new Error('Refresh failed')
    },
  })

  // Create a state with a specific watchId
  const state = {
    ...createDefaultState(),
    watchId: 123,
  }

  // Register the state
  const key = 10
  OutputStates.set(key, state, state)

  // The function will throw if refresh fails
  await expect(handleFileChange(123)).rejects.toThrow('Refresh failed')

  expect(mockRpc.invocations).toEqual([['Output.refresh']])

  // Clean up
  OutputStates.dispose(key)
})
