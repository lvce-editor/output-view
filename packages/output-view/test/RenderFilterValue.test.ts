import { test, expect } from '@jest/globals'
import type { OutputState } from '../src/parts/OutputState/OutputState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { renderFilterValue } from '../src/parts/RenderFilterValue/RenderFilterValue.ts'

test.skip('renderFilterValue returns correct ViewletCommand when filterValue changes', () => {
  const oldState: OutputState = createDefaultState()
  const newState: OutputState = {
    ...createDefaultState(),
    filterValue: 'test filter',
  }

  const result = renderFilterValue(oldState, newState)

  expect(result).toEqual(['Viewlet.setValueByName', 'filter', 'test filter'])
})

test.skip('renderFilterValue returns correct ViewletCommand when filterValue is empty', () => {
  const oldState: OutputState = createDefaultState()
  const newState: OutputState = {
    ...createDefaultState(),
    filterValue: '',
  }

  const result = renderFilterValue(oldState, newState)

  expect(result).toEqual(['Viewlet.setValueByName', 'filter', ''])
})

test.skip('renderFilterValue returns correct ViewletCommand when filterValue has special characters', () => {
  const oldState: OutputState = createDefaultState()
  const newState: OutputState = {
    ...createDefaultState(),
    filterValue: 'error: "unexpected token"',
  }

  const result = renderFilterValue(oldState, newState)

  expect(result).toEqual(['Viewlet.setValueByName', 'filter', 'error: "unexpected token"'])
})
