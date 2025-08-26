import { test, expect } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { renderItems } from '../src/parts/RenderItems/RenderItems.ts'

test('renderItems returns a ViewletCommand', () => {
  const state = createDefaultState()
  const result = renderItems(state, state)
  expect(Array.isArray(result)).toBe(true)
  expect(result[0]).toBe('Viewlet.setDom2')
})

test('renderItems includes highlighted dom when filterValue present', () => {
  const state = {
    ...createDefaultState(),
    filterValue: 'a',
    filteredItems: [[{ type: 1, value: 'bar' }]],
  }
  const result = renderItems(state, state)
  // result[1] is the dom array
  const dom = result[1] as any[]
  // container(Viewlet) + content container + line parent + 4 segment nodes = 7
  expect(dom.length).toBe(7)
})
