import { test, expect } from '@jest/globals'
import { registerMockRpc } from '@lvce-editor/rpc-registry'
import * as RpcRegistry from '@lvce-editor/rpc-registry'
import { getExtensionOptions } from '../src/parts/GetExtensionOptions/GetExtensionOptions.ts'

test('getExtensionOptions - returns channels on success', async () => {
  const mockChannels = [
    { id: 'channel1', label: 'Channel 1', uri: 'uri1' },
    { id: 'channel2', label: 'Channel 2', uri: 'uri2' },
  ]

  registerMockRpc(RpcRegistry.RpcId.RendererWorker, {
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ExtensionHostManagement.activateByEvent') {
        return undefined
      }
      throw new Error(`unexpected method ${method}`)
    },
  })

  registerMockRpc(RpcRegistry.RpcId.ExtensionHostWorker, {
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'Output.getEnabledProviders') {
        return mockChannels
      }
      throw new Error(`unexpected method ${method}`)
    },
  })

  const result = await getExtensionOptions()
  expect(result).toEqual(mockChannels)
})

test('getExtensionOptions - returns empty array on error', async () => {
  registerMockRpc(RpcRegistry.RpcId.RendererWorker, {
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ExtensionHostManagement.activateByEvent') {
        return undefined
      }
      throw new Error(`unexpected method ${method}`)
    },
  })

  registerMockRpc(RpcRegistry.RpcId.ExtensionHostWorker, {
    commandMap: {},
    invoke: (method: string) => {
      throw new Error('Test error')
    },
  })

  const result = await getExtensionOptions()
  expect(result).toEqual([])
})

test('getExtensionOptions - calls activateByEvent with onOutput', async () => {
  let activateByEventCalled = false
  let activateByEventEvent = ''

  registerMockRpc(RpcRegistry.RpcId.RendererWorker, {
    commandMap: {},
    invoke: (method: string, event?: string) => {
      if (method === 'ExtensionHostManagement.activateByEvent') {
        activateByEventCalled = true
        activateByEventEvent = event || ''
        return undefined
      }
      throw new Error(`unexpected method ${method}`)
    },
  })

  registerMockRpc(RpcRegistry.RpcId.ExtensionHostWorker, {
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'Output.getEnabledProviders') {
        return []
      }
      throw new Error(`unexpected method ${method}`)
    },
  })

  await getExtensionOptions()
  expect(activateByEventCalled).toBe(true)
  expect(activateByEventEvent).toBe('onOutput')
})

test('getExtensionOptions - calls ExtensionHostWorker.invoke with correct method', async () => {
  let invokeMethod = ''

  registerMockRpc(RpcRegistry.RpcId.RendererWorker, {
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ExtensionHostManagement.activateByEvent') {
        return undefined
      }
      throw new Error(`unexpected method ${method}`)
    },
  })

  registerMockRpc(RpcRegistry.RpcId.ExtensionHostWorker, {
    commandMap: {},
    invoke: (method: string) => {
      invokeMethod = method
      return []
    },
  })

  await getExtensionOptions()
  expect(invokeMethod).toBe('Output.getEnabledProviders')
})
