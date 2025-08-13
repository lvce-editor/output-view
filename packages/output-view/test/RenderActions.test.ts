import { test, expect } from '@jest/globals'
import type { OutputState } from '../src/parts/OutputState/OutputState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { renderActions } from '../src/parts/RenderActions/RenderActions.ts'

test('renderActions - returns virtual dom from options', () => {
  const base: OutputState = createDefaultState()
  const state: OutputState = {
    ...base,
    options: [
      { id: 'a', uri: 'file:///a', label: 'A' },
      { id: 'b', uri: 'file:///b', label: 'B' },
    ],
  }
  const dom = renderActions(state)
  expect(Array.isArray(dom)).toBe(true)
  expect(dom.length).toBeGreaterThan(0)
})
