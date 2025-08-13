import { test, expect } from '@jest/globals'
import type { OutputState } from '../src/parts/OutputState/OutputState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { openFindWidget } from '../src/parts/OpenFindWidget/OpenFindWidget.ts'
import { closeFindWidget } from '../src/parts/CloseFindWidget/CloseFindWidget.ts'

test('openFindWidget - returns same state for now', async () => {
  const state: OutputState = createDefaultState()
  const result = await openFindWidget(state)
  expect(result).toEqual(state)
})

test('closeFindWidget - returns same state for now', async () => {
  const state: OutputState = createDefaultState()
  const result = await closeFindWidget(state)
  expect(result).toEqual(state)
})
