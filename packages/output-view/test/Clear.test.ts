import { test, expect } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import type { OutputState } from '../src/parts/OutputState/OutputState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as FileSystemWorker from '../src/parts/FileSystemWorker/FileSystemWorker.ts'
import { clear } from '../src/parts/Clear/Clear.ts'

test('clear - no selected option returns same state', async () => {
  const state: OutputState = { ...createDefaultState(), options: [{ id: 'a', uri: 'file:///a', label: 'A' }], selectedOption: 'x' }
  const result = await clear(state)
  expect(result).toBe(state)
})

test('clear - clears file and reloads', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, uri: string, content?: string) => {
      if (method === 'FileSystem.writeFile') {
        expect(content).toBe('')
        return undefined
      }
      if (method === 'FileSystem.readFile') {
        return ''
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  FileSystemWorker.set(mockRpc)
  const state: OutputState = { ...createDefaultState(), options: [{ id: 'a', uri: 'file:///a', label: 'A' }], selectedOption: 'a' }
  const result = await clear(state)
  expect(result.listItems).toEqual([''])
  expect(result.error).toBe('')
  expect(result.errorCode).toBe(0)
})


