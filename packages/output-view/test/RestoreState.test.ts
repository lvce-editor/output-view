import { test, expect } from '@jest/globals'
import { restoreState } from '../src/parts/RestoreState/RestoreState.ts'

test('restoreState - returns default values when savedState is null', () => {
  const result = restoreState(null)
  expect(result).toEqual({
    filterValue: '',
    selectedOption: '',
    scrollLockEnabled: false,
  })
})

test('restoreState - returns default values when savedState is undefined', () => {
  const result = restoreState(undefined)
  expect(result).toEqual({
    filterValue: '',
    selectedOption: '',
    scrollLockEnabled: false,
  })
})

test('restoreState - returns default values when savedState is empty object', () => {
  const result = restoreState({})
  expect(result).toEqual({
    filterValue: '',
    selectedOption: '',
    scrollLockEnabled: false,
  })
})

test('restoreState - returns saved filterValue when valid', () => {
  const result = restoreState({ filterValue: 'test-filter' })
  expect(result).toEqual({
    filterValue: 'test-filter',
    selectedOption: '',
    scrollLockEnabled: false,
  })
})

test('restoreState - returns default filterValue when type is invalid', () => {
  const result = restoreState({ filterValue: 123 })
  expect(result).toEqual({
    filterValue: '',
    selectedOption: '',
    scrollLockEnabled: false,
  })
})

test('restoreState - returns saved selectedOption when valid', () => {
  const result = restoreState({ selectedOption: 'test-option' })
  expect(result).toEqual({
    filterValue: '',
    selectedOption: 'test-option',
    scrollLockEnabled: false,
  })
})

test('restoreState - returns default selectedOption when type is invalid', () => {
  const result = restoreState({ selectedOption: 456 })
  expect(result).toEqual({
    filterValue: '',
    selectedOption: '',
    scrollLockEnabled: false,
  })
})

test('restoreState - returns saved scrollLockEnabled when valid', () => {
  const result = restoreState({ scrollLockEnabled: true })
  expect(result).toEqual({
    filterValue: '',
    selectedOption: '',
    scrollLockEnabled: true,
  })
})

test('restoreState - returns default scrollLockEnabled when type is invalid', () => {
  const result = restoreState({ scrollLockEnabled: 'invalid' })
  expect(result).toEqual({
    filterValue: '',
    selectedOption: '',
    scrollLockEnabled: false,
  })
})

test('restoreState - returns all saved values when all are valid', () => {
  const result = restoreState({
    filterValue: 'test-filter',
    selectedOption: 'test-option',
    scrollLockEnabled: true,
  })
  expect(result).toEqual({
    filterValue: 'test-filter',
    selectedOption: 'test-option',
    scrollLockEnabled: true,
  })
})
