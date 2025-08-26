import { test, expect } from '@jest/globals'
import type { OutputState } from '../src/parts/OutputState/OutputState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleFilterInput } from '../src/parts/HandleFilterInput/HandleFilterInput.ts'
import * as LinePartType from '../src/parts/LinePartType/LinePartType.ts'

test('handleFilterInput - updates filter and filteredItems', async () => {
  const state: OutputState = {
    ...createDefaultState(),
    listItems: [
      [{ type: LinePartType.Text, value: 'apple' }],
      [{ type: LinePartType.Text, value: 'banana' }],
      [{ type: LinePartType.Text, value: 'carrot' }],
    ],
  }
  const result = await handleFilterInput(state, 'a')
  expect(result.filterValue).toBe('a')
  expect(result.filteredItems).toEqual([
    [{ type: LinePartType.Text, value: 'apple' }],
    [{ type: LinePartType.Text, value: 'banana' }],
    [{ type: LinePartType.Text, value: 'carrot' }],
  ])
})
