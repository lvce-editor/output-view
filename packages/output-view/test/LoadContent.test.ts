import { test, expect } from '@jest/globals'
import { FileSystemWorker, RendererWorker, ExtensionHost } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as LinePartType from '../src/parts/LinePartType/LinePartType.ts'
import { loadContent } from '../src/parts/LoadContent/LoadContent.ts'

test('loadContent returns a new state with expected properties', async () => {
  const mockFileSystemRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.readFile': () => 'test content',
    'FileSystem.watchFile': () => undefined,
  })
  const mockRendererRpc = RendererWorker.registerMockRpc({
    'ExtensionHostManagement.activateByEvent': () => undefined,
    'OutputView.getOutputActions': () => [],
    'PlatformPaths.getLogsDir': () => '/tmp/logs',
  })
  const mockExtensionHostRpc = ExtensionHost.registerMockRpc({
    'Extension.getOutputActions': () => [],
    'Output.getEnabledProviders': () => [],
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
  expect(mockFileSystemRpc.invocations).toHaveLength(2)
  expect(mockFileSystemRpc.invocations[0]).toEqual(['FileSystem.readFile', expect.any(String)])
  expect(mockFileSystemRpc.invocations[1]).toEqual(['FileSystem.watchFile', expect.any(Number), expect.any(String), expect.any(Number)])
  expect(mockRendererRpc.invocations).toHaveLength(2)
  expect(mockRendererRpc.invocations[0]).toEqual(['PlatformPaths.getLogsDir'])
  expect(mockRendererRpc.invocations[1]).toEqual(['ExtensionHostManagement.activateByEvent', 'onOutput', undefined, undefined])
  expect(mockExtensionHostRpc.invocations).toHaveLength(1)
  expect(mockExtensionHostRpc.invocations[0]).toEqual(['Output.getEnabledProviders'])
})

test('loadContent handles savedState with collapsedUris', async () => {
  const mockFileSystemRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.readFile': () => 'test content',
    'FileSystem.watchFile': () => undefined,
  })
  const mockRendererRpc = RendererWorker.registerMockRpc({
    'ExtensionHostManagement.activateByEvent': () => undefined,
    'OutputView.getOutputActions': () => [],
    'PlatformPaths.getLogsDir': () => '/tmp/logs',
  })
  const mockExtensionHostRpc = ExtensionHost.registerMockRpc({
    'Extension.getOutputActions': () => [],
    'Output.getEnabledProviders': () => [],
  })
  const state = createDefaultState()
  const savedState = {
    collapsedUris: ['uri1', 'uri2', 'uri3'],
  }
  const result = await loadContent(state, savedState)
  expect(result.collapsedUris).toEqual(['uri1', 'uri2', 'uri3'])
  expect(mockFileSystemRpc.invocations).toHaveLength(2)
  expect(mockFileSystemRpc.invocations[0]).toEqual(['FileSystem.readFile', expect.any(String)])
  expect(mockFileSystemRpc.invocations[1]).toEqual(['FileSystem.watchFile', expect.any(Number), expect.any(String), expect.any(Number)])
  expect(mockRendererRpc.invocations).toHaveLength(2)
  expect(mockRendererRpc.invocations[0]).toEqual(['PlatformPaths.getLogsDir'])
  expect(mockRendererRpc.invocations[1]).toEqual(['ExtensionHostManagement.activateByEvent', 'onOutput', undefined, undefined])
  expect(mockExtensionHostRpc.invocations).toHaveLength(1)
  expect(mockExtensionHostRpc.invocations[0]).toEqual(['Output.getEnabledProviders'])
})

