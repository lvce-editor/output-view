import { expect, test } from '@jest/globals'
import type { OutputState } from '../src/parts/OutputState/OutputState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { setOutputChannel } from '../src/parts/SetOutputChannel/SetOutputChannel.ts'

test('setOutputChannel - returns same state for now', async () => {
  const state: OutputState = createDefaultState()
  const result = await setOutputChannel(state)
  expect(result).toEqual(state)
})

test('setOutputChannel returns a new state', async () => {
  const state: OutputState = createDefaultState()
  const result = await setOutputChannel(state)
  expect(result).not.toBe(state)
})
