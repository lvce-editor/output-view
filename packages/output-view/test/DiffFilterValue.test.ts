import { test, expect } from '@jest/globals'
import type { OutputState } from '../src/parts/OutputState/OutputState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as DiffFilterValue from '../src/parts/DiffFilterValue/DiffFilterValue.ts'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'

test('isEqual - when inputSource is User, returns true regardless of value', () => {
  const oldState: OutputState = { ...createDefaultState(), filterValue: 'a' }
  const newState: OutputState = { ...createDefaultState(), filterValue: 'b', inputSource: InputSource.User }
  expect(DiffFilterValue.isEqual(oldState, newState)).toBe(true)
})

test('isEqual - compares filterValue when inputSource is not User', () => {
  const oldState: OutputState = { ...createDefaultState(), filterValue: 'a' }
  const equalNew: OutputState = { ...createDefaultState(), filterValue: 'a' }
  const diffNew: OutputState = { ...createDefaultState(), filterValue: 'b', inputSource: InputSource.Script }
  expect(DiffFilterValue.isEqual(oldState, equalNew)).toBe(true)
  expect(DiffFilterValue.isEqual(oldState, diffNew)).toBe(false)
})
