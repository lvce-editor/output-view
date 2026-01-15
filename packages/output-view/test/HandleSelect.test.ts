import { test, expect } from '@jest/globals'
import { RendererWorker, FileSystemWorker } from '@lvce-editor/rpc-registry'
import type { OutputState } from '../src/parts/OutputState/OutputState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleSelect } from '../src/parts/HandleSelect/HandleSelect.ts'
import * as LinePartType from '../src/parts/LinePartType/LinePartType.ts'

test('handleSelect - no matching option returns same state', async () => {
  const state: OutputState = { ...createDefaultState(), options: [{ id: 'a', label: 'A', uri: 'file:///a' }] }
  const result = await handleSelect(state, 'x')
  expect(result).toBe(state)
})

test('handleSelect - loads lines and updates state', async () => {
  const mockFileSystemRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.readFile': () => 'l1\nl2',
    'FileSystem.watchFile': () => undefined,
  })
  const mockRendererRpc = RendererWorker.registerMockRpc({})
  const state: OutputState = {
    ...createDefaultState(),
    options: [{ id: 'a', label: 'A', uri: 'file:///a' }],
    selectedOption: 'a',
  }
  const result = await handleSelect(state, 'a')
  expect(result.listItems).toEqual([[{ type: LinePartType.Text, value: 'l1' }], [{ type: LinePartType.Text, value: 'l2' }]])
  expect(result.error).toBe('')
  expect(result.errorCode).toBe(0)
  expect(mockFileSystemRpc.invocations).toEqual([
    ['FileSystem.readFile', 'file:///a'],
    ['FileSystem.watchFile', expect.any(Number), 'file:///a', expect.any(Number)],
  ])
  expect(mockRendererRpc.invocations).toEqual([])
})
