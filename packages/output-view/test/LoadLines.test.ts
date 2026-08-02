/* eslint-disable rpc/prefer-using-mock-rpc */
import { test, expect } from '@jest/globals'
import { ExtensionManagementWorker, FileSystemWorker } from '@lvce-editor/rpc-registry'
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

test('loadLines - parses and aggregates structured Window logs', async () => {
  const record = JSON.stringify({
    category: 'Window',
    level: 'error',
    line: 42,
    message: 'boom',
    source: 'lvce://-/rendererWorkerMain.js',
    timestamp: '2026-07-29T06:45:24.529Z',
  })
  const mockRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.readFile': () => `${record}\n${record}`,
  })
  const result = await loadLines('file:///log-window.txt')

  expect(result).toEqual({
    code: 0,
    error: '',
    lines: [
      [
        { type: LinePartType.RepeatCount, value: '2' },
        { type: LinePartType.LogLevel, value: 'error' },
        { type: LinePartType.Text, value: 'boom' },
        { type: LinePartType.Text, value: ' ' },
        {
          className: 'OutputSourceLink',
          label: 'rendererWorkerMain.js:42',
          type: LinePartType.Link,
          value: 'lvce://-/rendererWorkerMain.js',
        },
      ],
    ],
  })
  expect(mockRpc.invocations).toEqual([['FileSystem.readFile', 'file:///log-window.txt']])
})

test('loadLines - reads isolated extension output through extension management worker', async () => {
  const uri = 'extension-output://test.extension/channel'
  const mockRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.readOutputChannel': () => 'first\nsecond',
  })

  const result = await loadLines(uri)

  expect(result).toEqual({
    code: 0,
    error: '',
    lines: [[{ type: LinePartType.Text, value: 'first' }], [{ type: LinePartType.Text, value: 'second' }]],
  })
  expect(mockRpc.invocations).toEqual([['Extensions.readOutputChannel', uri]])
})

test('loadLines - file not found', async () => {
  const mockRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.readFile': () => {
      throw new Error('File not found: file:///missing')
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
