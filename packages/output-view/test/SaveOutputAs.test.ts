import { test, expect, jest } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as FileSystemWorker from '../src/parts/FileSystemWorker/FileSystemWorker.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'
import { saveOutputAs } from '../src/parts/SaveOutputAs/SaveOutputAs.ts'

test('saveOutputAs returns the same state when no uri is selected', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: () => {
      return null
    },
    invokeAndTransfer: () => {
      throw new Error('no port')
    },
  })
  RendererWorker.set(mockRpc)

  const state = createDefaultState()
  const result = await saveOutputAs(state)

  expect(result).toBe(state)
})

test('saveOutputAs writes file content when uri is selected', async () => {
  const mockUri = 'file:///test/output.txt'
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'FilePicker.showSaveFilePicker') {
        return mockUri
      }
      throw new Error(`unexpected method ${method}`)
    },
    invokeAndTransfer: () => {
      throw new Error('no port')
    },
  })
  RendererWorker.set(mockRpc)

  const writeFileSpy = jest.spyOn(FileSystemWorker, 'writeFile')
  writeFileSpy.mockResolvedValue(undefined)

  const state = {
    ...createDefaultState(),
    listItems: [{ parts: [{ type: 'Text', value: 'test line 1' }] }, { parts: [{ type: 'Text', value: 'test line 2' }] }],
  }

  const result = await saveOutputAs(state)

  expect(writeFileSpy).toHaveBeenCalledWith(mockUri, 'test line 1\ntest line 2\n')
  expect(result).toBe(state)

  writeFileSpy.mockRestore()
})

test('saveOutputAs handles empty listItems', async () => {
  const mockUri = 'file:///test/empty.txt'
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'FilePicker.showSaveFilePicker') {
        return mockUri
      }
      throw new Error(`unexpected method ${method}`)
    },
    invokeAndTransfer: () => {
      throw new Error('no port')
    },
  })
  RendererWorker.set(mockRpc)

  const writeFileSpy = jest.spyOn(FileSystemWorker, 'writeFile')
  writeFileSpy.mockResolvedValue(undefined)

  const state = createDefaultState()

  const result = await saveOutputAs(state)

  expect(writeFileSpy).toHaveBeenCalledWith(mockUri, '')
  expect(result).toBe(state)

  writeFileSpy.mockRestore()
})

test('saveOutputAs returns same state for different input states', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: () => {
      return null
    },
    invokeAndTransfer: () => {
      throw new Error('no port')
    },
  })
  RendererWorker.set(mockRpc)

  const state1 = createDefaultState()
  const state2 = createDefaultState()

  const result1 = await saveOutputAs(state1)
  const result2 = await saveOutputAs(state2)

  expect(result1).toBe(state1)
  expect(result2).toBe(state2)
})

test('saveOutputAs resolves successfully', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: () => {
      return null
    },
    invokeAndTransfer: () => {
      throw new Error('no port')
    },
  })
  RendererWorker.set(mockRpc)

  const state = createDefaultState()

  await expect(saveOutputAs(state)).resolves.toBe(state)
})
