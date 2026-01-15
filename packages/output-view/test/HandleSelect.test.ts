import { test, expect } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { OutputState } from '../src/parts/OutputState/OutputState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as FileSystemWorker from '../src/parts/FileSystemWorker/FileSystemWorker.ts'
import { handleSelect } from '../src/parts/HandleSelect/HandleSelect.ts'
import * as LinePartType from '../src/parts/LinePartType/LinePartType.ts'

test('handleSelect - no matching option returns same state', async () => {
  const state: OutputState = { ...createDefaultState(), options: [{ id: 'a', label: 'A', uri: 'file:///a' }] }
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
    options: [{ id: 'a', label: 'A', uri: 'file:///a' }],
    selectedOption: 'a',
  }
  const result = await handleSelect(state, 'a')
  expect(result.listItems).toEqual([[{ type: LinePartType.Text, value: 'l1' }], [{ type: LinePartType.Text, value: 'l2' }]])
  expect(result.error).toBe('')
  expect(result.errorCode).toBe(0)
})
