import { test, expect } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'
import { renderFilterValue } from '../src/parts/RenderFilterValue/RenderFilterValue.ts'

test('renderFilterValue returns correct ViewletCommand structure', () => {
  const oldState = createDefaultState()
  const newState = {
    ...createDefaultState(),
    filterValue: 'test-filter',
    uid: 123,
  }

  const result = renderFilterValue(oldState, newState)

  expect(result).toEqual(['Viewlet.setValueByName', 123, InputName.Filter, 'test-filter'])
})

test('renderFilterValue handles empty filter value', () => {
  const oldState = createDefaultState()
  const newState = {
    ...createDefaultState(),
    filterValue: '',
    uid: 456,
  }

  const result = renderFilterValue(oldState, newState)

  expect(result).toEqual(['Viewlet.setValueByName', 456, InputName.Filter, ''])
})

test('renderFilterValue handles different filter values', () => {
  const oldState = createDefaultState()
  const newState = {
    ...createDefaultState(),
    filterValue: 'filter-value',
    uid: 789,
  }

  const result = renderFilterValue(oldState, newState)

  expect(result[1]).toBe(789)
  expect(result[2]).toBe(InputName.Filter)
  expect(result[3]).toBe('filter-value')
})

test('renderFilterValue ignores oldState values', () => {
  const oldState = {
    ...createDefaultState(),
    filterValue: 'old-filter',
    uid: 111,
  }

  const newState = {
    ...createDefaultState(),
    filterValue: 'new-filter',
    uid: 222,
  }

  const result = renderFilterValue(oldState, newState)

  expect(result).toEqual(['Viewlet.setValueByName', 222, InputName.Filter, 'new-filter'])
})
