import { test, expect } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { handleFileChange } from '../src/parts/HandleFileChange/HandleFileChange.ts'

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
