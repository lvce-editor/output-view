import { test, expect } from '@jest/globals'
import type { OutputState } from '../src/parts/OutputState/OutputState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleButtonClick } from '../src/parts/HandleButtonClick/HandleButtonClick.ts'

test('handleButtonClick - unknown name is noop', async () => {
  const state: OutputState = createDefaultState()
  const result = await handleButtonClick(state, 'unknown')
  expect(result).toBe(state)
})
