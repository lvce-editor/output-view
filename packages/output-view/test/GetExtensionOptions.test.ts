import { test, expect } from '@jest/globals'
import { RendererWorker, ExtensionHost } from '@lvce-editor/rpc-registry'
import { getExtensionOptions } from '../src/parts/GetExtensionOptions/GetExtensionOptions.ts'

test('getExtensionOptions - returns channels on success', async () => {
  const mockChannels = [
    { id: 'channel1', label: 'Channel 1', uri: 'uri1' },
    { id: 'channel2', label: 'Channel 2', uri: 'uri2' },
  ]

  const mockRendererRpc = RendererWorker.registerMockRpc({
    'ExtensionHostManagement.activateByEvent': () => undefined,
  })

  const mockExtensionHostRpc = ExtensionHost.registerMockRpc({
    'Output.getEnabledProviders': () => mockChannels,
  })

  const result = await getExtensionOptions()
  expect(result).toEqual(mockChannels)
  expect(mockRendererRpc.invocations).toEqual([['ExtensionHostManagement.activateByEvent', 'onOutput']])
  expect(mockExtensionHostRpc.invocations).toEqual([['Output.getEnabledProviders']])
})

test('getExtensionOptions - returns empty array on error', async () => {
  const mockRendererRpc = RendererWorker.registerMockRpc({
    'ExtensionHostManagement.activateByEvent': () => undefined,
  })

  const mockExtensionHostRpc = ExtensionHost.registerMockRpc({
    'Output.getEnabledProviders': () => {
      throw new Error('Test error')
    },
  })

  const result = await getExtensionOptions()
  expect(result).toEqual([])
  expect(mockRendererRpc.invocations).toEqual([['ExtensionHostManagement.activateByEvent', 'onOutput']])
  expect(mockExtensionHostRpc.invocations).toEqual([['Output.getEnabledProviders']])
})

test('getExtensionOptions - calls activateByEvent with onOutput', async () => {
  const mockRendererRpc = RendererWorker.registerMockRpc({
    'ExtensionHostManagement.activateByEvent': () => undefined,
  })

  const mockExtensionHostRpc = ExtensionHost.registerMockRpc({
    'Output.getEnabledProviders': () => [],
  })

  await getExtensionOptions()
  expect(mockRendererRpc.invocations).toEqual([['ExtensionHostManagement.activateByEvent', 'onOutput']])
  expect(mockExtensionHostRpc.invocations).toEqual([['Output.getEnabledProviders']])
})

test('getExtensionOptions - calls ExtensionHost.invoke with correct method', async () => {
  const mockRendererRpc = RendererWorker.registerMockRpc({
    'ExtensionHostManagement.activateByEvent': () => undefined,
  })

  const mockExtensionHostRpc = ExtensionHost.registerMockRpc({
    'Output.getEnabledProviders': () => [],
  })

  await getExtensionOptions()
  expect(mockRendererRpc.invocations).toEqual([['ExtensionHostManagement.activateByEvent', 'onOutput']])
  expect(mockExtensionHostRpc.invocations).toEqual([['Output.getEnabledProviders']])
})
