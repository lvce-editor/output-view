import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleSourceLinkClick } from '../src/parts/HandleSourceLinkClick/HandleSourceLinkClick.ts'

test('handleSourceLinkClick - opens the source in the editor', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Main.openUri': () => undefined,
  })
  const state = createDefaultState()

  await expect(handleSourceLinkClick(state, 'lvce://-/rendererWorkerMain.js', '3455')).resolves.toBe(state)
  expect(mockRpc.invocations).toEqual([['Main.openUri', 'lvce://-/rendererWorkerMain.js', true, { selections: new Uint32Array([3454, 0, 3454, 0]) }]])
})

test('handleSourceLinkClick - opens the source at the given line and column', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Main.openUri': () => undefined,
  })
  const state = createDefaultState()

  await expect(handleSourceLinkClick(state, 'lvce://-/rendererWorkerMain.js', 3455, 11)).resolves.toBe(state)
  expect(mockRpc.invocations).toEqual([
    ['Main.openUri', 'lvce://-/rendererWorkerMain.js', true, { selections: new Uint32Array([3454, 10, 3454, 10]) }],
  ])
})

test('handleSourceLinkClick - opens the source without a selection when no line is available', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Main.openUri': () => undefined,
  })
  const state = createDefaultState()

  await expect(handleSourceLinkClick(state, 'lvce://-/rendererWorkerMain.js')).resolves.toBe(state)
  expect(mockRpc.invocations).toEqual([['Main.openUri', 'lvce://-/rendererWorkerMain.js']])
})

test('handleSourceLinkClick - ignores an empty uri', async () => {
  using mockRpc = RendererWorker.registerMockRpc({})
  const state = createDefaultState()

  await expect(handleSourceLinkClick(state, '')).resolves.toBe(state)
  expect(mockRpc.invocations).toEqual([])
})
