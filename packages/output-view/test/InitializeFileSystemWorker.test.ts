import { expect, jest, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as RpcRegistry from '@lvce-editor/rpc-registry'
import { initializeFileSystemWorker } from '../src/parts/InitializeFileSystemWorker/InitializeFileSystemWorker.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'

test('initializeFileSystemWorker registers FileSystemWorker RPC', async () => {
  // Create a mock RPC
  const invokeAndTransfer = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      throw new Error(`unexpected method ${method}`)
    },
    invokeAndTransfer,
  })
  RendererWorker.set(mockRpc)
  await initializeFileSystemWorker()
  expect(invokeAndTransfer).toHaveBeenCalledTimes(1)
  expect(invokeAndTransfer).toHaveBeenCalledWith('FileSystemWorker', 'initialize', undefined)
  const rpc = RpcRegistry.get(RpcRegistry.RpcId.FileSystemWorker)
  expect(rpc).toBeDefined()
  await rpc.dispose()
})
