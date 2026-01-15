import { test, expect } from '@jest/globals'
import { FileSystemWorker } from '@lvce-editor/rpc-registry'
import { setupChangeListener } from '../src/parts/SetupChangeListener/SetupChangeListener.ts'
import * as WatchCallbacks from '../src/parts/WatchCallbacks/WatchCallbacks.ts'

test('should setup change listener with new watch id', async () => {
  const mockRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.watchFile': () => undefined,
  })

  const oldWatchId = 0
  const newWatchId = 123
  const uri = '/test/path'

  await setupChangeListener(oldWatchId, newWatchId, uri)

  expect(WatchCallbacks.hasWatchCallback(newWatchId)).toBe(true)
  expect(mockRpc.invocations).toEqual([['FileSystem.watchFile', newWatchId, uri, expect.any(Number)]])
})

test('should cleanup old watch id and setup new one', async () => {
  const mockRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.unwatchFile': () => undefined,
    'FileSystem.watchFile': () => undefined,
  })

  const oldWatchId = 456
  const newWatchId = 789
  const uri = '/test/path'

  // Register old callback first
  WatchCallbacks.registerWatchCallback(oldWatchId, async () => {})
  expect(WatchCallbacks.hasWatchCallback(oldWatchId)).toBe(true)

  await setupChangeListener(oldWatchId, newWatchId, uri)

  expect(WatchCallbacks.hasWatchCallback(oldWatchId)).toBe(false)
  expect(WatchCallbacks.hasWatchCallback(newWatchId)).toBe(true)
  expect(mockRpc.invocations).toEqual([
    ['FileSystem.unwatchFile', oldWatchId],
    ['FileSystem.watchFile', newWatchId, uri, expect.any(Number)]
  ])
})

test('should handle errors gracefully', async () => {
  const mockRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.unwatchFile': () => {
      throw new Error('FileSystem error')
    },
    'FileSystem.watchFile': () => {
      throw new Error('FileSystem error')
    },
  })

  const oldWatchId = 0
  const newWatchId = 123
  const uri = '/test/path'

  // Should not throw
  await expect(setupChangeListener(oldWatchId, newWatchId, uri)).resolves.toBeUndefined()
  expect(mockRpc.invocations).toEqual([
    ['FileSystem.unwatchFile', oldWatchId],
    ['FileSystem.watchFile', newWatchId, uri, expect.any(Number)]
  ])
})

test('should call FileSystem methods with correct parameters', async () => {
  const mockRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.unwatchFile': () => undefined,
    'FileSystem.watchFile': () => undefined,
  })

  const oldWatchId = 456
  const newWatchId = 789
  const uri = '/test/path'

  await setupChangeListener(oldWatchId, newWatchId, uri)

  expect(mockRpc.invocations).toEqual([
    ['FileSystem.unwatchFile', oldWatchId],
    ['FileSystem.watchFile', newWatchId, uri, expect.any(Number)]
  ])
})
