import { expect, test } from '@jest/globals'
import { FileSystemWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import { getLatestLogFileName, getWindowLogUri } from '../src/parts/GetWindowLogUri/GetWindowLogUri.ts'

test('getLatestLogFileName', () => {
  expect(
    getLatestLogFileName([
      { name: '2026-05-05T14-23-01.456Z.txt', type: 1 },
      { name: 'other.txt', type: 1 },
      { name: '2026-05-05T16-23-01.456Z.txt', type: 2 },
      { name: '2026-05-05T15-23-01.456Z.txt', type: 1 },
    ]),
  ).toBe('2026-05-05T15-23-01.456Z.txt')
})

test('getLatestLogFileName - supports legacy timestamp file names', () => {
  expect(
    getLatestLogFileName([
      { name: '100.txt', type: 1 },
      { name: '200.txt', type: 1 },
    ]),
  ).toBe('200.txt')
})

test('getLatestLogFileName - no matching files', () => {
  expect(getLatestLogFileName([{ name: 'other.txt', type: 1 }])).toBe('')
})

test('getWindowLogUri', async () => {
  const mockRendererRpc = RendererWorker.registerMockRpc({
    'GetWindowId.getWindowId': () => 42,
  })
  const mockFileSystemRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.readDirWithFileTypes': () => [
      { name: '2026-05-05T14-23-01.456Z.txt', type: 1 },
      { name: '2026-05-05T15-23-01.456Z.txt', type: 1 },
    ],
  })

  expect(await getWindowLogUri('file:///logs')).toBe('file:///logs/42/2026-05-05T15-23-01.456Z.txt')
  expect(mockRendererRpc.invocations).toEqual([['GetWindowId.getWindowId']])
  expect(mockFileSystemRpc.invocations).toEqual([['FileSystem.readDirWithFileTypes', 'file:///logs/42']])
})

test('getWindowLogUri - falls back to legacy log file when the window folder is empty', async () => {
  RendererWorker.registerMockRpc({
    'GetWindowId.getWindowId': () => 42,
  })
  FileSystemWorker.registerMockRpc({
    'FileSystem.readDirWithFileTypes': () => [],
  })

  expect(await getWindowLogUri('file:///logs')).toBe('file:///logs/log-window.txt')
})

test('getWindowLogUri - falls back to legacy log file when the window folder cannot be read', async () => {
  RendererWorker.registerMockRpc({
    'GetWindowId.getWindowId': () => 42,
  })
  FileSystemWorker.registerMockRpc({
    'FileSystem.readDirWithFileTypes': () => {
      throw new Error('not found')
    },
  })

  expect(await getWindowLogUri('file:///logs')).toBe('file:///logs/log-window.txt')
})
