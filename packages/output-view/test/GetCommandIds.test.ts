import { expect, test } from '@jest/globals'
import { commandMapRef } from '../src/parts/CommandMapRef/CommandMapRef.ts'
import { getCommandIds } from '../src/parts/GetCommandIds/GetCommandIds.ts'

test.skip('getCommandIds - extracts ids', () => {
  const map = commandMapRef as Record<string, unknown>
  for (const k of Object.keys(map)) delete map[k]
  map['Output.open'] = (): void => {}
  map['Output.clear'] = (): void => {}
  map['Problems.focusNext'] = (): void => {}
  expect(getCommandIds()).toEqual(['open', 'clear', 'focusNext'])
})

test.skip('getCommandIds - returns ids in insertion order', () => {
  const map = commandMapRef as Record<string, unknown>
  for (const key of Object.keys(map)) {
    delete map[key]
  }
  map['Output.open'] = (): void => {}
  map['Output.clear'] = (): void => {}
  map['Problems.focusNext'] = (): void => {}
  expect(getCommandIds()).toEqual(['open', 'clear', 'focusNext'])
})
