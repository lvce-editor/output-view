import { test, expect } from '@jest/globals'
import { getClickHandler } from '../src/parts/GetClickHandler/GetClickHandler.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'

test('getClickHandler - returns noop for unknown', async () => {
  const handler = getClickHandler('unknown')
  const state = createDefaultState()
  const result = await handler(state)
  expect(result).toBe(state)
})

test('getClickHandler - returns clear for Clear', () => {
  const handler = getClickHandler(InputName.Clear)
  expect(typeof handler).toBe('function')
})
