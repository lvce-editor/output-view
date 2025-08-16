import { test, expect } from '@jest/globals'
import {
  registerWatchCallback,
  executeWatchCallBack,
  unregisterWatchCallback,
  clearWatchCallbacks,
  hasWatchCallback,
} from '../src/parts/WatchCallbacks/WatchCallbacks.ts'

const mockCallback = async (watchId: number): Promise<void> => {}

test('registerWatchCallback - registers a callback function', () => {
  registerWatchCallback(1, mockCallback)
  expect(hasWatchCallback(1)).toBe(true)
})

test('executeWatchCallBack - executes registered callback', async () => {
  let executed = false
  let receivedWatchId = 0

  const mockCallback = async (watchId: number): Promise<void> => {
    executed = true
    receivedWatchId = watchId
  }

  registerWatchCallback(2, mockCallback)
  executeWatchCallBack(2)

  expect(executed).toBe(true)
  expect(receivedWatchId).toBe(2)
})

test('executeWatchCallBack - throws for unregistered callback', () => {
  expect(() => executeWatchCallBack(999)).toThrow()
})

test('unregisterWatchCallback - removes registered callback', () => {
  registerWatchCallback(3, mockCallback)
  unregisterWatchCallback(3)
  expect(hasWatchCallback(3)).toBe(false)
})

test('unregisterWatchCallback - does nothing for unregistered callback', () => {
  expect(() => unregisterWatchCallback(999)).not.toThrow()
})
