import { test, expect } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { createExtensionHostRpc } from '../src/parts/CreateExtensionHostRpc/CreateExtensionHostRpc.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'

test('createExtensionHostRpc creates rpc successfully', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: () => {},
    invokeAndTransfer: () => {},
  })
  
  RendererWorker.set(mockRpc)
  
  const rpc = await createExtensionHostRpc()
  
  expect(rpc).toBeDefined()
  expect(typeof rpc.invoke).toBe('function')
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
  expect(typeof rpc.invoke).toBe('function')
})
