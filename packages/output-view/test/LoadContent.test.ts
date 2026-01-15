import { test, expect } from '@jest/globals'
import { registerMockRpc } from '@lvce-editor/rpc-registry'
import * as RpcRegistry from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as ExtensionHostWorker from '../src/parts/ExtensionHostWorker/ExtensionHostWorker.ts'
import * as FileSystemWorker from '../src/parts/FileSystemWorker/FileSystemWorker.ts'
import * as LinePartType from '../src/parts/LinePartType/LinePartType.ts'
import { loadContent } from '../src/parts/LoadContent/LoadContent.ts'

test('loadContent returns a new state with expected properties', async () => {
  registerMockRpc(RpcRegistry.RpcId.FileSystemWorker, {
    commandMap: {},
    invoke() {
      return 'test content'
    },
  })
  registerMockRpc(RpcRegistry.RpcId.RendererWorker, {
    commandMap: {},
    invoke() {
      return []
    },
  })
  registerMockRpc(RpcRegistry.RpcId.ExtensionHostWorker, {
    commandMap: {},
    invoke() {
      return []
    },
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
})

test('loadContent handles savedState with collapsedUris', async () => {
  registerMockRpc(RpcRegistry.RpcId.FileSystemWorker, {
    commandMap: {},
    invoke() {
      return 'test content'
    },
  })
  registerMockRpc(RpcRegistry.RpcId.RendererWorker, {
    commandMap: {},
    invoke() {
      return []
    },
  })
  registerMockRpc(RpcRegistry.RpcId.ExtensionHostWorker, {
    commandMap: {},
    invoke() {
      return []
    },
  })
  const state = createDefaultState()
  const savedState = {
    collapsedUris: ['uri1', 'uri2', 'uri3'],
  }
  const result = await loadContent(state, savedState)
  expect(result.collapsedUris).toEqual(['uri1', 'uri2', 'uri3'])
})

test('loadContent handles savedState with invalid collapsedUris', async () => {
  registerMockRpc(RpcRegistry.RpcId.FileSystemWorker, {
    commandMap: {},
    invoke() {
      return 'test content'
    },
  })
  registerMockRpc(RpcRegistry.RpcId.RendererWorker, {
    commandMap: {},
    invoke() {
      return []
    },
  })
  registerMockRpc(RpcRegistry.RpcId.ExtensionHostWorker, {
    commandMap: {},
    invoke() {
      return []
    },
  })
  const state = createDefaultState()
  const savedState = {
    collapsedUris: 'not an array',
  }
  const result = await loadContent(state, savedState)
  expect(result.collapsedUris).toEqual([])
})

test('loadContent handles savedState with mixed collapsedUris', async () => {
  registerMockRpc(RpcRegistry.RpcId.FileSystemWorker, {
    commandMap: {},
    invoke() {
      return 'test content'
    },
  })
  registerMockRpc(RpcRegistry.RpcId.RendererWorker, {
    commandMap: {},
    invoke() {
      return []
    },
  })
  registerMockRpc(RpcRegistry.RpcId.ExtensionHostWorker, {
    commandMap: {},
    invoke() {
      return []
    },
  })
  const state = createDefaultState()
  const savedState = {
    collapsedUris: ['uri1', 123, 'uri3'],
  }
  const result = await loadContent(state, savedState)
  expect(result.collapsedUris).toEqual([])
})

test('loadContent handles savedState with null collapsedUris', async () => {
  registerMockRpc(RpcRegistry.RpcId.FileSystemWorker, {
    commandMap: {},
    invoke() {
      return 'test content'
    },
  })
  registerMockRpc(RpcRegistry.RpcId.RendererWorker, {
    commandMap: {},
    invoke() {
      return []
    },
  })
  registerMockRpc(RpcRegistry.RpcId.ExtensionHostWorker, {
    commandMap: {},
    invoke() {
      return []
    },
  })
  const state = createDefaultState()
  const savedState = {
    collapsedUris: null,
  }
  const result = await loadContent(state, savedState)
  expect(result.collapsedUris).toEqual([])
})
