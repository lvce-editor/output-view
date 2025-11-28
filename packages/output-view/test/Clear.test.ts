import { test, expect } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import type { OutputState } from '../src/parts/OutputState/OutputState.ts'
import { clear } from '../src/parts/Clear/Clear.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as FileSystemWorker from '../src/parts/FileSystemWorker/FileSystemWorker.ts'
import * as LinePartType from '../src/parts/LinePartType/LinePartType.ts'

test('clear - no selected option returns same state', async () => {
  const state: OutputState = { ...createDefaultState(), options: [{ id: 'a', uri: 'file:///a', label: 'A' }], selectedOption: 'x' }
  const result = await clear(state)
  expect(result).toBe(state)
})

test('clear - clears file and reloads', async () => {
  let wroteContent: string | undefined
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, uri: string, content?: string) => {
      if (method === 'FileSystem.writeFile') {
        wroteContent = content
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
  expect(wroteContent).toBe('')
  expect(result.listItems).toEqual([[{ type: LinePartType.Text, value: '' }]])
  expect(result.error).toBe('')
  expect(result.errorCode).toBe(0)
})
