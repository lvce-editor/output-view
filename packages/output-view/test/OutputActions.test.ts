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
      { id: 'main', uri: 'file:///main', label: 'Main' },
      { id: 'shared', uri: 'file:///shared', label: 'Shared' },
    ],
  }
  const actions = OutputActions.getActions(state)
  expect(actions).toEqual([])
})

test('getActions returns empty array for state with selected option', () => {
  const state: OutputState = {
    ...createDefaultState(),
    options: [
      { id: 'main', uri: 'file:///main', label: 'Main' },
      { id: 'shared', uri: 'file:///shared', label: 'Shared' },
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
    options: [
      { id: 'main', uri: 'file:///main', label: 'Main' },
    ],
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
    options: [
      { id: 'main', uri: 'file:///main', label: 'Main' },
      { id: 'shared', uri: 'file:///shared', label: 'Shared' },
      { id: 'debug', uri: 'file:///debug', label: 'Debug' },
    ],
    selectedOption: 'main',
    filterValue: 'test',
    error: 'Some error',
    errorCode: 400,
    listItems: [
      [{ type: 'Text', value: 'test line' }],
    ],
    filteredItems: [
      [{ type: 'Text', value: 'filtered line' }],
    ],
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
  expect(actions1).toBe(actions2) // Same reference
})
