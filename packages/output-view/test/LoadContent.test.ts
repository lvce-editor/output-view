import { test, expect } from '@jest/globals'
import { FileSystemWorker, RendererWorker, ExtensionHost } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as LinePartType from '../src/parts/LinePartType/LinePartType.ts'
import { loadContent } from '../src/parts/LoadContent/LoadContent.ts'

test('loadContent returns a new state with expected properties', async () => {
  const mockFileSystemRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.readFile': () => 'test content',
  })
  const mockRendererRpc = RendererWorker.registerMockRpc({
    'OutputView.getOutputActions': () => [],
  })
  const mockExtensionHostRpc = ExtensionHost.registerMockRpc({
    'Extension.getOutputActions': () => [],
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
  expect(mockFileSystemRpc.invocations).toEqual([['FileSystem.readFile']])
  expect(mockRendererRpc.invocations).toEqual([['OutputView.getOutputActions']])
  expect(mockExtensionHostRpc.invocations).toEqual([['Extension.getOutputActions']])
})

test('loadContent handles savedState with collapsedUris', async () => {
  const mockFileSystemRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.readFile': () => 'test content',
  })
  const mockRendererRpc = RendererWorker.registerMockRpc({
    'OutputView.getOutputActions': () => [],
  })
  const mockExtensionHostRpc = ExtensionHost.registerMockRpc({
    'Extension.getOutputActions': () => [],
  })
  const state = createDefaultState()
  const savedState = {
    collapsedUris: ['uri1', 'uri2', 'uri3'],
  }
  const result = await loadContent(state, savedState)
  expect(result.collapsedUris).toEqual(['uri1', 'uri2', 'uri3'])
  expect(mockFileSystemRpc.invocations).toEqual([['FileSystem.readFile']])
  expect(mockRendererRpc.invocations).toEqual([['OutputView.getOutputActions']])
  expect(mockExtensionHostRpc.invocations).toEqual([['Extension.getOutputActions']])
})

test('loadContent handles savedState with invalid collapsedUris', async () => {
  const mockFileSystemRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.readFile': () => 'test content',
  })
  const mockRendererRpc = RendererWorker.registerMockRpc({
    'OutputView.getOutputActions': () => [],
  })
  const mockExtensionHostRpc = ExtensionHost.registerMockRpc({
    'Extension.getOutputActions': () => [],
  })
  const state = createDefaultState()
  const savedState = {
    collapsedUris: 'not an array',
  }
  const result = await loadContent(state, savedState)
  expect(result.collapsedUris).toEqual([])
  expect(mockFileSystemRpc.invocations).toEqual([['FileSystem.readFile']])
  expect(mockRendererRpc.invocations).toEqual([['OutputView.getOutputActions']])
  expect(mockExtensionHostRpc.invocations).toEqual([['Extension.getOutputActions']])
})

test('loadContent handles savedState with mixed collapsedUris', async () => {
  const mockFileSystemRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.readFile': () => 'test content',
  })
  const mockRendererRpc = RendererWorker.registerMockRpc({
    'OutputView.getOutputActions': () => [],
  })
  const mockExtensionHostRpc = ExtensionHost.registerMockRpc({
    'Extension.getOutputActions': () => [],
  })
  const state = createDefaultState()
  const savedState = {
    collapsedUris: ['uri1', 123, 'uri3'],
  }
  const result = await loadContent(state, savedState)
  expect(result.collapsedUris).toEqual([])
  expect(mockFileSystemRpc.invocations).toEqual([['FileSystem.readFile']])
  expect(mockRendererRpc.invocations).toEqual([['OutputView.getOutputActions']])
  expect(mockExtensionHostRpc.invocations).toEqual([['Extension.getOutputActions']])
})

test('loadContent handles savedState with null collapsedUris', async () => {
  const mockFileSystemRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.readFile': () => 'test content',
  })
  const mockRendererRpc = RendererWorker.registerMockRpc({
    'OutputView.getOutputActions': () => [],
  })
  const mockExtensionHostRpc = ExtensionHost.registerMockRpc({
    'Extension.getOutputActions': () => [],
  })
  const state = createDefaultState()
  const savedState = {
    collapsedUris: null,
  }
  const result = await loadContent(state, savedState)
  expect(result.collapsedUris).toEqual([])
  expect(mockFileSystemRpc.invocations).toEqual([['FileSystem.readFile']])
  expect(mockRendererRpc.invocations).toEqual([['OutputView.getOutputActions']])
  expect(mockExtensionHostRpc.invocations).toEqual([['Extension.getOutputActions']])
})
