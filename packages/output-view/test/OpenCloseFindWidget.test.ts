import { test, expect } from '@jest/globals'
import type { OutputState } from '../src/parts/OutputState/OutputState.ts'
import { closeFindWidget } from '../src/parts/CloseFindWidget/CloseFindWidget.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { openFindWidget } from '../src/parts/OpenFindWidget/OpenFindWidget.ts'

test('openFindWidget returns new state', async () => {
  const state: OutputState = createDefaultState()
  const result = await openFindWidget(state)
  expect(result).not.toBe(state)
})

test('closeFindWidget returns new state', async () => {
  const state: OutputState = createDefaultState()
  const result = await closeFindWidget(state)
  expect(result).not.toBe(state)
})
