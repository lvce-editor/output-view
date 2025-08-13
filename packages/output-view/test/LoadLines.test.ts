import { test, expect } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'
import { loadLines } from '../src/parts/LoadLines/LoadLines.ts'

test('loadLines - success', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, uri: string) => {
      if (method === 'FileSystem.readFile') {
        return 'a\nb'
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRpc)
  const result = await loadLines('file:///x')
  expect(result).toEqual({ error: '', lines: ['a', 'b'], code: 0 })
})

test('loadLines - file not found', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, uri: string) => {
      if (method === 'FileSystem.readFile') {
        const err = new Error('File not found: ' + uri)
        throw err
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRpc)
  const result = await loadLines('file:///missing')
  expect(result).toEqual({ error: 'log file not found', lines: [], code: 1 })
})

test('loadLines - other error', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'FileSystem.readFile') {
        throw new Error('boom')
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRpc)
  const result = await loadLines('file:///x')
  expect(result).toEqual({ error: 'Error: boom', lines: [], code: 2 })
})


