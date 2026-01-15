import { test, expect } from '@jest/globals'
import type { OutputState } from '../src/parts/OutputState/OutputState.ts'
import * as ActionType from '../src/parts/ActionType/ActionType.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as OutputActions from '../src/parts/OutputActions/OutputActions.ts'

test.skip('getActions - builds actions from state options', () => {
  const state: OutputState = {
    ...createDefaultState(),
    options: [
      { id: 'main', label: 'Main', uri: 'file:///main' },
      { id: 'shared', label: 'Shared', uri: 'file:///shared' },
    ],
  }
  const actions = OutputActions.getActions(state)
  expect(actions[0].type).toBe(ActionType.Select)
  expect(actions[0].options).toEqual(['Main', 'Shared'])
})
