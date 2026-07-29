import { test, expect } from '@jest/globals'
import type { Line } from '../src/parts/Line/Line.ts'
import { filterItems } from '../src/parts/FilterItems/FilterItems.ts'
import * as LinePartType from '../src/parts/LinePartType/LinePartType.ts'

test('filterItems - returns original when filter empty', () => {
  const items: readonly Line[] = [[{ type: LinePartType.Text, value: 'a' }], [{ type: LinePartType.Text, value: 'b' }]]
  expect(filterItems(items, '')).toEqual(items)
})

test('filterItems - filters by substring', () => {
  const items: readonly Line[] = [
    [{ type: LinePartType.Text, value: 'alpha' }],
    [{ type: LinePartType.Text, value: 'beta' }],
    [{ type: LinePartType.Text, value: 'gamma' }],
  ]
  expect(filterItems(items, 'a')).toEqual(items)
})

test('filterItems - filters case insensitively', () => {
  const matchingItem: Line = [{ type: LinePartType.Text, value: 'StatusBar.handleItemsChanged' }]
  const items: readonly Line[] = [matchingItem, [{ type: LinePartType.Text, value: 'handleBlur instance not found' }]]
  expect(filterItems(items, 'status')).toEqual([matchingItem])
})
