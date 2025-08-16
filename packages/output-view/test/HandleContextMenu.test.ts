import { test, expect } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleContextMenu } from '../src/parts/HandleContextMenu/HandleContextMenu.ts'

test('handleContextMenu returns the same state for now', async () => {
  const state = createDefaultState()
  const x = 100
  const y = 200
  const button = 0

  const result = await handleContextMenu(state, x, y, button)

  expect(result).toBe(state)
})

test('handleContextMenu handles different coordinates', async () => {
  const state = createDefaultState()
  const x = 500
  const y = 300
  const button = 1

  const result = await handleContextMenu(state, x, y, button)

  expect(result).toBe(state)
})

test('handleContextMenu handles different button values', async () => {
  const state = createDefaultState()
  const x = 0
  const y = 0
  const button = 2

  const result = await handleContextMenu(state, x, y, button)

  expect(result).toBe(state)
})

test('handleContextMenu handles negative coordinates', async () => {
  const state = createDefaultState()
  const x = -100
  const y = -200
  const button = 0

  const result = await handleContextMenu(state, x, y, button)

  expect(result).toBe(state)
})
