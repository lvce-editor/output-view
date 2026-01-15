import { test, expect } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { renderSelectedItem } from '../src/parts/RenderSelectedItem/RenderSelectedItem.ts'

test('renderSelectedItem returns correct ViewletCommand when selectedOption changes', () => {
  const oldState = createDefaultState()
  const newState = {
    ...oldState,
    parentId: 123,
    selectedOption: 'test-option',
  }

  const result = renderSelectedItem(oldState, newState)

  expect(result).toEqual(['Viewlet.setValueByName', 123, 'output', 'test-option'])
})

test('renderSelectedItem returns correct ViewletCommand with different selectedOption', () => {
  const oldState = createDefaultState()
  const newState = {
    ...oldState,
    parentId: 456,
    selectedOption: 'another-option',
  }

  const result = renderSelectedItem(oldState, newState)

  expect(result).toEqual(['Viewlet.setValueByName', 456, 'output', 'another-option'])
})

test('renderSelectedItem returns correct ViewletCommand with empty selectedOption', () => {
  const oldState = createDefaultState()
  const newState = {
    ...oldState,
    parentId: 789,
    selectedOption: '',
  }

  const result = renderSelectedItem(oldState, newState)

  expect(result).toEqual(['Viewlet.setValueByName', 789, 'output', ''])
})

test('renderSelectedItem returns correct ViewletCommand with numeric selectedOption', () => {
  const oldState = createDefaultState()
  const newState = {
    ...oldState,
    parentId: 999,
    selectedOption: '123',
  }

  const result = renderSelectedItem(oldState, newState)

  expect(result).toEqual(['Viewlet.setValueByName', 999, 'output', '123'])
})
