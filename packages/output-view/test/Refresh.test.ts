import { test, expect } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { refresh } from '../src/parts/Refresh/Refresh.ts'

test('refresh returns state unchanged if no matching option', async () => {
  const state = createDefaultState()
  const result = await refresh(state)
  expect(result).toEqual(state)
})
