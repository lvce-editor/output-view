import { test, expect } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as FileSystemWorker from '../src/parts/FileSystemWorker/FileSystemWorker.ts'
import { loadLines } from '../src/parts/LoadLines/LoadLines.ts'
import * as LinePartType from '../src/parts/LinePartType/LinePartType.ts'

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
  FileSystemWorker.set(mockRpc)
  const result = await loadLines('file:///x')
  expect(result).toEqual({ error: '', lines: [[{ type: LinePartType.Text, value: 'a' }], [{ type: LinePartType.Text, value: 'b' }]], code: 0 })
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
  FileSystemWorker.set(mockRpc)
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
  FileSystemWorker.set(mockRpc)
  const result = await loadLines('file:///x')
  expect(result).toEqual({ error: 'Error: boom', lines: [], code: 2 })
})
