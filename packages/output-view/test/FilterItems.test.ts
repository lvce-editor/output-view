import { test, expect } from '@jest/globals'
import { filterItems } from '../src/parts/FilterItems/FilterItems.ts'

test('filterItems - returns original when filter empty', () => {
  const items = ['a', 'b']
  expect(filterItems(items, '')).toEqual(items)
})

test('filterItems - filters by substring', () => {
  const items = ['alpha', 'beta', 'gamma']
  expect(filterItems(items, 'a')).toEqual(['alpha', 'beta', 'gamma'])
})


