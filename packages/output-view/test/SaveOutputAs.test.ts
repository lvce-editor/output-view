import { test, expect } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { saveOutputAs } from '../src/parts/SaveOutputAs/SaveOutputAs.ts'

test('saveOutputAs returns the same state for now', async () => {
  const state = createDefaultState()
  
  const result = await saveOutputAs(state)
  
  expect(result).toBe(state)
})

test('saveOutputAs returns same state for different input states', async () => {
  const state1 = createDefaultState()
  const state2 = createDefaultState()
  
  const result1 = await saveOutputAs(state1)
  const result2 = await saveOutputAs(state2)
  
  expect(result1).toBe(state1)
  expect(result2).toBe(state2)
})

test('saveOutputAs resolves successfully', async () => {
  const state = createDefaultState()
  
  await expect(saveOutputAs(state)).resolves.toBe(state)
})
