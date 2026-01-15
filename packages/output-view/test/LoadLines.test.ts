import { test, expect } from '@jest/globals'
import { FileSystemWorker } from '@lvce-editor/rpc-registry'
import * as LinePartType from '../src/parts/LinePartType/LinePartType.ts'
import { loadLines } from '../src/parts/LoadLines/LoadLines.ts'

test('loadLines - success', async () => {
  const mockRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.readFile': () => 'a\nb',
  })
  const result = await loadLines('file:///x')
  expect(result).toEqual({ code: 0, error: '', lines: [[{ type: LinePartType.Text, value: 'a' }], [{ type: LinePartType.Text, value: 'b' }]] })
  expect(mockRpc.invocations).toEqual([['FileSystem.readFile', 'file:///x']])
})

test('loadLines - file not found', async () => {
  const mockRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.readFile': () => {
      const err = new Error('File not found: file:///missing')
      throw err
    },
  })
  const result = await loadLines('file:///missing')
  expect(result).toEqual({ code: 1, error: 'log file not found', lines: [] })
  expect(mockRpc.invocations).toEqual([['FileSystem.readFile', 'file:///missing']])
})

test('loadLines - other error', async () => {
  const mockRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.readFile': () => {
      throw new Error('boom')
    },
  })
  const result = await loadLines('file:///x')
  expect(result).toEqual({ code: 2, error: 'Error: boom', lines: [] })
  expect(mockRpc.invocations).toEqual([['FileSystem.readFile', 'file:///x']])
})
