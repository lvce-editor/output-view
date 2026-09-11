import { expect, test } from '@jest/globals'
import { FileSystemWorker } from '@lvce-editor/rpc-registry'
import { getExtensionDetailOptions } from '../src/parts/GetExtensionDetailOptions/GetExtensionDetailOptions.ts'

const uri = 'memfs:///extension-detail-output.txt'

test('does not offer a channel before any errors are logged', async () => {
  using rpc = FileSystemWorker.registerMockRpc({
    'FileSystem.readFile': () => {
      throw new Error('file not found')
    },
  })
  expect(await getExtensionDetailOptions()).toEqual([])
  expect(rpc.invocations).toEqual([['FileSystem.readFile', uri]])
})

test.each(['Error: failed to load changelog', ''])('offers the channel when its log exists, including after clearing: %s', async (content) => {
  using _rpc = FileSystemWorker.registerMockRpc({
    'FileSystem.readFile': () => content,
  })
  expect(await getExtensionDetailOptions()).toEqual([{ id: 'ExtensionDetail', label: 'Extension Detail', uri }])
})
