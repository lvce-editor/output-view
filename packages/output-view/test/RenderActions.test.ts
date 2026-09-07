import { test, expect } from '@jest/globals'
import type { OutputState } from '../src/parts/OutputState/OutputState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { renderActions } from '../src/parts/RenderActions/RenderActions.ts'

test('renderActions - returns virtual dom from options', () => {
  const base: OutputState = createDefaultState()
  const state: OutputState = {
    ...base,
    options: [
      { id: 'a', label: 'A', uri: 'file:///a' },
      { id: 'b', label: 'B', uri: 'file:///b' },
    ],
  }
  const dom = renderActions(state)
  expect(Array.isArray(dom)).toBe(true)
  expect(dom.length).toBeGreaterThan(0)
})

test('renderActions - selects the channel whose output is displayed', () => {
  const state: OutputState = {
    ...createDefaultState(),
    options: [
      { id: 'main-process', label: 'Main Process', uri: 'file:///main-process' },
      { id: 'devcontainer', label: 'Dev Container', uri: 'extension-output://devcontainer' },
    ],
    selectedOption: 'devcontainer',
  }

  const dom = renderActions(state)
  const selectedOptions = dom.filter((node) => node.selected)

  expect(selectedOptions).toEqual([expect.objectContaining({ value: 'devcontainer' })])
})
