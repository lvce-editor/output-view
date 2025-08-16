import { test, expect } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as FileSystemWorker from '../src/parts/FileSystemWorker/FileSystemWorker.ts'
import * as RpcRegistry from '@lvce-editor/rpc-registry'
import { initializeFileSystemWorker } from '../src/parts/InitializeFileSystemWorker/InitializeFileSystemWorker.ts'

test('initializeFileSystemWorker registers FileSystemWorker RPC', async () => {
  // Create a mock RPC
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'FileSystem.readDirWithFileTypes') {
        return Promise.resolve([])
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  FileSystemWorker.set(mockRpc)
  await initializeFileSystemWorker()
  const rpc = RpcRegistry.get(RpcRegistry.RpcId.FileSystemWorker)
  expect(rpc).toBeDefined()
  await rpc.dispose()
})
