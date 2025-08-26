import { test, expect } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as ExtensionHostWorker from '../src/parts/ExtensionHostWorker/ExtensionHostWorker.ts'
import * as FileSystemWorker from '../src/parts/FileSystemWorker/FileSystemWorker.ts'
import { loadContent } from '../src/parts/LoadContent/LoadContent.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'

test('loadContent returns a new state with expected properties', async () => {
  FileSystemWorker.set(
    MockRpc.create({
      commandMap: {},
      invoke() {
        return 'test content'
      },
    }),
  )
  RendererWorker.set(
    MockRpc.create({
      commandMap: {},
      invoke() {
        return []
      },
    }),
  )
  ExtensionHostWorker.set(
    MockRpc.create({
      commandMap: {},
      invoke() {
        return []
      },
    }),
  )
  const state = createDefaultState()
  const savedState = {}
  const result = await loadContent(state, savedState)
  expect(result).toMatchObject({
    message: expect.any(String),
    filterValue: '',
    inputSource: expect.any(Number),
    listItems: ['test content'],
    collapsedUris: [],
  })
})

test('loadContent handles savedState with collapsedUris', async () => {
  FileSystemWorker.set(
    MockRpc.create({
      commandMap: {},
      invoke() {
        return 'test content'
      },
    }),
  )
  RendererWorker.set(
    MockRpc.create({
      commandMap: {},
      invoke() {
        return []
      },
    }),
  )
  ExtensionHostWorker.set(
    MockRpc.create({
      commandMap: {},
      invoke() {
        return []
      },
    }),
  )
  const state = createDefaultState()
  const savedState = {
    collapsedUris: ['uri1', 'uri2', 'uri3'],
  }
  const result = await loadContent(state, savedState)
  expect(result.collapsedUris).toEqual(['uri1', 'uri2', 'uri3'])
})

test('loadContent handles savedState with invalid collapsedUris', async () => {
  FileSystemWorker.set(
    MockRpc.create({
      commandMap: {},
      invoke() {
        return 'test content'
      },
    }),
  )
  RendererWorker.set(
    MockRpc.create({
      commandMap: {},
      invoke() {
        return []
      },
    }),
  )
  ExtensionHostWorker.set(
    MockRpc.create({
      commandMap: {},
      invoke() {
        return []
      },
    }),
  )
  const state = createDefaultState()
  const savedState = {
    collapsedUris: 'not an array',
  }
  const result = await loadContent(state, savedState)
  expect(result.collapsedUris).toEqual([])
})

test('loadContent handles savedState with mixed collapsedUris', async () => {
  FileSystemWorker.set(
    MockRpc.create({
      commandMap: {},
      invoke() {
        return 'test content'
      },
    }),
  )
  RendererWorker.set(
    MockRpc.create({
      commandMap: {},
      invoke() {
        return []
      },
    }),
  )
  ExtensionHostWorker.set(
    MockRpc.create({
      commandMap: {},
      invoke() {
        return []
      },
    }),
  )
  const state = createDefaultState()
  const savedState = {
    collapsedUris: ['uri1', 123, 'uri3'],
  }
  const result = await loadContent(state, savedState)
  expect(result.collapsedUris).toEqual([])
})

test('loadContent handles savedState with null collapsedUris', async () => {
  FileSystemWorker.set(
    MockRpc.create({
      commandMap: {},
      invoke() {
        return 'test content'
      },
    }),
  )
  RendererWorker.set(
    MockRpc.create({
      commandMap: {},
      invoke() {
        return []
      },
    }),
  )
  ExtensionHostWorker.set(
    MockRpc.create({
      commandMap: {},
      invoke() {
        return []
      },
    }),
  )
  const state = createDefaultState()
  const savedState = {
    collapsedUris: null,
  }
  const result = await loadContent(state, savedState)
  expect(result.collapsedUris).toEqual([])
})
