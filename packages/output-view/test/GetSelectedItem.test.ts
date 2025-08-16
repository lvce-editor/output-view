import { test, expect } from '@jest/globals'
import { getSelectedItem } from '../src/parts/GetSelectedItem/GetSelectedItem.ts'

test('getSelectedItem - returns selectedOption when provided', () => {
  expect(getSelectedItem('custom-option', 0)).toBe('custom-option')
  expect(getSelectedItem('custom-option', 1)).toBe('custom-option')
})

test('getSelectedItem - web returns empty', () => {
  expect(getSelectedItem('', 1)).toBe('')
})

test('getSelectedItem - native returns default log path', () => {
  expect(getSelectedItem('', 0)).toBe('MainProcess')
})
