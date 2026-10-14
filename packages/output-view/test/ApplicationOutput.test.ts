import { expect, test } from '@jest/globals'
import { ExtensionManagementWorker, FileSystemWorker } from '@lvce-editor/rpc-registry'
import { clear } from '../src/parts/Clear/Clear.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as LinePartType from '../src/parts/LinePartType/LinePartType.ts'
import { loadContent } from '../src/parts/LoadContent/LoadContent.ts'
import * as PlatformType from '../src/parts/PlatformType/PlatformType.ts'
import { refresh } from '../src/parts/Refresh/Refresh.ts'
import { refreshOptions } from '../src/parts/RefreshOptions/RefreshOptions.ts'
import { selectChannel } from '../src/parts/SelectChannel/SelectChannel.ts'

test('application output listing, reading, selection, refresh and clearing stay isolated', async () => {
  const uri = 'extension-output://sample.extension/build'
  const logs: Record<string, string> = { preview: 'Preview build', source: 'Source build' }
  using fileSystemRpc = FileSystemWorker.registerMockRpc({})
  using extensionRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.invokeForApplication': async (applicationId: string, command: string): Promise<unknown> => {
      switch (command) {
        case 'Extensions.clearOutputChannel':
          logs[applicationId] = ''
          return undefined
        case 'Extensions.getOutputChannelProviders':
          return [{ id: 'build', label: 'Build', uri }]
        case 'Extensions.readOutputChannel':
          return logs[applicationId]
        default:
          throw new Error(`Unexpected command ${command}`)
      }
    },
  })
  const initial = { ...createDefaultState(), platform: PlatformType.Web }
  const source = await loadContent({ ...initial, applicationId: 'source' }, {})
  let preview = await loadContent({ ...initial, applicationId: 'preview' }, {})
  expect(source.listItems).toEqual([[{ type: LinePartType.Text, value: 'Source build' }]])
  expect(preview.listItems).toEqual([[{ type: LinePartType.Text, value: 'Preview build' }]])
  logs.preview = 'Second build'
  preview = await refresh(preview)
  expect(preview.listItems).toEqual([[{ type: LinePartType.Text, value: 'Second build' }]])
  preview = await refreshOptions(preview)
  preview = await selectChannel(preview, 'build')
  expect(preview.applicationId).toBe('preview')
  preview = await clear(preview)
  expect(preview.error).toBe('')
  expect(logs).toEqual({ preview: '', source: 'Source build' })
  expect(extensionRpc.invocations.every((invocation) => invocation[0] === 'Extensions.invokeForApplication')).toBe(true)
  expect(fileSystemRpc.invocations).toEqual([
    ['FileSystem.readFile', 'memfs:///extension-detail-output.txt'],
    ['FileSystem.readFile', 'memfs:///extension-detail-output.txt'],
    ['FileSystem.readFile', 'memfs:///extension-detail-output.txt'],
  ])
})