test('loadContent handles savedState with invalid collapsedUris', async () => {
  const mockFileSystemRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.readFile': () => 'test content',
    'FileSystem.watchFile': () => undefined,
  })
  const mockRendererRpc = RendererWorker.registerMockRpc({
    'ExtensionHostManagement.activateByEvent': () => undefined,
    'OutputView.getOutputActions': () => [],
    'PlatformPaths.getLogsDir': () => '/tmp/logs',
  })
  const mockExtensionHostRpc = ExtensionHost.registerMockRpc({
    'Extension.getOutputActions': () => [],
    'Output.getEnabledProviders': () => [],
  })
  const state = createDefaultState()
  const savedState = {
    collapsedUris: 'not an array',
  }
  const result = await loadContent(state, savedState)
  expect(result.collapsedUris).toEqual([])
  expect(mockFileSystemRpc.invocations).toHaveLength(2)
  expect(mockFileSystemRpc.invocations[0]).toEqual(['FileSystem.readFile', expect.any(String)])
  expect(mockFileSystemRpc.invocations[1]).toEqual(['FileSystem.watchFile', expect.any(Number), expect.any(String), expect.any(Number)])
  expect(mockRendererRpc.invocations).toHaveLength(2)
  expect(mockRendererRpc.invocations[0]).toEqual(['PlatformPaths.getLogsDir'])
  expect(mockRendererRpc.invocations[1]).toEqual(['ExtensionHostManagement.activateByEvent', 'onOutput', undefined, undefined])
  expect(mockExtensionHostRpc.invocations).toHaveLength(1)
  expect(mockExtensionHostRpc.invocations[0]).toEqual(['Output.getEnabledProviders'])
})

test('loadContent handles savedState with mixed collapsedUris', async () => {
  const mockFileSystemRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.readFile': () => 'test content',
    'FileSystem.watchFile': () => undefined,
  })
  const mockRendererRpc = RendererWorker.registerMockRpc({
    'ExtensionHostManagement.activateByEvent': () => undefined,
    'OutputView.getOutputActions': () => [],
    'PlatformPaths.getLogsDir': () => '/tmp/logs',
  })
  const mockExtensionHostRpc = ExtensionHost.registerMockRpc({
    'Extension.getOutputActions': () => [],
    'Output.getEnabledProviders': () => [],
  })
  const state = createDefaultState()
  const savedState = {
    collapsedUris: ['uri1', 123, 'uri3'],
  }
  const result = await loadContent(state, savedState)
  expect(result.collapsedUris).toEqual([])
  expect(mockFileSystemRpc.invocations).toHaveLength(2)
  expect(mockFileSystemRpc.invocations[0]).toEqual(['FileSystem.readFile', expect.any(String)])
  expect(mockFileSystemRpc.invocations[1]).toEqual(['FileSystem.watchFile', expect.any(Number), expect.any(String), expect.any(Number)])
  expect(mockRendererRpc.invocations).toHaveLength(2)
  expect(mockRendererRpc.invocations[0]).toEqual(['PlatformPaths.getLogsDir'])
  expect(mockRendererRpc.invocations[1]).toEqual(['ExtensionHostManagement.activateByEvent', 'onOutput', undefined, undefined])
  expect(mockExtensionHostRpc.invocations).toHaveLength(1)
  expect(mockExtensionHostRpc.invocations[0]).toEqual(['Output.getEnabledProviders'])
})

test('loadContent handles savedState with null collapsedUris', async () => {
  const mockFileSystemRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.readFile': () => 'test content',
    'FileSystem.watchFile': () => undefined,
  })
  const mockRendererRpc = RendererWorker.registerMockRpc({
    'ExtensionHostManagement.activateByEvent': () => undefined,
    'OutputView.getOutputActions': () => [],
    'PlatformPaths.getLogsDir': () => '/tmp/logs',
  })
  const mockExtensionHostRpc = ExtensionHost.registerMockRpc({
    'Extension.getOutputActions': () => [],
    'Output.getEnabledProviders': () => [],
  })
  const state = createDefaultState()
  const savedState = {
    collapsedUris: null,
  }
  const result = await loadContent(state, savedState)
  expect(result.collapsedUris).toEqual([])
  expect(mockFileSystemRpc.invocations).toHaveLength(2)
  expect(mockFileSystemRpc.invocations[0]).toEqual(['FileSystem.readFile', expect.any(String)])
  expect(mockFileSystemRpc.invocations[1]).toEqual(['FileSystem.watchFile', expect.any(Number), expect.any(String), expect.any(Number)])
  expect(mockRendererRpc.invocations).toHaveLength(2)
  expect(mockRendererRpc.invocations[0]).toEqual(['PlatformPaths.getLogsDir'])
  expect(mockRendererRpc.invocations[1]).toEqual(['ExtensionHostManagement.activateByEvent', 'onOutput', undefined, undefined])
  expect(mockExtensionHostRpc.invocations).toHaveLength(1)
  expect(mockExtensionHostRpc.invocations[0]).toEqual(['Output.getEnabledProviders'])
})
