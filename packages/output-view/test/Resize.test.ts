import { test, expect } from '@jest/globals'
import type { OutputState } from '../src/parts/OutputState/OutputState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { resize } from '../src/parts/Resize/Resize.ts'

test('resize updates width and height', () => {
  const state: OutputState = createDefaultState()
  const newState: OutputState = resize(state, { width: 800, height: 600 })
  expect(newState.width).toBe(800)
  expect(newState.height).toBe(600)
})

test('resize preserves other state properties', () => {
  const state: OutputState = { ...createDefaultState(), message: 'hello' }
  const newState: OutputState = resize(state, { width: 100 })
  expect(newState.message).toBe('hello')
  expect(newState.width).toBe(100)
})

test('resize can update multiple properties', () => {
  const state: OutputState = createDefaultState()
  const newState: OutputState = resize(state, { width: 123, height: 456, x: 10, y: 20 })
  expect(newState).toMatchObject({ width: 123, height: 456, x: 10, y: 20 })
})
