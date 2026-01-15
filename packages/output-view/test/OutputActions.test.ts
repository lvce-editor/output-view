import { test, expect } from '@jest/globals'
import type { OutputState } from '../src/parts/OutputState/OutputState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as OutputActions from '../src/parts/OutputActions/OutputActions.ts'

test('getActions returns empty array for default state', () => {
  const state = createDefaultState()
  const actions = OutputActions.getActions(state)
  expect(actions).toEqual([])
})

test('getActions returns empty array for state with options', () => {
  const state: OutputState = {
    ...createDefaultState(),
    options: [
      { id: 'main', label: 'Main', uri: 'file:///main' },
      { id: 'shared', label: 'Shared', uri: 'file:///shared' },
    ],
  }
  const actions = OutputActions.getActions(state)
  expect(actions).toEqual([])
})

test('getActions returns empty array for state with selected option', () => {
  const state: OutputState = {
    ...createDefaultState(),
    options: [
      { id: 'main', label: 'Main', uri: 'file:///main' },
      { id: 'shared', label: 'Shared', uri: 'file:///shared' },
    ],
    selectedOption: 'main',
  }
  const actions = OutputActions.getActions(state)
  expect(actions).toEqual([])
})

test('getActions returns empty array for state with filter value', () => {
  const state: OutputState = {
    ...createDefaultState(),
    filterValue: 'test',
    options: [{ id: 'main', label: 'Main', uri: 'file:///main' }],
  }
  const actions = OutputActions.getActions(state)
  expect(actions).toEqual([])
})

test('getActions returns empty array for state with error', () => {
  const state: OutputState = {
    ...createDefaultState(),
    error: 'Test error message',
    errorCode: 500,
  }
  const actions = OutputActions.getActions(state)
  expect(actions).toEqual([])
})

test('getActions returns empty array for complex state', () => {
  const state: OutputState = {
    ...createDefaultState(),
    error: 'Some error',
    errorCode: 400,
    filteredItems: [[{ type: 'Text', value: 'filtered line' }]],
    filterValue: 'test',
    listItems: [[{ type: 'Text', value: 'test line' }]],
    options: [
      { id: 'main', label: 'Main', uri: 'file:///main' },
      { id: 'shared', label: 'Shared', uri: 'file:///shared' },
      { id: 'debug', label: 'Debug', uri: 'file:///debug' },
    ],
    selectedOption: 'main',
  }
  const actions = OutputActions.getActions(state)
  expect(actions).toEqual([])
})

test('getActions returns consistent empty array', () => {
  const state = createDefaultState()
  const actions1 = OutputActions.getActions(state)
  const actions2 = OutputActions.getActions(state)

  expect(actions1).toEqual([])
  expect(actions2).toEqual([])
  expect(actions1).toEqual(actions2) // Same reference
})
