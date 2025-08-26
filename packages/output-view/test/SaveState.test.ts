import { test, expect } from '@jest/globals'
import type { OutputState } from '../src/parts/OutputState/OutputState.ts'
import type { SavedState } from '../src/parts/SavedState/SavedState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'
import * as LinePartType from '../src/parts/LinePartType/LinePartType.ts'
import { saveState } from '../src/parts/SaveState/SaveState.ts'

test('saveState should extract viewMode, filterValue, and collapsedUris from OutputState', () => {
  const state: OutputState = {
    ...createDefaultState(),
    filterValue: 'test filter',
    collapsedUris: ['file:///test1.ts', 'file:///test2.ts'],
  }

  const result: SavedState = saveState(state)

  expect(result).toEqual({
    filterValue: 'test filter',
    scrollLockEnabled: false,
    collapsedUris: ['file:///test1.ts', 'file:///test2.ts'],
    selectedOption: '',
  })
})

test('saveState should handle empty state values', () => {
  const state: OutputState = {
    ...createDefaultState(),
    filterValue: '',
    collapsedUris: [],
  }

  const result: SavedState = saveState(state)

  expect(result).toEqual({
    filterValue: '',
    collapsedUris: [],
    selectedOption: '',
    scrollLockEnabled: false,
  })
})

test('saveState should preserve all other state properties but only return the required ones', () => {
  const state: OutputState = {
    ...createDefaultState(),
    uid: 999,
    focusedIndex: 5,
    message: 'some message',
    itemHeight: 30,
    x: 100,
    y: 200,
    width: 300,
    height: 400,
    filterValue: 'complex filter',
    scrollLockEnabled: false,
    inputSource: InputSource.Script,
    minLineY: 10,
    maxLineY: 20,
    listItems: [[{ type: LinePartType.Text, value: '1' }]],
    collapsedUris: ['file:///collapsed1.ts', 'file:///collapsed2.ts', 'file:///collapsed3.ts'],
    smallWidthBreakPoint: 800,
  }

  const result: SavedState = saveState(state)

  expect(result).toEqual({
    filterValue: 'complex filter',
    scrollLockEnabled: false,
    collapsedUris: ['file:///collapsed1.ts', 'file:///collapsed2.ts', 'file:///collapsed3.ts'],
    selectedOption: '',
  })

  // Original state should remain unchanged
  expect(state.uid).toBe(999)
  expect(state.focusedIndex).toBe(5)
})
