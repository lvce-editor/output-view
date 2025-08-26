import { test, expect } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import type { OutputState } from '../src/parts/OutputState/OutputState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as FileSystemWorker from '../src/parts/FileSystemWorker/FileSystemWorker.ts'
import { handleSelect } from '../src/parts/HandleSelect/HandleSelect.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'

test('handleSelect - no matching option returns same state', async () => {
  const state: OutputState = { ...createDefaultState(), options: [{ id: 'a', uri: 'file:///a', label: 'A' }] }
  const result = await handleSelect(state, 'x')
  expect(result).toBe(state)
})

test('handleSelect - loads lines and updates state', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, uri: string) => {
      if (method === 'FileSystem.readFile') {
        return 'l1\nl2'
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRpc)
  FileSystemWorker.set(mockRpc)
  const state: OutputState = {
    ...createDefaultState(),
    options: [{ id: 'a', uri: 'file:///a', label: 'A' }],
    selectedOption: 'a',
  }
  const result = await handleSelect(state, 'a')
  expect(result.listItems).toEqual([[{ type: 'text', value: 'l1' }], [{ type: 'text', value: 'l2' }]])
  expect(result.error).toBe('')
  expect(result.errorCode).toBe(0)
})
