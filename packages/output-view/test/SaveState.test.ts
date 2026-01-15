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
    collapsedUris: ['file:///test1.ts', 'file:///test2.ts'],
    filterValue: 'test filter',
  }

  const result: SavedState = saveState(state)

  expect(result).toEqual({
    collapsedUris: ['file:///test1.ts', 'file:///test2.ts'],
    filterValue: 'test filter',
    scrollLockEnabled: false,
    selectedOption: '',
  })
})

test('saveState should handle empty state values', () => {
  const state: OutputState = {
    ...createDefaultState(),
    collapsedUris: [],
    filterValue: '',
  }

  const result: SavedState = saveState(state)

  expect(result).toEqual({
    collapsedUris: [],
    filterValue: '',
    scrollLockEnabled: false,
    selectedOption: '',
  })
})

test('saveState should preserve all other state properties but only return the required ones', () => {
  const state: OutputState = {
    ...createDefaultState(),
    collapsedUris: ['file:///collapsed1.ts', 'file:///collapsed2.ts', 'file:///collapsed3.ts'],
    filterValue: 'complex filter',
    focusedIndex: 5,
    height: 400,
    inputSource: InputSource.Script,
    itemHeight: 30,
    listItems: [[{ type: LinePartType.Text, value: '1' }]],
    maxLineY: 20,
    message: 'some message',
    minLineY: 10,
    scrollLockEnabled: false,
    smallWidthBreakPoint: 800,
    uid: 999,
    width: 300,
    x: 100,
    y: 200,
  }

  const result: SavedState = saveState(state)

  expect(result).toEqual({
    collapsedUris: ['file:///collapsed1.ts', 'file:///collapsed2.ts', 'file:///collapsed3.ts'],
    filterValue: 'complex filter',
    scrollLockEnabled: false,
    selectedOption: '',
  })

  // Original state should remain unchanged
  expect(state.uid).toBe(999)
  expect(state.focusedIndex).toBe(5)
})
