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

test('filterItems - filters structured lines by message and shortened source', () => {
  const items: readonly Line[] = [
    [
      { type: LinePartType.LogLevel, value: 'error' },
      { type: LinePartType.Text, value: 'cannot execute command ' },
      { label: 'main.js:7', type: LinePartType.Link, value: 'file:///workspace/main.js:7' },
    ],
  ]
  expect(filterItems(items, 'cannot execute')).toEqual(items)
  expect(filterItems(items, 'main.js:7')).toEqual(items)
  expect(filterItems(items, '2026-07-29')).toEqual([])
})

test('filterItems - filters case insensitively', () => {
  const matchingItem: Line = [{ type: LinePartType.Text, value: 'StatusBar.handleItemsChanged' }]
  const items: readonly Line[] = [matchingItem, [{ type: LinePartType.Text, value: 'handleBlur instance not found' }]]
  expect(filterItems(items, 'status')).toEqual([matchingItem])
})
