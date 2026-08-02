import { expect, test } from '@jest/globals'
import { ExtensionManagementWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import { loadOptions } from '../src/parts/LoadOptions/LoadOptions.ts'
import * as PlatformType from '../src/parts/PlatformType/PlatformType.ts'

test('loadOptions - electron', async () => {
  const mockRendererRpc = RendererWorker.registerMockRpc({
    'PlatformPaths.getLogsDir': () => 'file:///logs',
  })
  const mockExtensionManagementRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.getOutputChannelProviders': () => [{ id: 'Extension', label: 'Extension', uri: 'extension-output://extension/channel' }],
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
      uri: 'extension-output://extension/channel',
    },
  ])
  expect(mockRendererRpc.invocations).toEqual([['PlatformPaths.getLogsDir']])
  expect(mockExtensionManagementRpc.invocations).toEqual([['Extensions.getOutputChannelProviders']])
})

test('loadOptions - web', async () => {
  const mockExtensionManagementRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.getOutputChannelProviders': () => [{ id: 'Extension', label: 'Extension', uri: 'extension-output://extension/channel' }],
  })

  expect(await loadOptions(PlatformType.Web)).toEqual([{ id: 'Extension', label: 'Extension', uri: 'extension-output://extension/channel' }])
  expect(mockExtensionManagementRpc.invocations).toEqual([['Extensions.getOutputChannelProviders']])
})
