import { test, expect } from '@jest/globals'
import type { OutputState } from '../src/parts/OutputState/OutputState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as OutputActions from '../src/parts/OutputActions/OutputActions.ts'
import * as ActionType from '../src/parts/ActionType/ActionType.ts'

test.skip('getActions - builds actions from state options', () => {
  const state: OutputState = {
    ...createDefaultState(),
    options: [
      { id: 'main', uri: 'file:///main', label: 'Main' },
      { id: 'shared', uri: 'file:///shared', label: 'Shared' },
    ],
  }
  const actions = OutputActions.getActions(state)
  expect(actions[0].type).toBe(ActionType.Select)
  expect(actions[0].options).toEqual(['Main', 'Shared'])
})
