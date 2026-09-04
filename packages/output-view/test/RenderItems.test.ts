import { test, expect } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { renderItems } from '../src/parts/RenderItems/RenderItems.ts'

test('renderItems returns a ViewletCommand', () => {
  const state = { ...createDefaultState(), uid: 42 }
  const result = renderItems(state, state)
  expect(Array.isArray(result)).toBe(true)
  expect(result[0]).toBe('Viewlet.setDom2')
  expect(result[1]).toBe(42)
})
