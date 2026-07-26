import { expect, test } from '@jest/globals'
import { ExtensionHost, RendererWorker } from '@lvce-editor/rpc-registry'
import { loadOptions } from '../src/parts/LoadOptions/LoadOptions.ts'
import * as PlatformType from '../src/parts/PlatformType/PlatformType.ts'

test('loadOptions - electron', async () => {
  const mockRendererRpc = RendererWorker.registerMockRpc({
    'ExtensionHostManagement.activateByEvent': () => undefined,
    'PlatformPaths.getLogsDir': () => 'file:///logs',
  })
  const mockExtensionHostRpc = ExtensionHost.registerMockRpc({
    'Output.getEnabledProviders': () => [{ id: 'Extension', label: 'Extension', uri: 'extension-output' }],
  })

  expect(await loadOptions(PlatformType.Electron)).toEqual([
    {
      id: 'MainProcess',
      label: 'Main Process',
      uri: 'file:///logs/log-main-process.txt',
    },
    {
      id: 'SharedProcess',
      label: 'Shared Process',
      uri: 'file:///logs/log-shared-process.txt',
    },
    {
      id: 'Window',
      label: 'Window',
      uri: 'file:///logs/log-window.txt',
    },
    {
      id: 'Extension',
      label: 'Extension',
      uri: 'extension-output',
    },
  ])
  expect(mockRendererRpc.invocations).toEqual([['ExtensionHostManagement.activateByEvent', 'onOutput'], ['PlatformPaths.getLogsDir']])
  expect(mockExtensionHostRpc.invocations).toEqual([['Output.getEnabledProviders']])
})

test('loadOptions - web', async () => {
  const mockRendererRpc = RendererWorker.registerMockRpc({
    'ExtensionHostManagement.activateByEvent': () => undefined,
  })
  const mockExtensionHostRpc = ExtensionHost.registerMockRpc({
    'Output.getEnabledProviders': () => [{ id: 'Extension', label: 'Extension', uri: 'extension-output' }],
  })

  expect(await loadOptions(PlatformType.Web)).toEqual([{ id: 'Extension', label: 'Extension', uri: 'extension-output' }])
  expect(mockRendererRpc.invocations).toEqual([['ExtensionHostManagement.activateByEvent', 'onOutput']])
  expect(mockExtensionHostRpc.invocations).toEqual([['Output.getEnabledProviders']])
})
