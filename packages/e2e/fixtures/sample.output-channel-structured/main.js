import { activate, createOutputChannel, getWorkspaceUri } from '@lvce-editor/api'

const outputChannelProvider = {
  id: 'structured',
  label: 'Structured',
}

const createRecord = (level, message, source = '', line = 0) => {
  return JSON.stringify({
    category: 'Window',
    level,
    line,
    message,
    source,
    timestamp: '2026-07-29T06:37:29.644Z',
  })
}

const main = async () => {
  const channel = createOutputChannel(outputChannelProvider.id)
  await activate()
  const workspaceUri = await getWorkspaceUri()
  const fileUri = `${workspaceUri}/test.txt`
  const plainFileUri = `${workspaceUri}/plain.txt`
  const repeated = createRecord('info', 'cannot execute viewlet command StatusBar.handleItemsChanged: no active instance for StatusBar')
  await channel.append(
    [
      repeated,
      repeated,
      repeated,
      repeated,
      createRecord('warning', 'deprecated API', 'lvce://-/packages/renderer-worker/dist/rendererWorkerMain.js', 3455),
      createRecord('error', 'request failed', 'lvce://-/packages/renderer-worker/dist/rendererWorkerMain.js', 77),
      createRecord('info', 'ready'),
      '    at load$1 (lvce://-/packages/renderer-process/dist/rendererProcessMain.js:8726:11)',
      plainFileUri,
      `    at load (${fileUri}:3:1)`,
    ].join('\n'),
  )
}

await main()
