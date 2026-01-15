import { test, expect } from '@jest/globals'
import * as RpcRegistry from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as LinePartType from '../src/parts/LinePartType/LinePartType.ts'
import { saveOutputAs } from '../src/parts/SaveOutputAs/SaveOutputAs.ts'

test('saveOutputAs returns same state when no uri is selected', async () => {
  const mockRpc = RpcRegistry.RendererWorker.registerMockRpc({
    'FilePicker.showSaveFilePicker': () => null,
  })
  const state = createDefaultState()
  const result = await saveOutputAs(state)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['FilePicker.showSaveFilePicker']])
})

test('saveOutputAs writes file content when uri is selected', async () => {
  const mockUri = 'file:///test/output.txt'
  const mockRendererRpc = RpcRegistry.RendererWorker.registerMockRpc({
    'FilePicker.showSaveFilePicker': () => mockUri,
  })
  const mockFileSystemRpc = RpcRegistry.FileSystemWorker.registerMockRpc({
    'FileSystem.writeFile': (uri: string, content: string) => {
      return undefined
    },
  })

  const state = {
    ...createDefaultState(),
    listItems: [[{ type: LinePartType.Text, value: 'test line 1' }], [{ type: LinePartType.Text, value: 'test line 2' }]],
  }

  const result = await saveOutputAs(state)

  expect(result).toBe(state)
  expect(mockRendererRpc.invocations).toEqual([['FilePicker.showSaveFilePicker']])
  expect(mockFileSystemRpc.invocations).toEqual([['FileSystem.writeFile', mockUri, 'test line 1\ntest line 2\n']])
})

test('saveOutputAs handles empty listItems', async () => {
  const mockUri = 'file:///test/empty.txt'
  const mockRendererRpc = RpcRegistry.RendererWorker.registerMockRpc({
    'FilePicker.showSaveFilePicker': () => mockUri,
  })
  const mockFileSystemRpc = RpcRegistry.FileSystemWorker.registerMockRpc({
    'FileSystem.writeFile': (uri: string, content: string) => {
      expect(uri).toBe(mockUri)
      expect(content).toBe('')
      return undefined
    },
  })

  const state = createDefaultState()
  const result = await saveOutputAs(state)

  expect(result).toBe(state)
  expect(mockRendererRpc.invocations).toEqual([['FilePicker.showSaveFilePicker']])
  expect(mockFileSystemRpc.invocations).toEqual([['FileSystem.writeFile', mockUri, '']])
})

test('saveOutputAs returns same state for different input states', async () => {
  const mockRpc = RpcRegistry.RendererWorker.registerMockRpc({
    'FilePicker.showSaveFilePicker': () => null,
  })

  const state1 = createDefaultState()
  const state2 = createDefaultState()

  const result1 = await saveOutputAs(state1)
  const result2 = await saveOutputAs(state2)

  expect(result1).toBe(state1)
  expect(result2).toBe(state2)
  expect(mockRpc.invocations).toEqual([['FilePicker.showSaveFilePicker'], ['FilePicker.showSaveFilePicker']])
})

test('saveOutputAs resolves successfully', async () => {
  const mockRpc = RpcRegistry.RendererWorker.registerMockRpc({
    'FilePicker.showSaveFilePicker': () => null,
  })

  const state = createDefaultState()

  await expect(saveOutputAs(state)).resolves.toBe(state)
  expect(mockRpc.invocations).toEqual([['FilePicker.showSaveFilePicker']])
})
