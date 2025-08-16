import { test, expect } from '@jest/globals'
import { getSelectedItem } from '../src/parts/GetSelectedItem/GetSelectedItem.ts'

test('getSelectedItem - web returns empty', () => {
  expect(getSelectedItem('', 1)).toBe('')
})

test('getSelectedItem - native returns default log path', () => {
  expect(getSelectedItem('', 0)).toBe('MainProcess')
})
