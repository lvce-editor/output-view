import { test, expect } from '@jest/globals'
import { commandMapRef } from '../src/parts/CommandMapRef/CommandMapRef.ts'
import { getCommandIds } from '../src/parts/GetCommandIds/GetCommandIds.ts'

test('getCommandIds - extracts ids after dot from command keys', () => {
  const map: Record<string, unknown> = commandMapRef as Record<string, unknown>
  for (const key of Object.keys(map)) {
    delete map[key]
  }
  map['Output.open'] = () => {}
  map['Output.clear'] = () => {}
  map['Problems.focusNext'] = () => {}

  const ids = getCommandIds()

  expect(ids).toEqual(['open', 'clear', 'focusNext'])
})


