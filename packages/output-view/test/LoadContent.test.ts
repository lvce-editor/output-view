import { test, expect } from '@jest/globals'
import { ExtensionManagementWorker, FileSystemWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as LinePartType from '../src/parts/LinePartType/LinePartType.ts'
import { loadContent } from '../src/parts/LoadContent/LoadContent.ts'
import * as PlatformType from '../src/parts/PlatformType/PlatformType.ts'

test('loadContent reads isolated extension output without creating a file watcher', async () => {
  const uri = 'extension-output://test.extension/channel'
  const mockFileSystemRpc = FileSystemWorker.registerMockRpc({})
  const mockExtensionManagementRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.getOutputChannelProviders': () => [{ id: 'channel', label: 'Channel', uri }],
    'Extensions.readOutputChannel': () => 'extension output',
  })
  const state = {
    ...createDefaultState(),
    platform: PlatformType.Web,
  }

  const result = await loadContent(state, {})

  expect(result).toMatchObject({
    listItems: [[{ type: LinePartType.Text, value: 'extension output' }]],
    selectedOption: '',
    watchId: 0,
  })
  expect(mockFileSystemRpc.invocations).toEqual([])
  expect(mockExtensionManagementRpc.invocations).toEqual([['Extensions.getOutputChannelProviders'], ['Extensions.readOutputChannel', uri]])
})

test('loadContent returns a new state with expected properties', async () => {
  const mockFileSystemRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.readFile': () => 'test content',
    'FileSystem.watchFile': () => undefined,
  })
  const mockRendererRpc = RendererWorker.registerMockRpc({
    'OutputView.getOutputActions': () => [],
    'PlatformPaths.getLogsDir': () => '/tmp/logs',
  })
  const mockExtensionManagementRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.getOutputChannelProviders': () => [],
  })
  const state = createDefaultState()
  const savedState = {}
  const result = await loadContent(state, savedState)
  expect(result).toMatchObject({
    collapsedUris: [],
    filterValue: '',
    inputSource: expect.any(Number),
    listItems: [[{ type: LinePartType.Text, value: 'test content' }]],
    message: expect.any(String),
  })
  expect(mockFileSystemRpc.invocations).toEqual([
    ['FileSystem.readFile', expect.any(String)],
    ['FileSystem.watchFile', expect.any(Number), expect.any(String), expect.any(Number)],
  ])
  expect(mockRendererRpc.invocations).toEqual([['PlatformPaths.getLogsDir']])
  expect(mockExtensionManagementRpc.invocations).toEqual([['Extensions.getOutputChannelProviders']])
})

test('loadContent handles savedState with collapsedUris', async () => {
  const mockFileSystemRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.readFile': () => 'test content',
    'FileSystem.watchFile': () => undefined,
  })
  const mockRendererRpc = RendererWorker.registerMockRpc({
    'OutputView.getOutputActions': () => [],
    'PlatformPaths.getLogsDir': () => '/tmp/logs',
  })
  const mockExtensionManagementRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.getOutputChannelProviders': () => [],
  })
  const state = createDefaultState()
  const savedState = {
    collapsedUris: ['uri1', 'uri2', 'uri3'],
  }
  const result = await loadContent(state, savedState)
  expect(result.collapsedUris).toEqual(['uri1', 'uri2', 'uri3'])
  expect(mockFileSystemRpc.invocations).toEqual([
    ['FileSystem.readFile', expect.any(String)],
    ['FileSystem.watchFile', expect.any(Number), expect.any(String), expect.any(Number)],
  ])
  expect(mockRendererRpc.invocations).toEqual([['PlatformPaths.getLogsDir']])
  expect(mockExtensionManagementRpc.invocations).toEqual([['Extensions.getOutputChannelProviders']])
})

test('loadContent handles savedState with invalid collapsedUris', async () => {
  const mockFileSystemRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.readFile': () => 'test content',
    'FileSystem.watchFile': () => undefined,
  })
  const mockRendererRpc = RendererWorker.registerMockRpc({
    'OutputView.getOutputActions': () => [],
    'PlatformPaths.getLogsDir': () => '/tmp/logs',
  })
  const mockExtensionManagementRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.getOutputChannelProviders': () => [],
  })
  const state = createDefaultState()
  const savedState = {
    collapsedUris: 'not an array',
  }
  const result = await loadContent(state, savedState)
  expect(result.collapsedUris).toEqual([])
  expect(mockFileSystemRpc.invocations).toEqual([
    ['FileSystem.readFile', expect.any(String)],
    ['FileSystem.watchFile', expect.any(Number), expect.any(String), expect.any(Number)],
  ])
  expect(mockRendererRpc.invocations).toEqual([['PlatformPaths.getLogsDir']])
  expect(mockExtensionManagementRpc.invocations).toEqual([['Extensions.getOutputChannelProviders']])
})

test('loadContent handles savedState with mixed collapsedUris', async () => {
  const mockFileSystemRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.readFile': () => 'test content',
    'FileSystem.watchFile': () => undefined,
  })
  const mockRendererRpc = RendererWorker.registerMockRpc({
    'OutputView.getOutputActions': () => [],
    'PlatformPaths.getLogsDir': () => '/tmp/logs',
  })
  const mockExtensionManagementRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.getOutputChannelProviders': () => [],
  })
  const state = createDefaultState()
  const savedState = {
    collapsedUris: ['uri1', 123, 'uri3'],
  }
  const result = await loadContent(state, savedState)
  expect(result.collapsedUris).toEqual([])
  expect(mockFileSystemRpc.invocations).toEqual([
    ['FileSystem.readFile', expect.any(String)],
    ['FileSystem.watchFile', expect.any(Number), expect.any(String), expect.any(Number)],
  ])
  expect(mockRendererRpc.invocations).toEqual([['PlatformPaths.getLogsDir']])
  expect(mockExtensionManagementRpc.invocations).toEqual([['Extensions.getOutputChannelProviders']])
})

test('loadContent handles savedState with null collapsedUris', async () => {
  const mockFileSystemRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.readFile': () => 'test content',
    'FileSystem.watchFile': () => undefined,
  })
  const mockRendererRpc = RendererWorker.registerMockRpc({
    'OutputView.getOutputActions': () => [],
    'PlatformPaths.getLogsDir': () => '/tmp/logs',
  })
  const mockExtensionManagementRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.getOutputChannelProviders': () => [],
  })
  const state = createDefaultState()
  const savedState = {
    collapsedUris: null,
  }
  const result = await loadContent(state, savedState)
  expect(result.collapsedUris).toEqual([])
  expect(mockFileSystemRpc.invocations).toEqual([
    ['FileSystem.readFile', expect.any(String)],
    ['FileSystem.watchFile', expect.any(Number), expect.any(String), expect.any(Number)],
  ])
  expect(mockRendererRpc.invocations).toEqual([['PlatformPaths.getLogsDir']])
  expect(mockExtensionManagementRpc.invocations).toEqual([['Extensions.getOutputChannelProviders']])
})
