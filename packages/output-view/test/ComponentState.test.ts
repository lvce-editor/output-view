import { beforeEach, expect, test } from '@jest/globals'
import type { OutputState } from '../src/parts/OutputState/OutputState.ts'
import { commandMap } from '../src/parts/CommandMap/CommandMap.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as OutputStates from '../src/parts/OutputStates/OutputStates.ts'

const uid = 42

beforeEach(() => {
  const state = { ...createDefaultState(), uid, watchId: 123 }
  OutputStates.set(uid, state, state)
})

test('gets the current worker state', () => {
  const { oldState } = OutputStates.get(uid)
  const newState = { ...oldState, filterValue: 'current filter' }
  OutputStates.set(uid, oldState, newState)

  expect(commandMap['Output.getComponentState'](uid)).toEqual(newState)
})

test('gets the component virtual DOM', () => {
  const dom = commandMap['Output.getComponentDom'](uid)

  expect(dom).toEqual(expect.arrayContaining([expect.objectContaining({ className: 'Viewlet Output' })]))
})

test('sets component state while retaining its output watcher', async () => {
  const { oldState } = OutputStates.get(uid)
  const newState: OutputState = { ...oldState, filterValue: 'live filter', watchId: 456 }

  await commandMap['Output.setComponentState'](uid, newState)

  expect(OutputStates.get(uid)).toMatchObject({ newState: { ...newState, watchId: 123 }, oldState })
  expect(commandMap['Output.getComponentState'](uid)).toMatchObject({ filterValue: 'live filter', watchId: 123 })
})

test.each([null, [], 'invalid', 1])('rejects invalid component state %p without changing state', async (value: unknown) => {
  const before = OutputStates.get(uid)

  await expect(commandMap['Output.setComponentState'](uid, value as OutputState)).rejects.toThrow('Output state must be an object')

  expect(OutputStates.get(uid)).toEqual(before)
})

test('rejects a changed uid without changing state', async () => {
  const before = OutputStates.get(uid)

  await expect(commandMap['Output.setComponentState'](uid, { ...before.newState, uid: 43 })).rejects.toThrow('Output state uid must remain 42')

  expect(OutputStates.get(uid)).toEqual(before)
})
