import { test, expect } from '@jest/globals'
import {
  registerWatchCallback,
  executeWatchCallBack,
  unregisterWatchCallback,
  clearWatchCallbacks,
  hasWatchCallback,
} from '../src/parts/WatchCallbacks/WatchCallbacks.ts'

test('registerWatchCallback - registers a callback function', () => {
  const mockCallback = async (watchId: number): Promise<void> => {}
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

const mockCallback = async (watchId: number): Promise<void> => {}

test('unregisterWatchCallback - removes registered callback', () => {
  registerWatchCallback(3, mockCallback)
  unregisterWatchCallback(3)
  expect(hasWatchCallback(3)).toBe(false)
})

test('unregisterWatchCallback - does nothing for unregistered callback', () => {
  expect(() => unregisterWatchCallback(999)).not.toThrow()
})

test('clearWatchCallbacks - removes all registered callbacks', () => {
  const mockCallback1 = async (watchId: number): Promise<void> => {}
  const mockCallback2 = async (watchId: number): Promise<void> => {}

  registerWatchCallback(4, mockCallback1)
  registerWatchCallback(5, mockCallback2)

  expect(() => executeWatchCallBack(4)).not.toThrow()
  expect(() => executeWatchCallBack(5)).not.toThrow()

  clearWatchCallbacks()

  expect(() => executeWatchCallBack(4)).toThrow()
  expect(() => executeWatchCallBack(5)).toThrow()
})

test('clearWatchCallbacks - works when no callbacks are registered', () => {
  expect(() => clearWatchCallbacks()).not.toThrow()
})

test('multiple callbacks can be registered and executed independently', async () => {
  let callback1Executed = false
  let callback2Executed = false

  const mockCallback1 = async (watchId: number): Promise<void> => {
    callback1Executed = true
  }

  const mockCallback2 = async (watchId: number): Promise<void> => {
    callback2Executed = true
  }

  registerWatchCallback(6, mockCallback1)
  registerWatchCallback(7, mockCallback2)

  executeWatchCallBack(6)
  expect(callback1Executed).toBe(true)
  expect(callback2Executed).toBe(false)

  executeWatchCallBack(7)
  expect(callback2Executed).toBe(true)
})
