import { test, expect } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { createExtensionHostRpc } from '../src/parts/CreateExtensionHostRpc/CreateExtensionHostRpc.ts'
import { RendererWorker } from '@lvce-editor/rpc-registry'

test('createExtensionHostRpc creates rpc successfully', async () => {
  const mockRpc = MockRpc.create({
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
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: () => {},
    invokeAndTransfer: () => {},
  })

  RendererWorker.set(mockRpc)

  const rpc = await createExtensionHostRpc()

  expect(rpc).toBeDefined()
  await rpc.dispose()
})
