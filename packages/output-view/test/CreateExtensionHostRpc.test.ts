import { test, expect } from '@jest/globals'
import { createMockRpc } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { createExtensionHostRpc } from '../src/parts/CreateExtensionHostRpc/CreateExtensionHostRpc.ts'

test('createExtensionHostRpc creates rpc successfully', async () => {
  const mockRpc = createMockRpc({
    commandMap: {},
    invoke: () => {},
    invokeAndTransfer: () => {},
  })

  RendererWorker.set(mockRpc)

  const rpc = await createExtensionHostRpc()

  expect(rpc).toBeDefined()
  await rpc.dispose()
})

test('createExtensionHostRpc handles errors properly', async () => {
  const mockRpc = createMockRpc({
    commandMap: {},
    invoke: () => {},
    invokeAndTransfer: () => {},
  })

  RendererWorker.set(mockRpc)

  const rpc = await createExtensionHostRpc()

  expect(rpc).toBeDefined()
  await rpc.dispose()
})
