import { expect, test } from '@jest/globals'
import { ExtensionManagementWorker } from '@lvce-editor/rpc-registry'
import { getExtensionOptions } from '../src/parts/GetExtensionOptions/GetExtensionOptions.ts'

test('getExtensionOptions - returns channels on success', async () => {
  const mockChannels = [
    { id: 'channel1', label: 'Channel 1', uri: 'extension-output://extension/channel1' },
    { id: 'channel2', label: 'Channel 2', uri: 'extension-output://extension/channel2' },
  ]
  using mockRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.getOutputChannelProviders': () => mockChannels,
  })

  const result = await getExtensionOptions()

  expect(result).toEqual(mockChannels)
  expect(mockRpc.invocations).toEqual([['Extensions.getOutputChannelProviders']])
})

test('getExtensionOptions - returns empty array on error', async () => {
  using mockRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.getOutputChannelProviders': () => {
      throw new Error('Test error')
    },
  })

  const result = await getExtensionOptions()

  expect(result).toEqual([])
  expect(mockRpc.invocations).toEqual([['Extensions.getOutputChannelProviders']])
})
