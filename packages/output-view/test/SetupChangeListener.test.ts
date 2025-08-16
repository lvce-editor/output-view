import { test, expect, jest } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as RpcRegistry from '@lvce-editor/rpc-registry'
import { setupChangeListener } from '../src/parts/SetupChangeListener/SetupChangeListener.ts'
import * as WatchCallbacks from '../src/parts/WatchCallbacks/WatchCallbacks.ts'

test('should setup change listener with new watch id', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, ...args: readonly unknown[]) => {
      if (method === 'FileSystem.watchFile') {
        return
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RpcRegistry.set(RpcRegistry.RpcId.FileSystemWorker, mockRpc)

  const oldWatchId = 0
  const newWatchId = 123
  const uri = '/test/path'

  await setupChangeListener(oldWatchId, newWatchId, uri)

  expect(WatchCallbacks.hasWatchCallback(newWatchId)).toBe(true)
})

test('should cleanup old watch id and setup new one', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, ...args: readonly unknown[]) => {
      if (method === 'FileSystem.unwatchFile') {
        return
      }
      if (method === 'FileSystem.watchFile') {
        return
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RpcRegistry.set(RpcRegistry.RpcId.FileSystemWorker, mockRpc)

  const oldWatchId = 456
  const newWatchId = 789
  const uri = '/test/path'

  // Register old callback first
  WatchCallbacks.registerWatchCallback(oldWatchId, async () => {})
  expect(WatchCallbacks.hasWatchCallback(oldWatchId)).toBe(true)

  await setupChangeListener(oldWatchId, newWatchId, uri)

  expect(WatchCallbacks.hasWatchCallback(oldWatchId)).toBe(false)
  expect(WatchCallbacks.hasWatchCallback(newWatchId)).toBe(true)
})

test('should handle errors gracefully', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, ...args: readonly unknown[]) => {
      throw new Error('FileSystem error')
    },
  })
  RpcRegistry.set(RpcRegistry.RpcId.FileSystemWorker, mockRpc)

  const oldWatchId = 0
  const newWatchId = 123
  const uri = '/test/path'

  // Should not throw
  await expect(setupChangeListener(oldWatchId, newWatchId, uri)).resolves.toBeUndefined()
})

test('should call FileSystem methods with correct parameters', async () => {
  const invokeSpy = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: invokeSpy,
  })
  RpcRegistry.set(RpcRegistry.RpcId.FileSystemWorker, mockRpc)

  const oldWatchId = 456
  const newWatchId = 789
  const uri = '/test/path'

  await setupChangeListener(oldWatchId, newWatchId, uri)

  expect(invokeSpy).toHaveBeenCalledWith('FileSystem.unwatchFile', oldWatchId)
  expect(invokeSpy).toHaveBeenCalledWith('FileSystem.watchFile', newWatchId, uri, RpcRegistry.RpcId.OutputWorker)
})
