import { test, expect } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'
import { renderFilterValue } from '../src/parts/RenderFilterValue/RenderFilterValue.ts'

test('renderFilterValue returns correct ViewletCommand structure', () => {
  const oldState = createDefaultState()
  const newState = {
    ...createDefaultState(),
    filterValue: 'test-filter',
    parentId: 123,
  }

  const result = renderFilterValue(oldState, newState)

  expect(result).toEqual(['Viewlet.setValueByName', 123, InputName.Filter, 'test-filter'])
})

test('renderFilterValue handles empty filter value', () => {
  const oldState = createDefaultState()
  const newState = {
    ...createDefaultState(),
    filterValue: '',
    parentId: 456,
  }

  const result = renderFilterValue(oldState, newState)

  expect(result).toEqual(['Viewlet.setValueByName', 456, InputName.Filter, ''])
})

test('renderFilterValue handles different parent IDs', () => {
  const oldState = createDefaultState()
  const newState = {
    ...createDefaultState(),
    filterValue: 'filter-value',
    parentId: 789,
  }

  const result = renderFilterValue(oldState, newState)

  expect(result[1]).toBe(789)
  expect(result[3]).toBe('filter-value')
})

test('renderFilterValue ignores oldState values', () => {
  const oldState = {
    ...createDefaultState(),
    filterValue: 'old-filter',
    parentId: 111,
  }

  const newState = {
    ...createDefaultState(),
    filterValue: 'new-filter',
    parentId: 222,
  }

  const result = renderFilterValue(oldState, newState)

  expect(result).toEqual(['Viewlet.setValueByName', 222, InputName.Filter, 'new-filter'])
})
