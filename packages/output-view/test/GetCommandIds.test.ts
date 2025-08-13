import { test, expect } from '@jest/globals'
import { getCommandIds } from '../src/parts/GetCommandIds/GetCommandIds.ts'
import { commandMapRef } from '../src/parts/CommandMapRef/CommandMapRef.ts'

test('getCommandIds - extracts ids', () => {
  const map = commandMapRef as Record<string, unknown>
  for (const k of Object.keys(map)) delete map[k]
  map['Output.open'] = () => {}
  map['Output.clear'] = () => {}
  map['Problems.focusNext'] = () => {}
  expect(getCommandIds()).toEqual(['open', 'clear', 'focusNext'])
})

import { test, expect } from '@jest/globals'
import { getCommandIds } from '../src/parts/GetCommandIds/GetCommandIds.ts'
import { commandMapRef } from '../src/parts/CommandMapRef/CommandMapRef.ts'

test('getCommandIds - returns ids in insertion order', () => {
  const map = commandMapRef as Record<string, unknown>
  for (const key of Object.keys(map)) {
    delete map[key]
  }
  map['Output.open'] = () => {}
  map['Output.clear'] = () => {}
  map['Problems.focusNext'] = () => {}
  expect(getCommandIds()).toEqual(['open', 'clear', 'focusNext'])
})
