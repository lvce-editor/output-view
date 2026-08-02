/* eslint-disable rpc/prefer-using-mock-rpc */
import { test, expect } from '@jest/globals'
import { ExtensionManagementWorker, FileSystemWorker } from '@lvce-editor/rpc-registry'
import type { OutputState } from '../src/parts/OutputState/OutputState.ts'
import { clear } from '../src/parts/Clear/Clear.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as LinePartType from '../src/parts/LinePartType/LinePartType.ts'

test('clear - no selected option returns same state', async () => {
  const state: OutputState = { ...createDefaultState(), options: [{ id: 'a', label: 'A', uri: 'file:///a' }], selectedOption: 'x' }
  const result = await clear(state)
  expect(result).toBe(state)
})

test('clear - clears file and reloads', async () => {
  const mockRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.readFile': () => '',
    'FileSystem.writeFile': () => undefined,
  })
  const state: OutputState = { ...createDefaultState(), options: [{ id: 'a', label: 'A', uri: 'file:///a' }], selectedOption: 'a' }
  const result = await clear(state)
  expect(result.listItems).toEqual([[{ type: LinePartType.Text, value: '' }]])
  expect(result.error).toBe('')
  expect(result.errorCode).toBe(0)
  expect(mockRpc.invocations).toEqual([
    ['FileSystem.writeFile', 'file:///a', ''],
    ['FileSystem.readFile', 'file:///a'],
  ])
})

test('clear - clears isolated extension output through extension management worker', async () => {
  const uri = 'extension-output://test.extension/channel'
  const mockRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.clearOutputChannel': () => undefined,
    'Extensions.readOutputChannel': () => '',
  })
  const state: OutputState = { ...createDefaultState(), options: [{ id: 'a', label: 'A', uri }], selectedOption: 'a' }

  const result = await clear(state)

  expect(result.listItems).toEqual([[{ type: LinePartType.Text, value: '' }]])
  expect(result.error).toBe('')
  expect(result.errorCode).toBe(0)
  expect(mockRpc.invocations).toEqual([
    ['Extensions.clearOutputChannel', uri],
    ['Extensions.readOutputChannel', uri],
  ])
})
