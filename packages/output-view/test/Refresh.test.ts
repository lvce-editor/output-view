import { test, expect } from '@jest/globals'
import { ExtensionManagementWorker, FileSystemWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as PlatformType from '../src/parts/PlatformType/PlatformType.ts'
import * as PreviewSandboxState from '../src/parts/PreviewSandboxState/PreviewSandboxState.ts'
import { refreshOptions } from '../src/parts/RefreshOptions/RefreshOptions.ts'

test('refreshOptions updates preview channel options when a preview opens and closes', async () => {
  PreviewSandboxState.setActive(false)
  RendererWorker.registerMockRpc({
    'PlatformPaths.getLogsDir': () => 'file:///logs',
  })
  ExtensionManagementWorker.registerMockRpc({
    'Extensions.getOutputChannelProviders': () => [],
  })
  FileSystemWorker.registerMockRpc({
    'FileSystem.exists': () => true,
    'FileSystem.readDirWithFileTypes': () => [],
    'FileSystem.readFile': () => '',
    'FileSystem.unwatchFile': () => undefined,
    'FileSystem.watchFile': () => undefined,
  })

  const initialState = {
    ...createDefaultState(),
    options: [{ id: 'MainProcess', label: 'Main Process', uri: 'file:///logs/log-main-process.txt' }],
    platform: PlatformType.Test,
    selectedOption: 'MainProcess',
    watchId: 1,
  }
  const inactiveState = await refreshOptions(initialState)
  expect(inactiveState.options).not.toContainEqual(expect.objectContaining({ id: 'PreviewSandbox' }))

  PreviewSandboxState.setActive(true)
  const activeState = await refreshOptions(inactiveState)
  expect(activeState.options).toContainEqual(expect.objectContaining({ id: 'PreviewSandbox' }))
  expect(activeState.selectedOption).toBe('MainProcess')

  PreviewSandboxState.setActive(false)
  const previewSelectedState = { ...activeState, selectedOption: 'PreviewSandbox' }
  const closedState = await refreshOptions(previewSelectedState)
  expect(closedState.options).not.toContainEqual(expect.objectContaining({ id: 'PreviewSandbox' }))
  expect(closedState.selectedOption).toBe('MainProcess')
})
