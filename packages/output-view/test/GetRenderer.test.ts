import { test, expect } from '@jest/globals'
import * as DiffType from '../src/parts/DiffType/DiffType.ts'
import { getRenderer } from '../src/parts/GetRenderer/GetRenderer.ts'
import { renderFilterValue } from '../src/parts/RenderFilterValue/RenderFilterValue.ts'
import * as RenderItems from '../src/parts/RenderItems/RenderItems.ts'
import { renderSelectedItem } from '../src/parts/RenderSelectedItem/RenderSelectedItem.ts'

test('getRenderer returns renderItems for DiffType.RenderItems', () => {
  const renderer = getRenderer(DiffType.RenderItems)
  expect(renderer).toBe(RenderItems.renderItems)
})

test('getRenderer returns renderFilterValue for DiffType.RenderFilterValue', () => {
  const renderer = getRenderer(DiffType.RenderFilterValue)
  expect(renderer).toBe(renderFilterValue)
})

test('getRenderer returns renderSelectedItem for DiffType.RenderSelectedItem', () => {
  const renderer = getRenderer(DiffType.RenderSelectedItem)
  expect(renderer).toBe(renderSelectedItem)
})

test('getRenderer throws for unknown diffType', () => {
  expect(() => getRenderer(999)).toThrow('unknown renderer')
})
