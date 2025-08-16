import { test, expect } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'
import { renderFilterValue } from '../src/parts/RenderFilterValue/RenderFilterValue.ts'

test('renderFilterValue returns correct ViewletCommand structure', () => {
  const oldState = createDefaultState()
  const newState = {
    ...createDefaultState(),
    filterValue: 'test-filter',
    parentId: 'test-parent'
  }
  
  const result = renderFilterValue(oldState, newState)
  
  expect(result).toEqual([
    'Viewlet.setValueByName',
    'test-parent',
    InputName.Filter,
    'test-filter'
  ])
})

test('renderFilterValue handles empty filter value', () => {
  const oldState = createDefaultState()
  const newState = {
    ...createDefaultState(),
    filterValue: '',
    parentId: 'test-parent'
  }
  
  const result = renderFilterValue(oldState, newState)
  
  expect(result).toEqual([
    'Viewlet.setValueByName',
    'test-parent',
    InputName.Filter,
    ''
  ])
})

test('renderFilterValue handles different parent IDs', () => {
  const oldState = createDefaultState()
  const newState = {
    ...createDefaultState(),
    filterValue: 'filter-value',
    parentId: 'different-parent'
  }
  
  const result = renderFilterValue(oldState, newState)
  
  expect(result[1]).toBe('different-parent')
  expect(result[3]).toBe('filter-value')
})

test('renderFilterValue ignores oldState values', () => {
  const oldState = {
    ...createDefaultState(),
    filterValue: 'old-filter',
    parentId: 'old-parent'
  }
  
  const newState = {
    ...createDefaultState(),
    filterValue: 'new-filter',
    parentId: 'new-parent'
  }
  
  const result = renderFilterValue(oldState, newState)
  
  expect(result).toEqual([
    'Viewlet.setValueByName',
    'new-parent',
    InputName.Filter,
    'new-filter'
  ])
})
