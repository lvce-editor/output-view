import { test, expect } from '@jest/globals'
import { ExtensionManagementWorker, FileSystemWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import { commandMap } from '../src/parts/CommandMap/CommandMap.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as OutputStates from '../src/parts/OutputStates/OutputStates.ts'
import * as PlatformType from '../src/parts/PlatformType/PlatformType.ts'
import * as PreviewSandboxState from '../src/parts/PreviewSandboxState/PreviewSandboxState.ts'

test('setPreviewSandboxActive refreshes open Output viewlets', async () => {
  PreviewSandboxState.setActive(false)
  const mockRendererRpc = RendererWorker.registerMockRpc({
    'PlatformPaths.getLogsDir': () => 'file:///logs',
    'Viewlet.requestRender': () => undefined,
  })
  ExtensionManagementWorker.registerMockRpc({
    'Extensions.getOutputChannelProviders': () => [],
  })
  FileSystemWorker.registerMockRpc({
    'FileSystem.exists': () => false,
    'FileSystem.readDirWithFileTypes': () => [],
    'FileSystem.readFile': () => '',
    'FileSystem.unwatchFile': () => undefined,
    'FileSystem.watchFile': () => undefined,
    'FileSystem.writeFile': () => undefined,
  })

  const state = {
    ...createDefaultState(),
    options: [{ id: 'MainProcess', label: 'Main Process', uri: 'file:///logs/log-main-process.txt' }],
    platform: PlatformType.Test,
    selectedOption: 'MainProcess',
  }
  OutputStates.set(42, state, state)

  await commandMap['Output.setPreviewSandboxActive'](true)

  expect(OutputStates.get(42).newState.options).toContainEqual(expect.objectContaining({ id: 'PreviewSandbox' }))
  expect(mockRendererRpc.invocations).toContainEqual(['Viewlet.requestRender', 42])
  OutputStates.dispose(42)
})
