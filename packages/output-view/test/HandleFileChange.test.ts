import { test, expect } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { handleFileChange } from '../src/parts/HandleFileChange/HandleFileChange.ts'
import { RendererWorker } from '@lvce-editor/rpc-registry'

test('should handle file change without throwing error', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      // The function should not call any RPC methods if there are no matching states
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRpc)

  // The function should complete without throwing an error
  // even if there are no matching watchIds
  await expect(handleFileChange(123)).resolves.toBeUndefined()
})

test('should handle file change with different watchId', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      // The function should not call any RPC methods if there are no matching states
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRpc)

  // Test with a different watchId
  await expect(handleFileChange(999)).resolves.toBeUndefined()
})

test('should handle file change with empty states', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      // The function should not call any RPC methods if there are no states
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRpc)

  // Test with no output states
  await expect(handleFileChange(123)).resolves.toBeUndefined()
})
