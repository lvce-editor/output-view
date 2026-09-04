import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'output.extension-channel-live-update'

export const skip = 1

export const test: Test = async ({ Command, expect, Extension, Locator, Output, Panel, QuickPick }) => {
  const extensionUri = import.meta.resolve('../fixtures/sample.extension-api-output-channel-live-update')
  await Extension.addWebExtension(extensionUri)

  await Panel.open('Output')
  await Command.execute('Panel.selectIndex', 1)
  await Output.selectChannel('sample-extension-output-live')

  const content = Locator('.OutputContent')
  await expect(content).toHaveText('live before')

  await QuickPick.open()
  await QuickPick.setValue('>Write Extension Output')
  await QuickPick.selectItem('Write Extension Output')

  await expect(content).toHaveText('live before\nlive after')
}
