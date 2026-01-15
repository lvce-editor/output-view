import { test, expect } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as FileSystemWorker from '../src/parts/FileSystemWorker/FileSystemWorker.ts'
import * as LinePartType from '../src/parts/LinePartType/LinePartType.ts'
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
  FileSystemWorker.set(mockRpc)
  const result = await loadLines('file:///x')
  expect(result).toEqual({ code: 0, error: '', lines: [[{ type: LinePartType.Text, value: 'a' }], [{ type: LinePartType.Text, value: 'b' }]] })
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
  expect(result).toEqual({ code: 1, error: 'log file not found', lines: [] })
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
  expect(result).toEqual({ code: 2, error: 'Error: boom', lines: [] })
})
