import { test, expect } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as ExtensionHostWorker from '../src/parts/ExtensionHostWorker/ExtensionHostWorker.ts'
import { getExtensionOptions } from '../src/parts/GetExtensionOptions/GetExtensionOptions.ts'
import { RendererWorker } from '@lvce-editor/rpc-registry'

test('getExtensionOptions - returns channels on success', async () => {
  const mockChannels = [
    { id: 'channel1', label: 'Channel 1', uri: 'uri1' },
    { id: 'channel2', label: 'Channel 2', uri: 'uri2' },
  ]

  const mockRendererRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ExtensionHostManagement.activateByEvent') {
        return undefined
      }
      throw new Error(`unexpected method ${method}`)
    },
  })

  const mockExtensionHostRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'Output.getEnabledProviders') {
        return mockChannels
      }
      throw new Error(`unexpected method ${method}`)
    },
  })

  RendererWorker.set(mockRendererRpc)
  ExtensionHostWorker.set(mockExtensionHostRpc)

  const result = await getExtensionOptions()
  expect(result).toEqual(mockChannels)
})

test('getExtensionOptions - returns empty array on error', async () => {
  const mockRendererRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ExtensionHostManagement.activateByEvent') {
        return undefined
      }
      throw new Error(`unexpected method ${method}`)
    },
  })

  const mockExtensionHostRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      throw new Error('Test error')
    },
  })

  RendererWorker.set(mockRendererRpc)
  ExtensionHostWorker.set(mockExtensionHostRpc)

  const result = await getExtensionOptions()
  expect(result).toEqual([])
})

test('getExtensionOptions - calls activateByEvent with onOutput', async () => {
  let activateByEventCalled = false
  let activateByEventEvent = ''

  const mockRendererRpc = MockRpc.create({
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

  const mockExtensionHostRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'Output.getEnabledProviders') {
        return []
      }
      throw new Error(`unexpected method ${method}`)
    },
  })

  RendererWorker.set(mockRendererRpc)
  ExtensionHostWorker.set(mockExtensionHostRpc)

  await getExtensionOptions()
  expect(activateByEventCalled).toBe(true)
  expect(activateByEventEvent).toBe('onOutput')
})

test('getExtensionOptions - calls ExtensionHostWorker.invoke with correct method', async () => {
  let invokeMethod = ''

  const mockRendererRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ExtensionHostManagement.activateByEvent') {
        return undefined
      }
      throw new Error(`unexpected method ${method}`)
    },
  })

  const mockExtensionHostRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      invokeMethod = method
      return []
    },
  })

  RendererWorker.set(mockRendererRpc)
  ExtensionHostWorker.set(mockExtensionHostRpc)

  await getExtensionOptions()
  expect(invokeMethod).toBe('Output.getEnabledProviders')
})
