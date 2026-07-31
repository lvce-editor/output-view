import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleSourceLinkClick } from '../src/parts/HandleSourceLinkClick/HandleSourceLinkClick.ts'

test('handleSourceLinkClick - opens the source in the editor', async () => {
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
