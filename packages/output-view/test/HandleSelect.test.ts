import { test, expect } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'
import { handleSelect } from '../src/parts/HandleSelect/HandleSelect.ts'

test('handleSelect - no matching option returns same state', async () => {
  const state = { ...createDefaultState(), options: [{ id: 'a', uri: 'file:///a', label: 'A' }] }
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
  const state = { ...createDefaultState(), options: [{ id: 'a', uri: 'file:///a', label: 'A' }] }
  const result = await handleSelect(state, 'a')
  expect(result.listItems).toEqual(['l1', 'l2'])
  expect(result.error).toBe('')
  expect(result.errorCode).toBe(0)
})


