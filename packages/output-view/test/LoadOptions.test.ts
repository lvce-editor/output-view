import { expect, test } from '@jest/globals'
import { ExtensionManagementWorker, FileSystemWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import { loadOptions } from '../src/parts/LoadOptions/LoadOptions.ts'
import * as PlatformType from '../src/parts/PlatformType/PlatformType.ts'
import * as PreviewSandboxState from '../src/parts/PreviewSandboxState/PreviewSandboxState.ts'

test('loadOptions - electron', async () => {
  PreviewSandboxState.setActive(false)
  const mockRendererRpc = RendererWorker.registerMockRpc({
    'GetWindowId.getWindowId': () => 42,
    'PlatformPaths.getLogsDir': () => 'file:///logs',
  })
  const mockFileSystemRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.exists': () => true,
    'FileSystem.readDirWithFileTypes': () => [{ name: '123456789.txt', type: 1 }],
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
      uri: 'file:///logs/42/123456789.txt',
    },
    {
      id: 'Extension',
      label: 'Extension',
      uri: 'extension-output://extension/channel',
    },
  ])
  expect(mockRendererRpc.invocations).toEqual([['PlatformPaths.getLogsDir'], ['GetWindowId.getWindowId']])
  expect(mockFileSystemRpc.invocations).toEqual([
    ['FileSystem.readFile', 'memfs:///extension-detail-output.txt'],
    ['FileSystem.readDirWithFileTypes', 'file:///logs/42'],
  ])
  expect(mockExtensionManagementRpc.invocations).toEqual([['Extensions.getOutputChannelProviders']])
})

test('loadOptions - web', async () => {
  PreviewSandboxState.setActive(false)
  const mockExtensionManagementRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.getOutputChannelProviders': () => [{ id: 'Extension', label: 'Extension', uri: 'extension-output://extension/channel' }],
  })

  expect(await loadOptions(PlatformType.Web)).toEqual([{ id: 'Extension', label: 'Extension', uri: 'extension-output://extension/channel' }])
  expect(mockExtensionManagementRpc.invocations).toEqual([['Extensions.getOutputChannelProviders']])
})

test('loadOptions - web with no output channels', async () => {
  PreviewSandboxState.setActive(false)
  const mockExtensionManagementRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.getOutputChannelProviders': () => [],
  })

  expect(await loadOptions(PlatformType.Web)).toEqual([])
  expect(mockExtensionManagementRpc.invocations).toEqual([['Extensions.getOutputChannelProviders']])
})

test('loadOptions - test platform uses legacy window log file', async () => {
  PreviewSandboxState.setActive(false)
  const mockRendererRpc = RendererWorker.registerMockRpc({
    'PlatformPaths.getLogsDir': () => 'file:///logs',
  })
  const mockExtensionManagementRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.getOutputChannelProviders': () => [],
  })
  const mockFileSystemRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.exists': () => true,
  })

  const options = await loadOptions(PlatformType.Test)
  expect(options).toContainEqual({
    id: 'Window',
    label: 'Window',
    uri: 'file:///logs/log-window.txt',
  })
  expect(options).not.toContainEqual(expect.objectContaining({ id: 'PreviewSandbox' }))
  expect(mockRendererRpc.invocations).toEqual([['PlatformPaths.getLogsDir']])
  expect(mockExtensionManagementRpc.invocations).toEqual([['Extensions.getOutputChannelProviders']])
  expect(mockFileSystemRpc.invocations).toEqual([
    ['FileSystem.readFile', 'memfs:///extension-detail-output.txt'],
  ])
})

test('loadOptions omits the preview channel and does not create its log until a preview opens', async () => {
  PreviewSandboxState.setActive(false)
  RendererWorker.registerMockRpc({
    'PlatformPaths.getLogsDir': () => 'file:///logs',
  })
  ExtensionManagementWorker.registerMockRpc({
    'Extensions.getOutputChannelProviders': () => [],
  })
  const mockFileSystemRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.exists': () => false,
    'FileSystem.readFile': () => '',
    'FileSystem.writeFile': () => undefined,
  })

  const options = await loadOptions(PlatformType.Test)

  expect(options).not.toContainEqual(expect.objectContaining({ id: 'PreviewSandbox' }))
  expect(mockFileSystemRpc.invocations).not.toContainEqual(['FileSystem.writeFile', 'file:///logs/log-preview-sandbox.txt', ''])
})

test('loadOptions creates the preview log while a preview is active', async () => {
  PreviewSandboxState.setActive(true)
  RendererWorker.registerMockRpc({
    'PlatformPaths.getLogsDir': () => 'file:///logs',
  })
  ExtensionManagementWorker.registerMockRpc({
    'Extensions.getOutputChannelProviders': () => [],
  })
  const mockFileSystemRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.exists': () => false,
    'FileSystem.readFile': () => '',
    'FileSystem.writeFile': () => undefined,
  })

  const options = await loadOptions(PlatformType.Test)

  expect(options).toContainEqual({
    id: 'PreviewSandbox',
    label: 'Preview Sandbox',
    uri: 'file:///logs/log-preview-sandbox.txt',
  })
  expect(mockFileSystemRpc.invocations).toContainEqual(['FileSystem.writeFile', 'file:///logs/log-preview-sandbox.txt', ''])
})
